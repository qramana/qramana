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
            const qubit = new q.Qubit({ value: 0 });
            expect(!!qubit).toBe(true);
            done();
        });
    });

    describe("#toString", () => {
        it("will be ket-format string", (done: any) => {
            const qubit = new q.Qubit({ value: 0 });
            expect(qubit.toString()).toBe("|0>");
            done();
        });
    });

    describe("Pauli Operators", () => {
        describe("#x", () => {
            it("applies X operator to 0-ket", (done: any) => {
                const qubit = new q.Qubit({ value: 0 });
                qubit.x();
                expect(qubit.toString()).toBe("|1>");
                done();
            });

            it("applies X operator to 1-ket", (done: any) => {
                const qubit = new q.Qubit({ value: 1 });
                qubit.x();
                expect(qubit.toString()).toBe("|0>");
                done();
            });
        });

        describe("#y", () => {
            it("applies Y operator to 0-ket", (done: any) => {
                const qubit = new q.Qubit({ value: 0 });
                qubit.y();
                expect(qubit.toString()).toBe("(i)|1>");
                done();
            });

            it("applies Y operator to 1-ket", (done: any) => {
                const qubit = new q.Qubit({ value: 1 });
                qubit.y();
                expect(qubit.toString()).toBe("(-i)|0>");
                done();
            });
        });

        describe("#z", () => {
            it("applies Z operator to 0-ket", (done: any) => {
                const qubit = new q.Qubit({ value: 0 });
                qubit.z();
                expect(qubit.toString()).toBe("|0>");
                done();
            });
            it("applies Z operator to 1-ket", (done: any) => {
                const qubit = new q.Qubit({ value: 1 });
                qubit.z();
                expect(qubit.toString()).toBe("(-1)|1>");
                done();
            });
        });

        describe("#h", () => {
            it("applies hadamard operator to 0-ket", (done: any) => {
                const qubit = new q.Qubit({ value: 0 });
                qubit.h();
                expect(qubit.toString()).toBe("(0.7071)|0> + (0.7071)|1>");
                done();
            });
            it("applies hadamard operator to 1-ket", (done: any) => {
                const qubit = new q.Qubit({ value: 1 });
                qubit.h();
                expect(qubit.toString()).toBe("(0.7071)|0> + (-0.7071)|1>");
                done();
            });
        });
    });

    describe("Phase shift Operators", () => {
        describe("#r", () => {
            it("applies phase shift operator to 0-ket", (done: any) => {
                const qubit = new q.Qubit({ value: 0 });
                qubit.r(Math.PI / 3);
                expect(qubit.toString()).toBe("|0>");
                done();
            });
            it("applies phase shift operator to 1-ket", (done: any) => {
                const qubit = new q.Qubit({ value: 1 });
                qubit.r(Math.PI / 3);
                expect(qubit.toString()).toBe("(0.5+0.866i)|1>");
                done();
            });
        });
        describe("#t", () => {
            it("applies phase shift pi/4 (as t) operator to 0-ket", (done: any) => {
                const qubit = new q.Qubit({ value: 0 });
                qubit.t();
                expect(qubit.toString()).toBe("|0>");
                done();
            });
            it("applies phase shift pi/4 (as t) operator to 1-ket", (done: any) => {
                const qubit = new q.Qubit({ value: 1 });
                qubit.t();
                expect(qubit.toString()).toBe("(0.7071+0.7071i)|1>");
                done();
            });
        });
        describe("#s", () => {
            it("applies phase shift pi/2 (as s) operator to 0-ket", (done: any) => {
                const qubit = new q.Qubit({ value: 0 });
                qubit.s();
                expect(qubit.toString()).toBe("|0>");
                done();
            });
            it("applies phase shift pi/2 (as s) operator to 1-ket", (done: any) => {
                const qubit = new q.Qubit({ value: 1 });
                qubit.s();
                expect(qubit.toString()).toBe("(i)|1>");
                done();
            });
        });
    });

    describe("Controlled operators", () => {
        describe("#cnot", () => {
            it("applies cnot operator to 00-ket", (done: any) => {
                const controlQubit = new q.Qubit({ value: 0 });
                const targetQubit = new q.Qubit({ value: 0});
                targetQubit.cnot(controlQubit);
                expect(controlQubit.toString()).toBe("|00>");
                expect(targetQubit.toString()).toBe("|00>");
                done();
            });
            it("applied cnot operator to 01-ket", (done: any) => {
                const controlQubit = new q.Qubit({ value: 0 });
                const targetQubit = new q.Qubit({ value: 1});
                targetQubit.cnot(controlQubit);
                expect(controlQubit.toString()).toBe("|01>");
                expect(targetQubit.toString()).toBe("|01>");
                done();
            });
            it("applied cnot operator to 10-ket", (done: any) => {
                const controlQubit = new q.Qubit({ value: 1 });
                const targetQubit = new q.Qubit({ value: 0});
                targetQubit.cnot(controlQubit);
                expect(controlQubit.toString()).toBe("|11>");
                expect(targetQubit.toString()).toBe("|11>");
                done();
            });
            it("applied cnot operator to 11-ket", (done: any) => {
                const controlQubit = new q.Qubit({ value: 1 });
                const targetQubit = new q.Qubit({ value: 1});
                targetQubit.cnot(controlQubit);
                expect(controlQubit.toString()).toBe("|10>");
                expect(targetQubit.toString()).toBe("|10>");
                done();
            });
        });
        describe("#toffoli", () => {
            it("applies toffoli operator to 000-ket", (done: any) => {
                const control1Qubit = new q.Qubit({ value: 0 });
                const control2Qubit = new q.Qubit({ value: 0 });
                const targetQubit = new q.Qubit({ value: 0 });
                targetQubit.toffoli(control1Qubit, control2Qubit);
                expect(control1Qubit.toString()).toBe("|000>");
                expect(control2Qubit.toString()).toBe("|000>");
                expect(targetQubit.toString()).toBe("|000>");
                done();
            });
            it("applies toffoli operator to 001-ket", (done: any) => {
                const control1Qubit = new q.Qubit({ value: 0 });
                const control2Qubit = new q.Qubit({ value: 0 });
                const targetQubit = new q.Qubit({ value: 1 });
                targetQubit.toffoli(control1Qubit, control2Qubit);
                expect(control1Qubit.toString()).toBe("|001>");
                expect(control2Qubit.toString()).toBe("|001>");
                expect(targetQubit.toString()).toBe("|001>");
                done();
            });
            it("applies toffoli operator to 110-ket", (done: any) => {
                const control1Qubit = new q.Qubit({ value: 1 });
                const control2Qubit = new q.Qubit({ value: 1 });
                const targetQubit = new q.Qubit({ value: 0 });
                targetQubit.toffoli(control1Qubit, control2Qubit);
                expect(control1Qubit.toString()).toBe("|111>");
                expect(control2Qubit.toString()).toBe("|111>");
                expect(targetQubit.toString()).toBe("|111>");
                done();
            });
            it("applies toffoli operator to 111-ket", (done: any) => {
                const control1Qubit = new q.Qubit({ value: 1 });
                const control2Qubit = new q.Qubit({ value: 1 });
                const targetQubit = new q.Qubit({ value: 1 });
                targetQubit.toffoli(control1Qubit, control2Qubit);
                expect(control1Qubit.toString()).toBe("|110>");
                expect(control2Qubit.toString()).toBe("|110>");
                expect(targetQubit.toString()).toBe("|110>");
                done();
            });
        });
        describe("#controlledX which is equivallent to cnot", () => {
            it("applied cnot operator to 00-ket", (done: any) => {
                const controlQubit = new q.Qubit({ value: "|0>" });
                const targetQubit = new q.Qubit({ value: "|0>" });
                targetQubit.controlledX(controlQubit);
                expect(controlQubit.toString()).toBe("|00>");
                expect(targetQubit.toString()).toBe("|00>");
                done();
            });
            it("applied cnot operator to 01-ket", (done: any) => {
                const controlQubit = new q.Qubit({ value: "|0>" });
                const targetQubit = new q.Qubit({ value: "|1>" });
                targetQubit.controlledX(controlQubit);
                expect(controlQubit.toString()).toBe("|01>");
                expect(targetQubit.toString()).toBe("|01>");
                done();
            });
            it("applied cnot operator to 10-ket", (done: any) => {
                const controlQubit = new q.Qubit({ value: "|1>" });
                const targetQubit = new q.Qubit({ value: "|0>" });
                targetQubit.controlledX(controlQubit);
                expect(controlQubit.toString()).toBe("|11>");
                expect(targetQubit.toString()).toBe("|11>");
                done();
            });
            it("applied cnot operator to 11-ket", (done: any) => {
                const controlQubit = new q.Qubit({ value: "|1>" });
                const targetQubit = new q.Qubit({ value: "|1>" });
                targetQubit.controlledX(controlQubit);
                expect(controlQubit.toString()).toBe("|10>");
                expect(targetQubit.toString()).toBe("|10>");
                done();
            });
        });
        describe("#controlledY", () => {
            it("applied cnot operator to 00-ket", (done: any) => {
                const controlQubit = new q.Qubit({ value: "|0>" });
                const targetQubit = new q.Qubit({ value: "|0>" });
                targetQubit.controlledY(controlQubit);
                expect(controlQubit.toString()).toBe("|00>");
                expect(targetQubit.toString()).toBe("|00>");
                done();
            });
            it("applied cnot operator to 01-ket", (done: any) => {
                const controlQubit = new q.Qubit({ value: "|0>" });
                const targetQubit = new q.Qubit({ value: "|1>" });
                targetQubit.controlledY(controlQubit);
                expect(controlQubit.toString()).toBe("|01>");
                expect(targetQubit.toString()).toBe("|01>");
                done();
            });
            it("applied cnot operator to 10-ket", (done: any) => {
                const controlQubit = new q.Qubit({ value: "|1>" });
                const targetQubit = new q.Qubit({ value: "|0>" });
                targetQubit.controlledY(controlQubit);
                expect(controlQubit.toString()).toBe("(i)|11>");
                expect(targetQubit.toString()).toBe("(i)|11>");
                done();
            });
            it("applied cnot operator to 11-ket", (done: any) => {
                const controlQubit = new q.Qubit({ value: "|1>" });
                const targetQubit = new q.Qubit({ value: "|1>" });
                targetQubit.controlledY(controlQubit);
                expect(controlQubit.toString()).toBe("(-i)|10>");
                expect(targetQubit.toString()).toBe("(-i)|10>");
                done();
            });
        });
        describe("#controlledZ", () => {
            it("applied cnot operator to 00-ket", (done: any) => {
                const controlQubit = new q.Qubit({ value: "|0>" });
                const targetQubit = new q.Qubit({ value: "|0>" });
                targetQubit.controlledZ(controlQubit);
                expect(controlQubit.toString()).toBe("|00>");
                expect(targetQubit.toString()).toBe("|00>");
                done();
            });
            it("applied cnot operator to 01-ket", (done: any) => {
                const controlQubit = new q.Qubit({ value: "|0>" });
                const targetQubit = new q.Qubit({ value: "|1>" });
                targetQubit.controlledZ(controlQubit);
                expect(controlQubit.toString()).toBe("|01>");
                expect(targetQubit.toString()).toBe("|01>");
                done();
            });
            it("applied cnot operator to 10-ket", (done: any) => {
                const controlQubit = new q.Qubit({ value: "|1>" });
                const targetQubit = new q.Qubit({ value: "|0>" });
                targetQubit.controlledZ(controlQubit);
                expect(controlQubit.toString()).toBe("|10>");
                expect(targetQubit.toString()).toBe("|10>");
                done();
            });
            it("applied cnot operator to 11-ket", (done: any) => {
                const controlQubit = new q.Qubit({ value: "|1>" });
                const targetQubit = new q.Qubit({ value: "|1>" });
                targetQubit.controlledZ(controlQubit);
                expect(controlQubit.toString()).toBe("(-1)|11>");
                expect(targetQubit.toString()).toBe("(-1)|11>");
                done();
            });
        });
    });
});
