"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseExport_1 = __importDefault(require("./BaseExport"));
const Description_1 = __importDefault(require("../models/Description"));
class VariableExport extends BaseExport_1.default {
    get declaration() {
        return this.data.declaration;
    }
    get declarator() {
        return this.declaration.declarations[0];
    }
    get kind() {
        return this.declaration.kind;
    }
    get constant() {
        return this.kind === 'const';
    }
    get name() {
        return this.declarator.id.name;
    }
    get default() {
        if (!this.declarator.init) {
            return undefined;
        }
        return this.declarator.init.value;
    }
    get description() {
        if (!this.data.leadingComments) {
            return false;
        }
        const data = this.data.leadingComments[0];
        return new Description_1.default({ data });
    }
    get note() {
        if (!this.declaration.trailingComments) {
            return false;
        }
        const data = this.declaration.trailingComments[0];
        return new Description_1.default({ data });
    }
    get result() {
        return {
            default: this.default,
            constant: this.constant,
            description: this.description && this.description.markdown,
            note: this.note && this.note.markdown,
            location: this.location.result
        };
    }
}
exports.default = VariableExport;
