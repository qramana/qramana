# Qubit API Reference
A `Qubit` is a class which identifying a single qubit.

## Initialize
A `Qubit` generates a single qubit object.
It takes a initial state parameter.
The default value is `0`.

Usage:
```
// It generates |0> qubit.
qubit0 = new Qubit();
// It generates |1> qubit.
qubit1 = new Qubit(1);
```

## Single Qubit Gates
Operations you can apply to a single qubit.

method | description
-- | --
x() | It applies a Pauli X gate.
y() | It applies a Pauli Y gate.
z() | It applies a Pauli Z gate.
r(angle: number) | It applies a phaze shift gate with `angle` angle.
s() | It applies a phaze shift gate with π/2 angle.
t() | It applies a phaze shift gate with π/4 angle.
rotateX(angle: number) | It applies a rotate gate which arounds axis X with `angle` angle.
rotateY(angle: number) | It applies a rotate gate which arounds axis Y with `angle` angle.
rotateZ(angle: number) | It applies a rotate gate which arounds axis Z with `angle` angle.
h() | It applies an Hadamard gate.
measure() | It measures its qubit.

## Multi Qubit Gates
Operations you can apply to multi qubit.

method | description
-- | --
cnot(controlQubit: Qubit) | It applies a controlled NOT gate whose controlled gate is `controlQubit` and operation gate is itself.
controlledX(controlQubit: Qubit) | It applies a controlled Pauli X gate whose controlled gate is `controlQubit` and operation gate is itself.
controlledY(controlQubit: Qubit) | It applies a controlled Pauli Y gate whose controlled gate is `controlQubit` and operation gate is itself.
controlledZ(controlQubit: Qubit) | It applies a controlled Pauli Z gate whose controlled gate is `controlQubit` and operation gate is itself.
toffoli(controlQubit0: Qubit, controlQubit1: Qubit) | It applies a Toffoli gate whose conrolled bits are `controlQubit0` and `controlQubit1` and operation gate is itself.
