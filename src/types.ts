import { Qubit } from ".";

/**
 * qlamanaがサポートする量子操作
 */
export enum QuantumOperationTypes {
    X,
    Y,
    Z,
    R,
    S,
    T,
    H,
    CONTROLLED_X,
    CONTROLLED_Y,
    CONTROLLED_Z,
    ROTATEX,
    ROTATEY,
    ROTATEZ,
    TOFFOLI
}

export interface CloneQubitsResult {
    /**
     * cloneされたQubit
     */
    qubits: Qubit[];

    /**
     * clone元に指定されたQubitのqubits配列上のインデックス
     */
    index: number;
}
