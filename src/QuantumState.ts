/**
 * 測定後の状態を表すクラス
 */
export interface MeasurementResult {
    newQuantumState: QuantumState;
    result: number; // 暫定
}

/**
 * QuantumStateの初期化パラメータ
 */
export type QuantumStateParameter = string; // 将来的にはjsqubitsがサポートするnumberAmplitudeにも対応したいが、jsbuits.d.tsの対応が必要

/**
 * QuantumStateを生成する関数
 * QuantumStateを継承したクラスは、QuantumStateGeneratorwo継承した関数を提供する必要がある
 */
export type QuantumStateGenerator = (param: QuantumStateParameter) => QuantumState;

/**
 * 量子ビットの状態ベクトルを表現する抽象クラス
 * 1つ以上の量子ビットを管理し、操作・測定を行うインターフェイスを持つ
 *
 * ユーザは、QuantumStateを実装したクラスを用意するか、DefaultQuantumStateを利用する
 */
export abstract class QuantumState {
    constructor(param: QuantumStateParameter) { /** abstract */ }

    /**
     * @param bitId 操作の対象となる量子ビットの識別ID
     */
    abstract x(bitId: number): void;
    abstract y(bitId: number): void;
    abstract z(bitId: number): void;
    abstract h(bitId: number): void;
    abstract s(bitId: number): void;
    abstract t(bitId: number): void;

    /**
     * @param bitId 操作の対象となる量子ビットの識別ID
     * @param angle 回転角。radianで与えられ、0 <= angle < 2*Math.PIの範囲を期待する
     */
    abstract r(bitId: number, angle: number): void;
    abstract rx(bitId: number, angle: number): void;
    abstract ry(bitId: number, angle: number): void;
    abstract rz(bitId: number, angle: number): void;

    abstract cnot(controllBitId: number, targetBitId: number): void;
    abstract controlledZ(controllBitId: number, targetBitId: number): void;
    // abstract ccnot(firtstControllBitId: number, secondControllBitId: number, targetBitId: number): void;
    abstract measure(bitId: number): MeasurementResult;

    /**
     * 別のQuantumStateとマージして、自身と引数の量子状態の合成系を表現するQuantumStateを返す
     */
    abstract merge(quantumState: QuantumState): QuantumState;

    /**
     * QuantumStateが持つ量子ビットの数
     * todo: 名前がこれでよいか検討
     */
    abstract get length(): number;
    // abstract set length();

    /**
     * QuantumStateのダンプを文字列化して返す
     * 文字列の形式はQuantumStateの実装によって不定であり、
     * ライブラリユーザは文字列の形式に依存するべきではない
     */
    abstract toString(): string;
}
