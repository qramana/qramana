import { Qubit } from "../Qubit";

export module Util {
    /**
     * 任意の数を表現する量子ビット列を生成する
     *
     * @param value     表現したい数
     * @param bitlength 生成される量子ビットの数
     */
    export function intToQubits(value: number, bitLength: number): Qubit[] {
        const valueString = value.toString(2);
        const valueLength = valueString.length;

        if (valueLength > bitLength) {
            throw new Error("Designated qubits length cannot express given number.");
        }

        const qubits: Qubit[] = [];

        valueString.forEach((bit, index) => {
            if (valueString[valueLength - index - 1] === "1") {
                qubits.push(new Qubit({ value: 1 }));
            } else {
                qubits.push(new Qubit({ value: 0 }));
            }
        });
        for (let i = 0; i < bitLength - valueLength; i++) {
            qubits.push(new Qubit({ value: 0 }));
        }

        return qubits;
    }
}
