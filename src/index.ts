import { QuantumState, MeasurementResult, QuantumStateGenerator } from "@qramana/qramana-common-types";
export { QuantumState, MeasurementResult, QuantumStateGenerator };
import { QuantumStateJsqubits, quantumStateJsQubitsGenerator } from "./QuantumStateImpl/QuantumStateJsqubits";
export { QuantumStateJsqubits };
import { Qubit } from "./Qubit";
export { Qubit };
import { Core, CoreConfig } from "./Core";
export { Core, CoreConfig };

/**
 * Plamanaの挙動を変更する初期化パラメータ
 */
export interface ConfigParameter {
    /**
     * QuantumStateのジェネレータを変更し、QuantumStateGeneratorを継承した任意の関数に変更するI/F
     */
    customQuantumStateGenerator?: QuantumStateGenerator;
}

const coreConfig: CoreConfig = {
    quantumStateGenerator: quantumStateJsQubitsGenerator
};

/**
 * Plamanaの挙動を設定する
 * 最初のQubitを生成した後に呼び出した場合、その動作は不定である
 */
export function config(config: ConfigParameter): void {
    // default以外のQuantumState実装を差し込む
    if (config.customQuantumStateGenerator) coreConfig.quantumStateGenerator = config.customQuantumStateGenerator;
}

const core = new Core(coreConfig);

Qubit._core = core;
