import { Core } from "./Core";
import { QuantumStateParameter } from "./QuantumState";
import { QuantmOperationTypes } from "./types";

/**
 * Qubitの初期化パラメータ
 */
export interface QubitParameter {
    value: QuantumStateParameter
}

/**
 * 量子ビットを表現するクラス
 */
export class Qubit {

    /**
     * ライブラリの初期化時に代入される、QubitとQuantumStateを紐づける管理クラス
     * Qubitに対する量子操作リクエストは、Coreを通して量子状態の実態に反映される
     */
    static _core: Core;

    constructor(param: QubitParameter) {
        // CoreにQubitを登録する
        Qubit._core.createNewQubit(this, param);
    }

    x() {
        Qubit._core.requestOperation(QuantmOperationTypes.X, this);
    }

    z() {
        Qubit._core.requestOperation(QuantmOperationTypes.Z, this);
    }

    h() {
        Qubit._core.requestOperation(QuantmOperationTypes.H, this);
    }

    /**
     * CNOT操作
     * 標的量子ビットは自動的にメソッド元のQubitが指定される
     * 
     * @param controlQubit 制御量子ビット
     */
    cnot(controlQubit: Qubit) {
        Qubit._core.requestOperation(QuantmOperationTypes.CNOT, controlQubit, this);

    }

    /**
     * 
     */
    measure(): number {
        return Qubit._core.requestMeasure(this);
    }

    toString(): string {
        return Qubit._core.toStringQubit(this);
    }

}
