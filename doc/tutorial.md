# Tutorial

## Install qramana

 `qramana` is typescript library for quantum calculation.
 Before you start, you have to get `node`, `npm` and typescript compiler in your environment.
 Then `qramana` can be installed via npm,

 ```
 $ npm install @qramana/qramana
 ```

## Creating a Bell state

Now you have tools to run `qramana` quantum calculation.
Let's start from creating a Bell state by using `qramana`.

### Define qubit

A Bell state is the state that two qubits are entangled, so first of all we have to define two qubits.
In `qramana` framework, we can define qubits as a instance of Qubit class.

```typescript
import * as q from "@qramana/qramana";

const q1 = new q.Qubit({ value: "|0>" });
const q2 = new q.Qubit({ value: "|0>" });
```

### Apply gate to qubits

To obtain desired quantum states, we have to make qubits entables by applaying unitary operations.
We can obtain a Bell state by applying `Hadamard` gate and `CNOT` gate.

You can define operations intuitively on `qramana`.

```typescript
q1.h();
q2.cnot(q1);
```

This form is quite simple!
First line, q1 is applied `Hadamard` gate.
After that, we can apply `CNOT` gate to q1 and q2.

### Measurement

In here we obtain a Bell state. 
If you measure the first qubit, you obtain two possible results for the second qubit 0 with 50% and 1 with 50%.
To see this, try measure 100 times and get ratios.

```typescript
import * as q from "@qramana/qramana";

var num_of_zero_state = 0;
var num_of_one_state = 0;

for (var i = 0; i < 100; i++) {
    const q1 = new q.Qubit({ value: "|0>" });
    const q2 = new q.Qubit({ value: "|0>" });
    q1.h();
    q2.cnot(q1);

    if (q2.measure() == 0) {
        num_of_zero_state += 1
    } else {
        num_of_one_state += 1
    }
}
console.log(`The probability to get 0 state is ${ num_of_zero_state / 100 }`);
```

This is complete scirpt to measure second qubit of a Bell state. Let's save as "bell_state.ts".

You can run this script by

```
$ tsc bell_state.ts
$ node bell_state.js
```

and you will obtain

```
The probability to get 0 state is 0.48
```

The probabilty may be 0.51 or other, but it will be near 0.5.
This shows that you obtain the state which is 0 with 50% and 1 with 50%.

