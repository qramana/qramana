import { Qubit } from "../src/Qubit";

const qubit = new Qubit();

qubit.h();
const result = qubit.measure();

console.log(result);
