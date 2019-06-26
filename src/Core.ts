import { QuantumState, QuantumStateGenerator} from "./QuantumState";
import { Qubit, QubitParameter } from "./Qubit";
import { QuantumOperationTypes } from "./types";

/**
 * Coreの初期化パラメータ
 */
export interface CoreConfig {
    /**
     * QuantumStateインスタンスのジェネレータ
     */
    quantumStateGenerator: QuantumStateGenerator;
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
     * bitIdは配列のlengthとアサイン規則が異なり、|3210>のように右端を起点とし、左に数える
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
    createNewQubit(qubit: Qubit, param: QubitParameter) {
        // Qubitの初期化パラメータから、QuantumStateを生成する
        const quantumState = this._quantumStateGenerator(param.value);
        this._mapQubitQuantumState.push({
            qubit,
            bitId: 0,
            quantumState
        });
    }

    requestOperation(quantumOperationType: QuantumOperationTypes, ...qubits: Qubit[]) {
        // qubitsの順序で紐づいたQubitQuantumStateMapElementを取得する
        const qubitMapElements = qubits.map(qubit => this._lookupQubitQuantumStateMapElementFromQubit(qubit));

        // todo: 全ての量子操作に対してメソッドを個別に用意するのは冗長だが、switch文が伸びるのも読みづらいので、ある程度の粒度で分けたい
        switch (quantumOperationType) {
            case QuantumOperationTypes.X:
            case QuantumOperationTypes.Y:
            case QuantumOperationTypes.Z:
            case QuantumOperationTypes.S:
            case QuantumOperationTypes.T:
            case QuantumOperationTypes.H:
                const mapElement = qubitMapElements[0]; // 単一量子ビットなので常にlength = 1
                this._requestOperationSingleQubit(quantumOperationType, mapElement);
                break;
            case QuantumOperationTypes.CONTROLLED_X:
            case QuantumOperationTypes.CONTROLLED_Y:
            case QuantumOperationTypes.CONTROLLED_Z:
                const controlQubitMapElement = qubitMapElements[0];
                const targetQubitMapElement = qubitMapElements[1];
                // Controlled系操作の対象量子ビットが合成系ではない場合、先にマージして合成系のQuantumState化する
                if (controlQubitMapElement.quantumState !== targetQubitMapElement.quantumState) {
                    this._mergeQubitMapElement(controlQubitMapElement, targetQubitMapElement);
                }
                this._requestControlledOperationQubit(quantumOperationType, controlQubitMapElement, targetQubitMapElement);
            default:
                // no match operation
        }
    }

    requestRotateOperation(quantumOperationType: QuantumOperationTypes, angle: number, qubit: Qubit) {
        // 回転角を引数として必要とする操作は引数が異なるので分ける
        // メモ：上手いことrequestOperationと引数が異なっても扱えないか……
        const mapElement = this._lookupQubitQuantumStateMapElementFromQubit(qubit);
        switch (quantumOperationType) {
            case QuantumOperationTypes.R:
                mapElement.quantumState.r(mapElement.bitId, angle);
                break;
            case QuantumOperationTypes.ROTATEX:
                mapElement.quantumState.rx(mapElement.bitId, angle);
                break;
            case QuantumOperationTypes.ROTATEY:
                mapElement.quantumState.ry(mapElement.bitId, angle);
                break;
            case QuantumOperationTypes.ROTATEX:
                mapElement.quantumState.rz(mapElement.bitId, angle);
                break;
            default:
                // no match operation
        }
    }

    /**
     * 単一量子ビットのZ基底測定
     */
    requestMeasure(qubit: Qubit): number {
        const qubitMapElement = this._lookupQubitQuantumStateMapElementFromQubit(qubit);
        return this._measureQubit(qubitMapElement);
    }

    toStringQubit(qubit: Qubit): string {
        const qubitMapElement = this._lookupQubitQuantumStateMapElementFromQubit(qubit);
        return qubitMapElement.quantumState.toString();
    }

    /**
     * 単一量子ビットの量子操作
     */
    _requestOperationSingleQubit(quantumOperationType: QuantumOperationTypes, mapElement: QubitQuantumStateMapElement) {
        switch (quantumOperationType) {
            case QuantumOperationTypes.X:
                mapElement.quantumState.x(mapElement.bitId);
                break;
            case QuantumOperationTypes.Y:
                mapElement.quantumState.y(mapElement.bitId);
                break;
            case QuantumOperationTypes.Z:
                mapElement.quantumState.z(mapElement.bitId);
                break;
            case QuantumOperationTypes.S:
                mapElement.quantumState.s(mapElement.bitId);
                break;
            case QuantumOperationTypes.T:
                mapElement.quantumState.t(mapElement.bitId);
                break;
            case QuantumOperationTypes.H:
                mapElement.quantumState.h(mapElement.bitId);
                break;
            default:
                // no match operation
        }
    }

    /**
     * Controlled系のための複数量子ビット操作
     */
    _requestControlledOperationQubit(
        quantumOperationType: QuantumOperationTypes,
        controlQubitMapElement: QubitQuantumStateMapElement,
        targetQubitMapElement: QubitQuantumStateMapElement
    ) {
        switch (quantumOperationType) {
            case QuantumOperationTypes.CONTROLLED_X:
                targetQubitMapElement.quantumState.controlledX(controlQubitMapElement.bitId, targetQubitMapElement.bitId);
                break;
            case QuantumOperationTypes.CONTROLLED_Y:
                targetQubitMapElement.quantumState.controlledY(controlQubitMapElement.bitId, targetQubitMapElement.bitId);
                break;
            case QuantumOperationTypes.CONTROLLED_X:
                targetQubitMapElement.quantumState.controlledX(controlQubitMapElement.bitId, targetQubitMapElement.bitId);
                break;
            case QuantumOperationTypes.CONTROLLED_Y:
                targetQubitMapElement.quantumState.controlledY(controlQubitMapElement.bitId, targetQubitMapElement.bitId);
                break;
            case QuantumOperationTypes.CONTROLLED_Z:
                targetQubitMapElement.quantumState.controlledZ(controlQubitMapElement.bitId, targetQubitMapElement.bitId);
                break;
            default:
                // no match operation
        }
    }

    /**
     * 単一量子ビットのZ基底測定
     */
    _measureQubit(mapElement: QubitQuantumStateMapElement): number {
        const measurementResult = mapElement.quantumState.measure(mapElement.bitId);
        return measurementResult.result;
    }

    /**
     * 引数のQubitを持つQubitQuantumStateMapElementを返す
     */
    _lookupQubitQuantumStateMapElementFromQubit(qubit: Qubit) {
        return this._mapQubitQuantumState.find((mapElement) => mapElement.qubit === qubit);
        // todo: findできなかったケースのハンドリング
    }

    /**
     * QuantumStateをマージし、合成系を生成する
     * マージされた後、 新しく生成されたQuantumStateとQubitを紐づけて再登録する
     * todo: argsを配列にしてもよいか検討
     */
    _mergeQubitMapElement(mapElementLeft: QubitQuantumStateMapElement, mapElementRight: QubitQuantumStateMapElement): void {
        // テンソル積の左側の量子ビット数
        const mapElementRightLength = mapElementRight.quantumState.length;

        // マージ前に、マージによってQuantumStateの更新が必要なmapElementをリスト化する
        // bitIdの扱いが異なるため、リストはテンソル積の左・右を別個に持つ必要がある
        const leftTensorQuantumStateMapElements =
            this._mapQubitQuantumState.filter((mapElement) => mapElement.quantumState === mapElementLeft.quantumState);
        const rightTensorQuantumStateMapElements =
            this._mapQubitQuantumState.filter((mapElement) => mapElement.quantumState === mapElementRight.quantumState);

        // マージされたQuantumStateの生成
        const mergedQuantumState = mapElementLeft.quantumState.merge(mapElementRight.quantumState);

        // 新しいQuantumStateを、古いQuantumStateを参照しているQubitQuantumStateMapElementに適用する
        leftTensorQuantumStateMapElements.forEach((mapElement) => {mapElement.quantumState = mergedQuantumState; });
        rightTensorQuantumStateMapElements.forEach((mapElement) => {mapElement.quantumState = mergedQuantumState; });

        // QuantumStateの更新で、テンソル積の右側はbitIdが動くので更新する
        leftTensorQuantumStateMapElements.forEach(mapElement => mapElement.bitId = mapElement.bitId + mapElementRightLength);
    }
}
