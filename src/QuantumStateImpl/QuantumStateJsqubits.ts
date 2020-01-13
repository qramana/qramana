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

        this.simulated = {
            clone: () => {
                const newQuantumState = new QuantumStateJsqubits(0);
                newQuantumState._qstate = this._qstate.normalize(); // 厳密にはcloneではないが、qramanaでnormalizeされていないQStateを利用するケースは無い
                return newQuantumState;
            },
            getStateVector: () => {
                const vectorLength = this._qstate.numBits();
                const amplitudes = [];
                for (let i = 0; i < vectorLength; i++) {
                    const value = this._qstate.amplitude(i);
                    amplitudes.push({
                        re: value.real,
                        im: value.imaginary
                    });
                }
                return amplitudes;
            }
        };
    }

    x(bitId: number): void {
        this._qstate = this._qstate.X(bitId);
    }

    y(bitId: number): void {
        this._qstate = this._qstate.Y(bitId);
    }

    z(bitId: number): void {
        this._qstate = this._qstate.Z(bitId);
    }

    r(bitId: number, angle: number): void {
        this._qstate = this._qstate.r(bitId, angle);
    }

    s(bitId: number): void {
        this._qstate = this._qstate.s(bitId);
    }

    t(bitId: number): void {
        this._qstate = this._qstate.t(bitId);
    }

    h(bitId: number): void {
        this._qstate = this._qstate.hadamard(bitId);
    }

    cnot(controllBitId: number, targetBitId: number): void {
        this._qstate = this._qstate.controlledX(controllBitId, targetBitId);
    }

    controlledX(controllBitId: number, targetBitId: number): void {
        this._qstate = this._qstate.controlledX(controllBitId, targetBitId);
    }

    controlledY(controllBitId: number, targetBitId: number): void {
        this._qstate = this._qstate.controlledY(controllBitId, targetBitId);
    }

    controlledZ(controllBitId: number, targetBitId: number): void {
        this._qstate = this._qstate.controlledZ(controllBitId, targetBitId);
    }

    rx(bitId: number, angle: number): void {
        this._qstate = this._qstate.rotateX(bitId, angle);
    }

    ry(bitId: number, angle: number): void {
        this._qstate = this._qstate.rotateY(bitId, angle);
    }

    rz(bitId: number, angle: number): void {
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

    get length(): number {
        return this._qstate.numBits();
    }

    toString(): string {
        return this._qstate.toString();
    }
}
