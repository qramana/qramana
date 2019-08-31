import { QuantumState } from "@qramana/qramana-common-types";

/**
 * ユニバーサルゲートセットで構成可能な演算のセット
 */

/**
  * toffoliゲート
  */
export function toffoli(quantumState: QuantumState, controlBitId0: number, controlBitId1: number, targetBitId: number): void {
    quantumState.t(controlBitId1);
    quantumState.h(targetBitId);
    quantumState.t(targetBitId);
    quantumState.cnot(controlBitId1, targetBitId);
    tDag(quantumState, targetBitId);
    quantumState.cnot(controlBitId1, targetBitId);
    quantumState.cnot(controlBitId0, controlBitId1);
    tDag(quantumState, controlBitId1);
    quantumState.cnot(controlBitId1, targetBitId);
    quantumState.t(targetBitId);
    quantumState.cnot(controlBitId1, targetBitId);
    quantumState.cnot(controlBitId0, controlBitId1);
    quantumState.cnot(controlBitId0, targetBitId);
    tDag(quantumState, targetBitId);
    quantumState.cnot(controlBitId0, targetBitId);
    quantumState.t(controlBitId0);
    quantumState.h(targetBitId);
}

function tDag(quantumState: QuantumState, bitId: number): void {
    quantumState.t(bitId);
    quantumState.t(bitId);
    quantumState.t(bitId);
}
