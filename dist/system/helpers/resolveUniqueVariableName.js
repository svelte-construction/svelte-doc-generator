"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let i = 0;
function resolveUniqueVariableName(prefix = 'uniq') {
    const name = `${prefix}${i}`;
    i++;
    return name;
}
exports.default = resolveUniqueVariableName;
