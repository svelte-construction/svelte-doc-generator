"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BasePartial_1 = __importDefault(require("./BasePartial"));
const encodeSpecialChars_1 = __importDefault(require("../helpers/encodeSpecialChars"));
const Variable_1 = __importDefault(require("../models/Variable"));
const Attribute_1 = __importDefault(require("../models/Attribute"));
class MainPartial extends BasePartial_1.default {
    static get alias() {
        return 'Component';
    }
    generate() {
        const source = encodeSpecialChars_1.default(this.documentation.component.source);
        const declaration = this.documentation.component.result;
        const sourceVariable = new Variable_1.default({ value: source });
        const declarationVariable = new Variable_1.default({ value: declaration });
        const attributes = [
            new Attribute_1.default({ name: 'source', value: sourceVariable }),
            new Attribute_1.default({ name: 'declaration', value: declarationVariable }),
        ];
        return {
            variables: [sourceVariable, declarationVariable],
            code: this.tag(this.code, attributes)
        };
    }
}
exports.default = MainPartial;
