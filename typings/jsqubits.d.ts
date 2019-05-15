declare const jsqubits: JSQubitsStatic;

declare namespace jsqubits {
  namespace jsqubits {
    interface QState {
      multiply(amount: number | Complex): QState;
      tensorProduct(qstate: QState): QState;
      X(targetBits: number): QState;
      Z(targetBits: number): QState;
      hadamard(targetBits: number): QState;
      cnot(controlBits: number, targetBits: number): QState;
      toString(): string;
      numBits(): number;
      measure(bits: number | number[] | jsqubits.ALL | MeasureBitsRange): Measurement;
    }

    export type ALL = "ALL";

    interface Complex {
      add(other: number | Complex): Complex;
      multiply(other: number | Complex): Complex;
      conjugate(): Complex;
      toString(): string;
      inspect(): string;
      format(options?: any): string;
      negate(): Complex;
      magnitude(): number;
      phase(): number;
      subtract(other: number | Complex): Complex;
      eql(other: number | Complex): boolean;
      closeTo(other: Complex): number;
    }
    interface Measurement {
      numBits: number;
      result: number;
      newState: QState;
      toString(): string;
      asBitString(): string;
    }
  }
}

interface JSQubitsStatic {
  jsqubits: InternalJSQubitsStatic;
}

interface InternalJSQubitsStatic {
  (bitString: string): any;
  QState: QStateStatic;
  Complex: ComplexStatic;
  Measurement: MeasurementStatic;
  real: (real: number) => ComplexStatic;
}

interface QStateStatic {
  new (bitString: string): jsqubits.jsqubits.QState;
  fromBits(bitString: string): jsqubits.jsqubits.QState;
}

interface ComplexStatic {
  ONE: jsqubits.jsqubits.Complex;
  ZERO: jsqubits.jsqubits.Complex;
  SQRT2: jsqubits.jsqubits.Complex;
  SQRT1_2: jsqubits.jsqubits.Complex;
  new (real: number, imaginary: number): jsqubits.jsqubits.Complex;
}

/*
interface MeasurementStatic {
  new (numBits: number, result: number, newState: jsqubits.jsqubits.QState): jsqubits.jsqubits.Measurement;
}
*/
type MeasurementStatic = new (numBits: number, result: number, newState: jsqubits.jsqubits.QState) => jsqubits.jsqubits.Measurement;

interface MeasureBitsRange {
  from: number;
  to: number;
}

declare module "jsqubits" {
  export = jsqubits;
}
