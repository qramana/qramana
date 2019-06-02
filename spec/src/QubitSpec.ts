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
});
