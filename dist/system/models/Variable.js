"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = __importDefault(require("../base/Base"));
const resolveUniqueVariableName_1 = __importDefault(require("../helpers/resolveUniqueVariableName"));
class Variable extends Base_1.default {
    get name() {
        if (!this._name) {
            this._name = resolveUniqueVariableName_1.default();
        }
        return this._name;
    }
}
exports.default = Variable;
