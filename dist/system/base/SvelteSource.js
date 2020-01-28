"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compiler_1 = require("svelte/compiler");
const Source_1 = __importDefault(require("./Source"));
class SvelteSource extends Source_1.default {
    get tree() {
        if (!this._tree) {
            try {
                this._tree = compiler_1.parse(this.source);
            }
            catch (error) {
                error.message = `Unable to parse svelte component '${this.path}' with an error '${error.message}'`;
                throw error;
            }
        }
        return this._tree;
    }
    reset() {
        super.reset();
        delete this._tree;
    }
}
exports.default = SvelteSource;
