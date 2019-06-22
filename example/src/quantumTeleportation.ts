import * as p from "../../lib/index";

const q1 = new p.Qubit({ value: "|0>" });
const q2 = new p.Qubit({ value: "|0>" });
const q3 = new p.Qubit({ value: "|1>" });

// 量子テレポーテーション

//create max entangle
q2.h();
q3.cnot(q2);

// teleportation
q2.cnot(q1);
q1.h();

let result1 = q1.measure();
let result2 = q2.measure();
if (result1 === 1) q3.z();
if (result2 === 0) q3.x();

console.log("result", JSON.stringify(q3.toString()));
console.log("measure", q3.measure());
