"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Base {
    constructor(config) {
        this.configure(config);
    }
    configure(config) {
        if (config) {
            for (const name in config) {
                if (typeof config[name] !== 'undefined') {
                    this[name] = config[name];
                }
            }
        }
    }
}
exports.default = Base;
;
