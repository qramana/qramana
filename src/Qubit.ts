import { Core } from "./Core";
import { QuantumStateParameter } from "./QuantumState";
import { QuantumOperationTypes } from "./types";

/**
 * Qubitの初期化パラメータ
 */
export interface QubitParameter {
    value: QuantumStateParameter;
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

    constructor(param: QubitParameter) {
        // CoreにQubitを登録する
        Qubit._core.createNewQubit(this, param);
    }

    x() {
        Qubit._core.requestOperation(QuantumOperationTypes.X, this);
    }

    y() {
        Qubit._core.requestOperation(QuantumOperationTypes.Y, this);
    }

    z() {
        Qubit._core.requestOperation(QuantumOperationTypes.Z, this);
    }

    h() {
        Qubit._core.requestOperation(QuantumOperationTypes.H, this);
    }

    /**
     * CNOT操作
     * 標的量子ビットにはメソッド呼び出し元のQubitが指定される
     *
     * @param controlQubit 制御量子ビット
     */
    cnot(controlQubit: Qubit) {
        Qubit._core.requestOperation(QuantumOperationTypes.CNOT, controlQubit, this);

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
     * 文字列の形式はQuantumStateの実装によって不定であり、 ライブラリユーザは形式に依存するべきではない
     */
    toString(): string {
        return Qubit._core.toStringQubit(this);
    }

}
