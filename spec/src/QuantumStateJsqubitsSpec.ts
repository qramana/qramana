import * as q from "../../lib/index";

describe("test QuantumStateJsQubits", () => {
    it("new", (done: any) => {
        const state = new q.QuantumStateJsqubits("|0>");
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

    describe("#simulated", () => {
        describe("#clone", () => {
            it(" clone 0 state", (done: any) => {
                const state = new q.QuantumStateJsqubits(0);
                const clonedState = state.simulated.clone();
                expect(state.toString()).toBe(clonedState.toString());
                done();
            });
            it(" clone hadamard state", (done: any) => {
                const state = new q.QuantumStateJsqubits(0);
                state.h(0);
                const clonedState = state.simulated.clone();
                expect(state.toString()).toBe(clonedState.toString());
                done();
            });
            it(" clone 2 qubit state", (done: any) => {
                const state = (new q.QuantumStateJsqubits(0)).merge(new q.QuantumStateJsqubits(0));
                const clonedState = state.simulated.clone();
                expect(state.toString()).toBe(clonedState.toString());
                done();
            });
            it(" clone 2 qubit hadamard state", (done: any) => {
                const state0 = new q.QuantumStateJsqubits(0);
                const state1 = new q.QuantumStateJsqubits(0);
                state0.h(0);
                state1.h(0);
                const state = state0.merge(state1);
                const clonedState = state.simulated.clone();
                expect(state.toString()).toBe(clonedState.toString());
                done();
            });
        });

    });

});
