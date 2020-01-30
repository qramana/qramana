import * as q from "../../lib/index";
import * as mock from "../helpers/mock";
import { QuantumStateInitializeTypeNumber } from "@qramana/qramana-common-types";

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
    describe("Measurement operator", () => {
        it("returns 0 when measuring |0> state", (done: any) => {
            const qubit = new q.Qubit({ value: 0 });
            const res = qubit.measure();
            expect(res).toBe(0);
            done();
        });
        it("returns 1 when measuring |1> state", (done: any) => {
            const qubit = new q.Qubit({ value: 1 });
            const res = qubit.measure();
            expect(res).toBe(1);
            done();
        });
        it("change state after measure", (done: any) => {
            const qubit = new q.Qubit({ value: 0 });
            qubit.h();
            const res = qubit.measure();
            const stateVector = qubit.simulated.getStateVector();
            expect(stateVector).not.toEqual([
                {
                    re: 0.7071067811865476,
                    im: 0
                },
                {
                    re: 0.7071067811865476,
                    im: 0
                }
            ]);

            if (res === 0) {
                expect(stateVector).toEqual([
                    {
                        re: 1,
                        im: 0
                    },
                    {
                        re: 0,
                        im: 0
                    }
                ]);
            } else {
                expect(stateVector).toEqual([
                    {
                        re: 0,
                        im: 0
                    },
                    {
                        re: 1,
                        im: 0
                    }
                ]);
            }
            done();
        });

    });
    describe("simulated", () => {
        describe("clone", () => {
            it("clone qubit", (done: any) => {
                const qubit = new q.Qubit({ value: 0 });
                const clonedQubitResult = qubit.simulated.clone();
                expect(clonedQubitResult.index).toBe(0);
                expect(clonedQubitResult.qubits.length).toBe(1);
                expect(qubit.toString()).toBe(clonedQubitResult.qubits[0].toString());
                done();
            });
            it("clone 2 qubits", (done: any) => {
                const qubit0 = new q.Qubit({ value: 0 });
                const qubit1 = new q.Qubit({ value: 1 });
                qubit0.h();
                qubit1.cnot(qubit0);
                const clonedQubit0Result = qubit0.simulated.clone();
                expect(clonedQubit0Result.index).toBe(0);
                expect(clonedQubit0Result.qubits.length).toBe(2);
                expect(qubit0.toString()).toBe(clonedQubit0Result.qubits[0].toString());

                const clonedQubit1Result = qubit1.simulated.clone();
                expect(clonedQubit1Result.index).toBe(1);
                expect(clonedQubit1Result.qubits.length).toBe(2);
                expect(qubit1.toString()).toBe(clonedQubit1Result.qubits[1].toString());
                done();
            });
        });

        describe("compositedQubits", () => {
            it("index", (done: any) => {
                const qubits: q.Qubit[] = [new q.Qubit({ value: 0 })];
                for (let i = 0; i < 10; i++) {
                    const value = (i % 2) as QuantumStateInitializeTypeNumber;
                    const qubit = new q.Qubit({ value: value });
                    qubit.cnot(qubits[0]);
                    qubits.push(qubit);
                }
                qubits.forEach((qubit, index) => {
                    const compositedQubits = qubit.simulated.compositedQubits();
                    expect(compositedQubits.length).toBe(qubits.length);
                    expect(qubit.toString()).toBe(compositedQubits[index].toString());
                });
                done();
            });
        });
    });

});
