import * as p from "../../lib/index";

// Find |11> states.

const q1 = new p.Qubit({ value: "|0>" });
const q2 = new p.Qubit({ value: "|0>" });

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
console.log("result", JSON.stringify(q1.toString()));
