"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let i = 0;
const partial = '${id}';
function resolveUniqueVariableName(template = `uniq${partial}`) {
    if (!template.match(partial)) {
        throw new Error(`Invalid variable template: should has '${partial}' part`);
    }
    const name = template.replace(partial, i.toString());
    i++;
    return name;
}
exports.default = resolveUniqueVariableName;
