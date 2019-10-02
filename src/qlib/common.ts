import { Qubit } from "../Qubit";

/**
 * 任意の数を表現する量子ビット列を生成する
 *
 * @param num    表現したい数
 * @param length 生成される量子ビットの数
 */
export function intToQubits(num: number , length: number): Qubit[] {
    const numStr = num.toString(2);

    if (numStr.length > length) {
        throw new Error('Designated qubits length cannot express given number.');
    }

    const qubits: Qubit[] = [];
    const numLen = numStr.length;

    for (let i = 0; i<length; i++) {
        if (i < numLen && numStr[numLen - i - 1] == '1') {
            qubits.push(new Qubit({ value: 1 }));
        } else {
            qubits.push(new Qubit({ value: 0 }));
        }
    }

    return qubits;
}
