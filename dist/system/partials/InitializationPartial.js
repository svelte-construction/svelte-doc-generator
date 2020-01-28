"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BasePartial_1 = __importDefault(require("./BasePartial"));
const encodeSpecialChars_1 = __importDefault(require("../helpers/encodeSpecialChars"));
const Variable_1 = __importDefault(require("../models/Variable"));
const constants_1 = require("../constants");
class InitializationPartial extends BasePartial_1.default {
    static get alias() {
        return 'script';
    }
    generate(variables = [], attributes = []) {
        const source = encodeSpecialChars_1.default(this.code);
        const sourceVariable = new Variable_1.default({ name: constants_1.DOCUMENTATION_VARIABLE_INITIALIZATION, value: source });
        console.log(source);
        process.exit(0);
        return {
            variables: [...variables, sourceVariable],
            code: this.generateTag()
        };
    }
}
exports.default = InitializationPartial;
