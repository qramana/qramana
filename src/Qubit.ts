import { Core } from "./Core";
import { QuantumStateInitializeType } from "@qramana/qramana-common-types";
import { QuantumOperationTypes } from "./types";

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
 * 量子ビットを表現するクラス
 */
export class Qubit {

    /**
     * ライブラリの初期化時に代入されるQubitとQuantumStateを紐づける管理クラス
     * Qubitに対する量子操作リクエストは、Coreを通して量子状態の実態に反映される
     */
    static _core: Core;

    constructor(param: QubitParameter = { value: 0 }) {
        // CoreにQubitを登録する
        Qubit._core.createNewQubit(this, param);
    }

    /**
     * x演算を適用する
     */
    x() {
        Qubit._core.requestOperation(QuantumOperationTypes.X, this);
    }

    /**
     * y演算を適用する
     */
    y() {
        Qubit._core.requestOperation(QuantumOperationTypes.Y, this);
    }

    /**
     * z演算を適用する
     */
    z() {
        Qubit._core.requestOperation(QuantumOperationTypes.Z, this);
    }

    /**
     * 任意の角度でr演算を適用する
     *
     * @param angle 回転角。radianで与えられ、0 ~ 2*Math.PI
     */
    r(angle: number) {
        Qubit._core.requestRotateOperation(QuantumOperationTypes.R, angle, this);
    }

    /**
     * s演算を適用する
     */
    s() {
        Qubit._core.requestOperation(QuantumOperationTypes.S, this);
    }

    /**
     * t演算を適用する
     */
    t() {
        Qubit._core.requestOperation(QuantumOperationTypes.T, this);
    }

    /**
     * hadamard演算を適用する
     */
    h() {
        Qubit._core.requestOperation(QuantumOperationTypes.H, this);
    }

    /**
     * cnot演算を適用する
     * 標的量子ビットには呼び出し元のQubitが指定される
     *
     * @param controlQubit 制御量子ビット
     */
    cnot(controlQubit: Qubit) {
        Qubit._core.requestOperation(QuantumOperationTypes.CONTROLLED_X, controlQubit, this);
    }

    /**
     * cnot演算を適用する
     * 標的量子ビットには呼び出し元のQubitが指定される
     *
     * @param controlQubit 制御量子ビット
     */
    controlledX(controlQubit: Qubit) {
        Qubit._core.requestOperation(QuantumOperationTypes.CONTROLLED_X, controlQubit, this);
    }

    /**
     * controlled y演算を適用する
     * 標的量子ビットには呼び出し元のQubitが指定される
     *
     * @param controlQubit 制御量子ビット
     */
    controlledY(controlQubit: Qubit) {
        Qubit._core.requestOperation(QuantumOperationTypes.CONTROLLED_Y, controlQubit, this);
    }

    /**
     * controlled z演算を適用する
     * 標的量子ビットには呼び出し元のQubitが指定される
     *
     * @param controlQubit 制御量子ビット
     */
    controlledZ(controlQubit: Qubit) {
        Qubit._core.requestOperation(QuantumOperationTypes.CONTROLLED_Z, controlQubit, this);
    }

    /**
     * 任意の角度でx軸回りの回転を適用する
     *
     * @param angle 回転角
     */
    rotateX(angle: number) {
        Qubit._core.requestRotateOperation(QuantumOperationTypes.ROTATEX, angle, this);
    }

    /**
     * 任意の角度でy軸回りの回転を適用する
     *
     * @param angle 回転角
     */
    rotateY(angle: number) {
        Qubit._core.requestRotateOperation(QuantumOperationTypes.ROTATEY, angle, this);
    }

    /**
     * 任意の角度でz軸回りの回転を適用する
     *
     * @param angle 回転角
     */
    rotateZ(angle: number) {
        Qubit._core.requestRotateOperation(QuantumOperationTypes.ROTATEZ, angle, this);
    }

    toffoli(controlQubit0: Qubit, controlQubit1: Qubit) {
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

}
