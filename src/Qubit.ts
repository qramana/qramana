import { Core } from "./Core";
import { QuantumStateInitializeType } from "@qramana/qramana-common-types";
import { QuantumOperationTypes, CloneQubitsResult } from "./types";

/**
 * Qubitの初期化パラメータ
 */
export interface QubitParameter {
    /**
     * 生成する初期状態
     */
    value: QuantumStateInitializeType;
}

/**
 * シミュレータ環境でのみ実装できる機能
 */
type SimulatorLimitedQubitMethods = {
    /**
     * Qubitが含まれる量子状態を複製する
     */
    clone: () => CloneQubitsResult;

    /**
     * Qubitが含まれる量子状態のQubit数を返す
     */
    compositedQubits: () => Qubit[]
};

/**
 * 量子ビットを表現するクラス
 */
export class Qubit {
    /**
     * ライブラリの初期化時に代入されるQubitとQuantumStateを紐づける管理クラス
     * Qubitに対する量子操作リクエストは、Coreを通して量子状態の実態に反映される
     */
    static _core: Core;

    simulated: SimulatorLimitedQubitMethods;

    constructor(param: QubitParameter = { value: 0 }) {
        // CoreにQubitを登録する
        Qubit._core.createNewQubit(this, param);
        this._createSimulated();
    }

    /**
     * x演算を適用する
     */
    x(): void {
        Qubit._core.requestOperation(QuantumOperationTypes.X, this);
    }

    /**
     * y演算を適用する
     */
    y(): void {
        Qubit._core.requestOperation(QuantumOperationTypes.Y, this);
    }

    /**
     * z演算を適用する
     */
    z(): void {
        Qubit._core.requestOperation(QuantumOperationTypes.Z, this);
    }

    /**
     * 任意の角度でr演算を適用する
     *
     * @param angle 回転角。radianで与えられ、0 ~ 2*Math.PI
     */
    r(angle: number): void {
        Qubit._core.requestRotateOperation(QuantumOperationTypes.R, angle, this);
    }

    /**
     * s演算を適用する
     */
    s(): void {
        Qubit._core.requestOperation(QuantumOperationTypes.S, this);
    }

    /**
     * t演算を適用する
     */
    t(): void {
        Qubit._core.requestOperation(QuantumOperationTypes.T, this);
    }

    /**
     * hadamard演算を適用する
     */
    h(): void {
        Qubit._core.requestOperation(QuantumOperationTypes.H, this);
    }

    /**
     * cnot演算を適用する
     * 標的量子ビットには呼び出し元のQubitが指定される
     *
     * @param controlQubit 制御量子ビット
     */
    cnot(controlQubit: Qubit): void {
        Qubit._core.requestOperation(QuantumOperationTypes.CONTROLLED_X, controlQubit, this);
    }

    /**
     * controlled x演算を適用する
     * 標的量子ビットには呼び出し元のQubitが指定される
     *
     * @param controlQubit 制御量子ビット
     */
    controlledX(controlQubit: Qubit): void {
        Qubit._core.requestOperation(QuantumOperationTypes.CONTROLLED_X, controlQubit, this);
    }

    /**
     * controlled y演算を適用する
     * 標的量子ビットには呼び出し元のQubitが指定される
     *
     * @param controlQubit 制御量子ビット
     */
    controlledY(controlQubit: Qubit): void {
        Qubit._core.requestOperation(QuantumOperationTypes.CONTROLLED_Y, controlQubit, this);
    }

    /**
     * controlled z演算を適用する
     * 標的量子ビットには呼び出し元のQubitが指定される
     *
     * @param controlQubit 制御量子ビット
     */
    controlledZ(controlQubit: Qubit): void {
        Qubit._core.requestOperation(QuantumOperationTypes.CONTROLLED_Z, controlQubit, this);
    }

    /**
     * 任意の角度でx軸回りの回転を適用する
     *
     * @param angle 回転角
     */
    rotateX(angle: number): void {
        Qubit._core.requestRotateOperation(QuantumOperationTypes.ROTATEX, angle, this);
    }

    /**
     * 任意の角度でy軸回りの回転を適用する
     *
     * @param angle 回転角
     */
    rotateY(angle: number): void {
        Qubit._core.requestRotateOperation(QuantumOperationTypes.ROTATEY, angle, this);
    }

    /**
     * 任意の角度でz軸回りの回転を適用する
     *
     * @param angle 回転角
     */
    rotateZ(angle: number): void {
        Qubit._core.requestRotateOperation(QuantumOperationTypes.ROTATEZ, angle, this);
    }

    toffoli(controlQubit0: Qubit, controlQubit1: Qubit): void {
        Qubit._core.requestOperation(QuantumOperationTypes.TOFFOLI, controlQubit0, controlQubit1, this);
    }

    /**
     * 量子ビットをZ基底で測定する
     * 返り値には0または1状態の測定結果が入る
     */
    measure(): number {
        return Qubit._core.requestMeasure(this);
    }

    /**
     * 量子ビットのダンプを返す
     * 文字列の形式はQuantumStateの実装によって不定であり、 ライブラリユーザはこのメソッドが返す書式に依存するべきではない
     */
    toString(): string {
        return Qubit._core.toStringQubit(this);
    }

    private _createSimulated(): void {
        this.simulated = {
            clone: () => Qubit._core.cloneQubits(this),
            compositedQubits: () => Qubit._core.getCompositedQubits(this)
        };
    }
}
