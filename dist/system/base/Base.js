"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Element_1 = __importDefault(require("./Element"));
class Base extends Element_1.default {
    constructor(config) {
        super();
        this.configure(config);
    }
    get defaults() {
        return this._defaults;
    }
    set defaults(config) {
        this._defaults = Object.assign(Object.assign({}, this._defaults), config);
    }
    configure(custom = {}) {
        const config = Object.assign(Object.assign({}, this.defaults), custom);
        for (const name in config) {
            if (typeof config[name] !== 'undefined') {
                this[name] = config[name];
            }
        }
        return this;
    }
}
exports.default = Base;
;
