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
  });
