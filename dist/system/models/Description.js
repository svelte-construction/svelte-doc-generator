"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = __importDefault(require("../base/Base"));
class Description extends Base_1.default {
    get markdown() {
        return this.data.value
            // remove trailing stars
            .replace(/^\*+/, '')
            .replace(/\*+$/, '')
            .replace(/\n\*/g, '\n')
            // remove trailing new lines
            .replace(/^\n+/, '')
            .replace(/\n+$/, '')
            // remove trailing spaces before every line
            .replace(/\n\s+/g, '\n')
            // remove trailing spaces
            .trim();
    }
}
exports.default = Description;
