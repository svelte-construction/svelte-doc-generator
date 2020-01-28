"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Base extends Object {
    configure(config) {
        if (config) {
            for (const name in config) {
                if (typeof config[name] !== 'undefined') {
                    this[name] = config[name];
                }
            }
        }
        return this;
    }
}
exports.default = Base;
;
