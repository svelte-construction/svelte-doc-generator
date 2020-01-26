"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BasePartial_1 = __importDefault(require("./BasePartial"));
const encodeSpecialChars_1 = __importDefault(require("../helpers/encodeSpecialChars"));
const Variable_1 = __importDefault(require("../models/Variable"));
const Attribute_1 = __importDefault(require("../models/Attribute"));
class UsagePartial extends BasePartial_1.default {
    static get alias() {
        return 'Component.Usage';
    }
    generate() {
        const source = encodeSpecialChars_1.default(this.code);
        const variable = new Variable_1.default({ value: source });
        const attributes = [new Attribute_1.default({ name: 'source', value: variable })];
        return {
            variables: [variable],
            code: this.tag(this.code, attributes)
        };
    }
}
exports.default = UsagePartial;
