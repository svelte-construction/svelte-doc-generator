"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = __importDefault(require("../base/Base"));
const FunctionExport_1 = __importDefault(require("../exports/FunctionExport"));
const VariableExport_1 = __importDefault(require("../exports/VariableExport"));
const ClassExport_1 = __importDefault(require("../exports/ClassExport"));
const declarationsToModels = {
    VariableDeclaration: VariableExport_1.default,
    FunctionDeclaration: FunctionExport_1.default,
    ClassDeclaration: ClassExport_1.default
};
class Script extends Base_1.default {
    get exports() {
        if (!this.data.content || !this.data.content.body) {
            return [];
        }
        const exports = this.data.content.body
            .filter((node) => node.type === 'ExportNamedDeclaration');
        const filtered = exports.filter((node) => node.declaration);
        return filtered.map((node) => {
            const declaration = node.declaration;
            const model = declarationsToModels[declaration.type];
            return new model({ data: node });
        });
    }
    get variables() {
        return Script.filterExports(this.exports, VariableExport_1.default);
    }
    get functions() {
        return Script.filterExports(this.exports, FunctionExport_1.default);
    }
    get classes() {
        return Script.filterExports(this.exports, ClassExport_1.default);
    }
    get declarations() {
        return {
            variables: Script.collectExports(this.variables),
            functions: Script.collectExports(this.functions),
            classes: Script.collectExports(this.classes),
        };
    }
    static filterExports(exports, type) {
        return exports.filter((_export) => _export instanceof type);
    }
    static collectExports(exports) {
        const results = {};
        for (const _export of exports) {
            results[_export.name] = _export.result;
        }
        return results;
    }
}
exports.default = Script;
