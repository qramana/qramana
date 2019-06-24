declare const jsqubits: JSQubitsStatic;

declare namespace jsqubits {
  namespace jsqubits {
    interface QState {
      multiply(amount: number | Complex): QState;
      tensorProduct(qState: QState): QState;
      x(targetBits: SingleQubitOperatorTargetQubits): QState;
      X(targetBits: SingleQubitOperatorTargetQubits): QState;
      not(targetBits: SingleQubitOperatorTargetQubits): QState;
      y(targetBits: SingleQubitOperatorTargetQubits): QState;
      Y(targetBits: SingleQubitOperatorTargetQubits): QState;
      z(targetBits: SingleQubitOperatorTargetQubits): QState;
      Z(targetBits: SingleQubitOperatorTargetQubits): QState;
      hadamard(targetBits: SingleQubitOperatorTargetQubits): QState;
      r(targetBits: SingleQubitOperatorTargetQubits, angle: number): QState;
      s(targetBits: SingleQubitOperatorTargetQubits): QState;
      S(targetBits: SingleQubitOperatorTargetQubits): QState;
      t(targetBits: SingleQubitOperatorTargetQubits): QState;
      T(targetBits: SingleQubitOperatorTargetQubits): QState;
      cnot(controlBits: number, targetBits: number): QState;
      controlledX(controlBits: number, targetBits: number): QState;
      controlledY(controlBits: number, targetBits: number): QState;
      controlledZ(controlBits: number, targetBits: number): QState;
      rotateX(targetBits: SingleQubitOperatorTargetQubits, angle: number): QState;
      rotateY(targetBits: SingleQubitOperatorTargetQubits, angle: number): QState;
      rotateZ(targetBits: SingleQubitOperatorTargetQubits, angle: number): QState;
      measure(bits: number | number[] | jsqubits.ALL | BitsRange): Measurement;

      toString(): string;
      numBits(): number;

      add(qState: QState): QState;
      subtract(qState: QState): QState;
      normalize(): QState;
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
  (bitString: string): jsqubits.jsqubits.QState;
  QState: QStateStatic;
  Complex: ComplexStatic;
  Measurement: MeasurementStatic;
  real: (real: number) => jsqubits.jsqubits.Complex;
  complex: (real: number, imaginary: number) => jsqubits.jsqubits.Complex;
  ZERO: ComplexStatic["ZERO"];
  ONE: jsqubits.jsqubits.Complex;
  ALL: string;
}

interface QStateStatic {
  new (numBits: number, amplitudes?: jsqubits.jsqubits.Complex[]): jsqubits.jsqubits.QState;
  fromBits(bitString: string): jsqubits.jsqubits.QState;
}

interface ComplexStatic {
  ONE: jsqubits.jsqubits.Complex;
  ZERO: jsqubits.jsqubits.Complex;
  SQRT2: jsqubits.jsqubits.Complex;
  SQRT1_2: jsqubits.jsqubits.Complex;
  new (real: number, imaginary: number): jsqubits.jsqubits.Complex;
}

type MeasurementStatic = new (numBits: number, result: number, newState: jsqubits.jsqubits.QState) => jsqubits.jsqubits.Measurement;

type SingleQubitOperatorTargetQubits = number | number[] | InternalJSQubitsStatic["ALL"] | BitsRange;

interface BitsRange {
  from: number;
  to: number;
}

declare module "jsqubits" {
  export = jsqubits;
}
