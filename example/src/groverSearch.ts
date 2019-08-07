import * as p from "../../lib/index";

// Find |11> states.

const q1 = new p.Qubit({ value: 0 });
const q2 = new p.Qubit({ value: 0 });

// Prepare quantum states.
q1.h();
q2.h();

// Apply grover iteration.
// Flip target states phase.
q2.controlledZ(q1);

// Flip around average state.
q1.h();
q2.h();
q1.x();
q2.x();
q2.controlledZ(q1);
q1.x();
q2.x();
q1.h();
q2.h();

// Show results
const m1 = q1.measure();
const m2 = q2.measure();
console.log("Measurement result: q1=" + m1 + ", q2=" + m2);
