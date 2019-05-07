import { Qubit } from "../src/Qubit";

let q1 = new Qubit();
let q2 = new Qubit();

q1.cnot(q2);
q1.h();
let result1 = q1.measure();
let result2 = q2.measure();

if (result1 == 1) {
    q1.x();
}
if (result2 == 1) {
    q1.z();
}

const lastState = q1;
