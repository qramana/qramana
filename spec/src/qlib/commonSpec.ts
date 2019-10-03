import * as q from "../../../lib/index";
import * as mock from "../../helpers/mock";

describe("Test intToQubits", () => {
    let core;
    beforeEach(() => {
        core = new mock.MockCore({ quantumStateGenerator: mock.quantumStateJsQubitsGenerator });
        q.Qubit._core = core;
    });

    it("generates quantum bits", (done: any) => {
        const qubits = q.Util.intToQubits(6,5);
        expect(qubits.length).toBe(5);
        expect(qubits[0].toString()).toBe("|0>");
        expect(qubits[1].toString()).toBe("|1>");
        expect(qubits[2].toString()).toBe("|1>");
        expect(qubits[3].toString()).toBe("|0>");
        expect(qubits[4].toString()).toBe("|0>");
        done();
    });

    it("returns error if length is short", (done: any) => {
        const desired = new Error("Designated qubits length cannot express given number.");
        try {
            const qubits = q.Util.intToQubits(8, 2);
        } catch(e) {
            expect(e.message).toBe(desired.message);
            done();
        }
    });
});
