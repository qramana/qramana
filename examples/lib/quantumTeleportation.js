"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var p = require("../../lib/index");
// あとで名前変える
var q1 = new p.Qubit({ value: "|0>" });
var q2 = new p.Qubit({ value: "|0>" });
var q3 = new p.Qubit({ value: "|1>" });
// 量子テレポーテーション
//create max entangle 2~3
q2.h();
console.log("HHHH", JSON.stringify(q2.toString()));
console.log("Q3", JSON.stringify(q3.toString()));
q3.cnot(q2);
console.log("XXXX", JSON.stringify(q2.toString()));
// teleportation
q2.cnot(q1);
console.log("XXXX2", JSON.stringify(q1.toString()));
q1.h();
var result1 = q1.measure();
var result2 = q2.measure();
console.log("measure result", result1, result2);
console.log("RRRR", JSON.stringify(q3.toString()));
if (result1 === 1) {
    console.log("OP1", JSON.stringify(q3.toString()));
    q3.z();
    console.log("OP1", JSON.stringify(q3.toString()));
}
if (result2 === 0) {
    console.log("OP2", JSON.stringify(q3.toString()));
    q3.x();
    console.log("OP2", JSON.stringify(q3.toString()));
}
console.log("result", JSON.stringify(q3.toString()));
console.log("measure", q3.measure());
