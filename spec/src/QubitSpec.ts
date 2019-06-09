import * as q from "../../lib/index";
import * as mock from "../helpers/mock";

describe("test Qubit", () => {
    let core;
    beforeEach(() => {
        core = new mock.MockCore({ quantumStateGenerator: mock.quantumStateJsQubitsGenerator });
        q.Qubit._core = core;
    });

    describe("new", () => {
        it("will finish without throwing Error", (done: any) => {
            const qubit = new q.Qubit({ value: "|0>" });
            done();
        });
    });

    describe("#toString", () => {
        it("will be ket-format string", (done: any) => {
            const qubit = new q.Qubit({ value: "|0>" });
            expect(qubit.toString()).toBe("|0>");
            done();
        });
    });

    describe("#x", () => {
        it("applies X operator to 0-ket", (done: any) => {
            const qubit = new q.Qubit({ value: "|0>" });
            qubit.x();
            expect(qubit.toString()).toBe("|1>");
            done();
        });

        it("applies X operator to 1-ket", (done: any) => {
            const qubit = new q.Qubit({ value: "|1>" });
            qubit.x();
            expect(qubit.toString()).toBe("|0>");
            done();
        });
    });

    describe("#y", () => {
        it("applies Y operator to 0-ket", (done: any) => {
            const qubit = new q.Qubit({ value: "|0>" });
            qubit.y();
            expect(qubit.toString()).toBe("(i)|1>");
            done();
        });

        it("applies Y operator to 1-ket", (done: any) => {
            const qubit = new q.Qubit({ value: "|1>" });
            qubit.y();
            expect(qubit.toString()).toBe("(-i)|0>");
            done();
        });
    });

    describe("#z", () => {
        it("applies Z operator to 0-ket", (done: any) => {
            const qubit = new q.Qubit({ value: "|0>" });
            qubit.z();
            expect(qubit.toString()).toBe("|0>");
            done();
        });
        it("applies Z operator to 1-ket", (done: any) => {
            const qubit = new q.Qubit({ value: "|1>" });
            qubit.z();
            expect(qubit.toString()).toBe("(-1)|1>");
            done();
        });
    });
});
