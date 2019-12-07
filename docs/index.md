# qramana: A TypeScript library for quantum calculation.
`qramana` is a TypeScript library for quantum calculation.
It attempts to make it easy for users to handle quantum computing.
These are `qramana`'s features.

 - Can handle qubit with only Qubit interface
 - No need to consider synthetic systems
 - Can be implemented in browser application (e.g. browser games)
 - Pick and choose background system that meke sense for you

## Can handle qubit with only Qubit interface and No need to consider synthetic systems
Users define qubits object like below.
```
qubit1 = new Qubit();
qubit2 = new Qubit();
```
Then, users can apply aribitary gates on each qubits independently.
Users don't have to consider how qubit1 and qubit2 are entangled.
```
qubit1.x();
qubit2.h();
```

## Can be implemented in browser application (e.g. browser games)
`qramana` is a TypeScript library.
Therefore, users can use `qramana` in web browser directly.

## Pick and choose background system that meke sense for you(Future)
`qramana` can choose some backend system.
If you want to add new backend system, you can use it by implementing driver.
Example of the driver is [here](../src/QuantumStateImpl/QuantumStateJsqubits.ts).
Currently, `qramana` uses [jsqubits](http://davidbkemp.github.io/jsqubits/) for its backend.

# example
Sample codes are [here](../example).
