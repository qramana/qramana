import { QuantumState } from "@qramana/qramana-common-types";

/**
 * ユニバーサルゲートセットで構成可能な演算のセット
 */

 /**
  * toffoliゲート
  */
 export function toffoli(quantumState: QuantumState, controlBitId0: number, controlBitId1: number, targetBitId: number) {
    quantumState.t(controlBitId1);
    quantumState.h(targetBitId);
    quantumState.t(targetBitId);
    quantumState.cnot(controlBitId1, targetBitId);
    t_dag(quantumState, targetBitId);
    quantumState.cnot(controlBitId1, targetBitId);
    quantumState.cnot(controlBitId0, controlBitId1);
    t_dag(quantumState, controlBitId1);
    quantumState.cnot(controlBitId1, targetBitId);
    quantumState.t(targetBitId);
    quantumState.cnot(controlBitId1, targetBitId);
    quantumState.cnot(controlBitId0, controlBitId1);
    quantumState.cnot(controlBitId0, targetBitId);
    t_dag(quantumState, targetBitId);
    quantumState.cnot(controlBitId0, targetBitId);
    quantumState.t(controlBitId0);
    quantumState.h(targetBitId);
}

 function t_dag(quantumState: QuantumState, bitId: number) {
    quantumState.t(bitId);
    quantumState.t(bitId);
    quantumState.t(bitId);
}