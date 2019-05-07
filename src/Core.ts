import { QuantumState, QuantumStateGenerator} from "./QuantumState";
import { Qubit, QubitParameter } from "./Qubit";
import { QuantmOperationTypes } from "./types";

/**
 * Coreの初期化パラメータ
 */
export interface CoreConfig {
    /**
     * QuantumStateインスタンスのジェネレータ
     */
    quantumStateGenerator: QuantumStateGenerator
}

/**
 * Core内でQubitとQuantumStateを紐づけて管理する構造体の要素
 */
interface QubitQuantumStateMapElement {

    /**
     * Qubitの実体
     */
    qubit: Qubit;

    /**
     * そのqubitがquantumStateの何番目の量子ビットを表現しているか
     */
    bitId: number;

    /**
     * そのqubitを表現するQuantumStateの実体
     */
    quantumState: QuantumState;
}

/**
 * Qubitの管理とQuantumStateの操作を受け持つクラス
 * ユーザはこのクラスを直接操作する必要はない
 */
export class Core {
    private _quantumStateGenerator: QuantumStateGenerator;
    private _mapQubitQuantumState: QubitQuantumStateMapElement[];
    constructor(param: CoreConfig) {
        this._quantumStateGenerator = param.quantumStateGenerator;
        this._mapQubitQuantumState = [];
    }

    /**
     * Qubitが新しく生成されたとき、Qubitから呼ばれる
     * 生成されたQubitに紐づく新しいQuantumStateを生成し、Core管理下に加える
     */
    addNewQubit(qubit: Qubit, param: QubitParameter) {
        // Qubitの初期化パラメータから、QuantumStateを生成する
        const quantumState = this._quantumStateGenerator(param.value);
        this._mapQubitQuantumState.push({
            qubit,
            bitId: 0,
            quantumState
        });
    }

    requestOperation(quantmOperationType: QuantmOperationTypes, ...qubits: Qubit[]) {
        // qubitsの順序で紐づいたQubitQuantumStateMapElementを取得する
        const qubitMapElements = qubits.map(qubit => this._lookupQuantumStateFromQubit(qubit));

        // todo: 全ての量子操作に対してメソッドを個別に用意するのは冗長だが、switch文が伸びるのも読みづらいので、ある程度の粒度で分けたい
        switch (quantmOperationType) {
            case QuantmOperationTypes.X:
            case QuantmOperationTypes.Z:
            case QuantmOperationTypes.H:
                const mapElement = qubitMapElements[0]; // 単一量子ビットなので常にlength = 1
                this._requestOperationSingleQubit(quantmOperationType, mapElement);
                break;
            case QuantmOperationTypes.CNOT:
                const controlQubitMapElement = qubitMapElements[0];
                const targetQubitMapElement = qubitMapElements[1];
                // CNOT対象量子ビットが合成系ではない場合、先にマージして合成系のQuantumState化する
                if (controlQubitMapElement.quantumState !== targetQubitMapElement.quantumState) {
                    this._mergeQubitMapElement(controlQubitMapElement, targetQubitMapElement);
                }
                mapElement.quantumState.cnot(controlQubitMapElement.bitId, targetQubitMapElement.bitId);
                break;
            default:
                // no match operation
        }
    }

    /**
     * 単一量子ビットの量子操作
     */
    _requestOperationSingleQubit(quantmOperationType: QuantmOperationTypes, mapElement: QubitQuantumStateMapElement) {
        switch(quantmOperationType) {
            case QuantmOperationTypes.X:
                mapElement.quantumState.x(mapElement.bitId);
                break;
            case QuantmOperationTypes.Z:
                mapElement.quantumState.z(mapElement.bitId);
                break;
            case QuantmOperationTypes.H:
                mapElement.quantumState.h(mapElement.bitId);
                break;
            default:
                // no match operation
        }
    }

    /**
     * 引数のQubitを持つQubitQuantumStateMapElementを返す
     */
    _lookupQuantumStateFromQubit(qubit: Qubit) {
        return this._mapQubitQuantumState.find((mapElement) => mapElement.qubit === qubit);
        // todo: findできなかったケースのハンドリング
    }

    /**
     * QuantumStateをマージし、合成系を生成する
     * マージされた後、 新しく生成されたQuantumStateとQubitを紐づけて再登録する
     */
    _mergeQubitMapElement(mapElementLeft: QubitQuantumStateMapElement, mapElementRight: QubitQuantumStateMapElement) {
        // テンソル積の左側の量子ビット数
        const mapElementLeftLength = mapElementLeft.quantumState.length;

        // マージ前に、マージによってQuantumStateの更新が必要なmapElementをリスト化する
        // bitIdの扱いが異なるため、リストはテンソル積の左・右を別個に持つ必要がある
        const leftTensorQuantumStateMapElements = this._mapQubitQuantumState.filter((mapElement) => mapElement.quantumState === mapElementLeft.quantumState);
        const rightTensorQuantumStateMapElements = this._mapQubitQuantumState.filter((mapElement) => mapElement.quantumState === mapElementRight.quantumState);

        // マージされたQuantumStateの生成
        const mergedQuantumState = mapElementLeft.quantumState.merge(mapElementRight.quantumState);

        // 新しいQuantumStateを、古いQuantumStateを参照しているQubitQuantumStateMapElementに適用する
        leftTensorQuantumStateMapElements.forEach((mapElement) => {mapElement.quantumState = mergedQuantumState});
        rightTensorQuantumStateMapElements.forEach((mapElement) => {mapElement.quantumState = mergedQuantumState});

        // QuantumStateの更新で、テンソル積の右側はbitIdが動くので更新する
        leftTensorQuantumStateMapElements.forEach(mapElement => mapElement.bitId = mapElement.bitId + mapElementLeftLength);
    }
}
