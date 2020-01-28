"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BasePartial_1 = __importDefault(require("./BasePartial"));
const Variable_1 = __importDefault(require("../models/Variable"));
const Attribute_1 = __importDefault(require("../models/Attribute"));
const constants_1 = require("../constants");
class MainPartial extends BasePartial_1.default {
    static get alias() {
        return 'Component';
    }
    generate(variables = [], attributes = [], withContent = true) {
        // use global name to pass initialization attribute to the component
        const initializationVariable = new Variable_1.default({ name: constants_1.DOCUMENTATION_VARIABLE_INITIALIZATION, value: undefined, asPlaceholder: true });
        const initializationAttribute = new Attribute_1.default({ name: 'initialization', value: initializationVariable });
        const declaration = this.documentation.component.result;
        const declarationVariable = new Variable_1.default({ value: declaration });
        const declarationAttribute = new Attribute_1.default({ name: 'declaration', value: declarationVariable });
        return super.generate([...variables, initializationVariable, declarationVariable], [...attributes, initializationAttribute, declarationAttribute]);
    }
}
exports.default = MainPartial;
