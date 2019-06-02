import * as q from "../../lib/index";
import * as mock from "../helpers/mock";

describe("test Qubit", () => {
    let core;
    beforeEach(() => {
        core = new mock.MockCore({ quantumStateGenerator: mock.quantumStateJsQubitsGenerator });
        q.Qubit._core = core;
    });

    it("initialize", (done: any) => {
        const qubit = new q.Qubit({ value: "|0>" });
        done();
    });

    it("toString", (done: any) => {
        const qubit = new q.Qubit({ value: "|0>" });
        expect(qubit.toString()).toBe("|0>");
        done();
    });

    it("x", (done: any) => {
        const qubit = new q.Qubit({ value: "|0>" });
        qubit.x();
        expect(qubit.toString()).toBe("|1>");
        qubit.x();
        expect(qubit.toString()).toBe("|0>");
        done();
    });

    it("x_in_minus_ket", (done: any) => {
        const qubit = new q.Qubit({ value: "|0>" });
        qubit.x();
        qubit.h();
        expect(qubit.toString()).toBe("(0.7071)|0> + (-0.7071)|1>"); // |->
        qubit.x();
        expect(qubit.toString()).toBe("(-0.7071)|0> + (0.7071)|1>"); // X|-> = -|->
        done();
    });

    it("y", (done: any) => {
        const qubit = new q.Qubit({ value: "|0>" });
        qubit.y();
        expect(qubit.toString()).toBe("(i)|1>");
        qubit.y();
        expect(qubit.toString()).toBe("|0>");
        done();
    });

    it("y_with_1_state", (done: any) => {
        const qubit = new q.Qubit({ value: "|0>" });
        qubit.x();
        expect(qubit.toString()).toBe("|1>");
        qubit.y();
        expect(qubit.toString()).toBe("(-i)|0>");
        qubit.y();
        expect(qubit.toString()).toBe("|1>");
        done();
    });
});
