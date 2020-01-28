"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Script_1 = __importDefault(require("./Script"));
const SvelteSource_1 = __importDefault(require("../base/SvelteSource"));
const create_1 = __importDefault(require("../helpers/create"));
class Component extends SvelteSource_1.default {
    get result() {
        return {
            module: this.getScriptResult(this.tree.module),
            instance: this.getScriptResult(this.tree.instance)
        };
    }
    getScriptResult(script) {
        if (!script) {
            return undefined;
        }
        const module = create_1.default(Script_1.default).configure({ data: script });
        return {
            declarations: module.declarations,
            start: this.getPosition(script.start),
            end: this.getPosition(script.end)
        };
    }
}
exports.default = Component;
