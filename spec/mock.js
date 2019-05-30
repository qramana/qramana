"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../lib/index");
var MockCore = /** @class */ (function (_super) {
    __extends(MockCore, _super);
    function MockCore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MockCore;
}(index_1.Core));
exports.MockCore = MockCore;
var MockQuantumStateJsQubits = /** @class */ (function (_super) {
    __extends(MockQuantumStateJsQubits, _super);
    function MockQuantumStateJsQubits() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MockQuantumStateJsQubits;
}(index_1.QuantumStateJsqubits));
exports.MockQuantumStateJsQubits = MockQuantumStateJsQubits;
function quantumStateJsQubitsGenerator(param) {
    return new MockQuantumStateJsQubits(param);
}
exports.quantumStateJsQubitsGenerator = quantumStateJsQubitsGenerator;
