import { QuantumState, MeasurementResult, QuantumStateInitializeType, QuantumStateGenerator } from "@qramana/qramana-common-types";
import * as jsq from "jsqubits";

/**
 * QuantumStateGeneratorのjsqubits実装
 */
export const quantumStateJsQubitsGenerator: QuantumStateGenerator = function(param: QuantumStateInitializeType) {
    return new QuantumStateJsqubits(param);
};

/**
 * QuantumStateのjsqubits実装
 */
export class QuantumStateJsqubits extends QuantumState {
    // 抽象QuantumStateに無いメンバーは全てprivateで持つ
    private _qstate: jsq.jsqubits.QState;

    constructor(param: QuantumStateInitializeType) {
        super(param);
        this._qstate = jsq.jsqubits("|0>");
        if (typeof param === "number") {
            switch (param) {
                case 0:
                    // do nothing
                    break;
                case 1:
                    this._qstate = this._qstate.x(0);
                    break;
                default:
                    // invalid state
            }
        } else {
            switch (param) {
                case "0":
                case "|0>":
                    // do nothing
                    break;
                case "1":
                case "|1>":
                    this._qstate = this._qstate.x(0);
                    break;
                case "+":
                    this._qstate = this._qstate.hadamard(0);
                    break;
                case "-":
                    this._qstate = this._qstate.x(0);
                    this._qstate = this._qstate.hadamard(0);
                    break;
                default:
                    // invalid state
            }
        }
    }

    x(bitId: number) {
        this._qstate = this._qstate.X(bitId);
    }

    y(bitId: number) {
        this._qstate = this._qstate.Y(bitId);
    }

    z(bitId: number) {
        this._qstate = this._qstate.Z(bitId);
    }

    r(bitId: number, angle: number) {
        this._qstate = this._qstate.r(bitId, angle);
    }

    s(bitId: number) {
        this._qstate = this._qstate.s(bitId);
    }

    t(bitId: number) {
        this._qstate = this._qstate.t(bitId);
    }

    h(bitId: number) {
        this._qstate = this._qstate.hadamard(bitId);
    }

    cnot(controllBitId: number, targetBitId: number) {
        this._qstate = this._qstate.controlledX(controllBitId, targetBitId);
    }

    controlledX(controllBitId: number, targetBitId: number) {
        this._qstate = this._qstate.controlledX(controllBitId, targetBitId);
    }

    controlledY(controllBitId: number, targetBitId: number) {
        this._qstate = this._qstate.controlledY(controllBitId, targetBitId);
    }

    controlledZ(controllBitId: number, targetBitId: number) {
        this._qstate = this._qstate.controlledZ(controllBitId, targetBitId);
    }

    rx(bitId: number, angle: number) {
        this._qstate = this._qstate.rotateX(bitId, angle);
    }

    ry(bitId: number, angle: number) {
        this._qstate = this._qstate.rotateY(bitId, angle);
    }

    rz(bitId: number, angle: number) {
        this._qstate = this._qstate.rotateZ(bitId, angle);
    }

    measure(bitId: number): MeasurementResult {
        const measurementResult = this._qstate.measure(bitId);
        this._qstate = measurementResult.newState;
        return {
            newQuantumState: this,
            result: measurementResult.result
        };
    }

    merge(quantumState: QuantumStateJsqubits): QuantumStateJsqubits {
        this._qstate = this._qstate.tensorProduct(quantumState._qstate);
        return this;
    }

    get length() {
        return this._qstate.numBits();
    }

    toString() {
        return this._qstate.toString();
    }
}
