# qramana: A TypeScript library for quantum calculation.

`qramana` is a TypeScript library for quantum calculation.
It attempts to make it easy for users to handle quantum computing.
These are `qramana`'s features.

 - Can handle qubit with only Qubit interface
 - No need to consider synthetic quantum systems
 - Can be implemented in JavaScript application (e.g. browser, Node.js)
 - Pick and choose background system that meke sense for you

## Can handle qubit with only Qubit interface, and no need to consider synthetic quantum systems

Users define qubits object like below.

```
const qubit1 = new Qubit();
const qubit2 = new Qubit();
```

Then, users can apply arbitrary gates on each qubits independently.
Users don't have to consider how qubit1 and qubit2 are entangled.

```
qubit1.h();
qubit2.cnot(qubit1); // generate synthetic quantum system
qubit2.x(); // keep indipendent qubit interface
```
You can see qubit interface reference [here](./apidocs/qubit.md).

## Can be implemented in JavaScript application (e.g. browser content, Node.js app)

`qramana` can be installed via npm.
Therefore, users can develop with TypeScript and use `qramana` in web browser directly.

## Pick and choose background system that make sense for you(Future)

`qramana` can choose some backend system.
If you want to add new backend systems, you can use it by implementing driver.
Example of the driver is [here](../src/QuantumStateImpl/QuantumStateJsqubits.ts).
Currently, `qramana` uses [jsqubits](http://davidbkemp.github.io/jsqubits/) for its backend.

## Tutorial

[Tutorial](./tutorial.md)

## example

Sample codes are [here](../example).
