# qramana: A TypeScript library for quantum calculation.

`qramana` is a TypeScript library for quantum calculation.
It attempts to make it easy for users to handle quantum computing.
These are `qramana`'s features.

 - Can handle qubit with only Qubit interface
 - No need to consider synthetic quantum systems
 - Can be implemented in JavaScript application (e.g. browser, Node.js)
 - Pick and choose background system that make sense for you

## Can handle qubit with only Qubit interface

Users define qubits object like below.

```
const qubit1 = new Qubit();
const qubit2 = new Qubit();
qubit1.x();
```

Variable qubit1 mean 1 logical qubit, has a quantum gate method.
Then, users can apply arbitrary gates on each qubits independently.

## No need to consider synthetic quantum systems

Multi-qubit gate requires Qubit as an argument.
After applying the multi-qubit gate, individual qubit variables are still available.
Users don't have to consider how qubit1 and qubit2 are entangled.

```
const qubit1 = new Qubit();
const qubit2 = new Qubit();
qubit1.h();
qubit2.cnot(qubit1); // generate synthetic quantum system
qubit2.x(); // keep independent qubit interface
```
You can see qubit interface reference [here](./apidocs/qubit.md).

## Can be implemented in JavaScript application (e.g. browser content, Node.js)

`qramana` is JavaScript module written in TypeScript, published to npm.
Also, qramana doesn't depend on browser/Node.js specific features.

Therefore, users can develop with TypeScript and use `qramana` in any Javascript implementation.

## Pick and choose background system that make sense for you

`qramana` can choose some backend system.
If you want to add new backend systems, you can use it by implementing driver.

[qramana-common-types](https://github.com/qramana/qramana-common-types) is 
Type definition for driver interface.
Default driver implementation is [here](../src/QuantumStateImpl/QuantumStateJsqubits.ts).
Currently, `qramana` uses [jsqubits](http://davidbkemp.github.io/jsqubits/) for its backend.
