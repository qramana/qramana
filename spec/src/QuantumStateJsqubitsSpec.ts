import * as q from "../../lib/index";

describe("test QuantumStateJsQubits", () => {
    it("new", (done: any) => {
        let state = new q.QuantumStateJsqubits("|0>");
        expect(state).not.toBeUndefined();
        done();
    });

    describe("#toString", () => {
        it("return jsqubit tostring", (done: any) => {
            const state = new q.QuantumStateJsqubits("|0>");
            expect(state.toString()).toBe("|0>");
            done();
        });
    });

    describe("#x", () => {
        it("applies X operator to 0-ket", (done: any) => {
            const state = new q.QuantumStateJsqubits("|0>");
            expect(state.toString()).toBe("|0>");
            state.x(0);
            expect(state.toString()).toBe("|1>");
            done();
        });

        it("applies X operator to 1-ket", (done: any) => {
            const state = new q.QuantumStateJsqubits("|1>");
            expect(state.toString()).toBe("|1>");
            state.x(0);
            expect(state.toString()).toBe("|0>");
            done();
        });
    });
});
