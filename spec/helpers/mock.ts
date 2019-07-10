import { Core, QuantumStateJsqubits } from "../../lib/index";
import { QuantumStateInitializeType } from "../../lib/QuantumState";

export class MockCore extends Core {

}

export class MockQuantumStateJsQubits extends QuantumStateJsqubits {

}

export function quantumStateJsQubitsGenerator(param: QuantumStateInitializeType) {
    return new MockQuantumStateJsQubits(param);
}
