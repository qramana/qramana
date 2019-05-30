import { Core, QuantumState, QuantumStateJsqubits } from "../../lib/index";
import { QuantumStateParameter } from "../../lib/QuantumState";

export class MockCore extends Core {

}

export class MockQuantumStateJsQubits extends QuantumStateJsqubits {

}

export function quantumStateJsQubitsGenerator(param: QuantumStateParameter) {
    return new MockQuantumStateJsQubits(param);
}
