"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const Documentation_1 = __importDefault(require("./Documentation"));
const Base_1 = __importDefault(require("../base/Base"));
const resolveRelativeImports_1 = __importDefault(require("../helpers/resolveRelativeImports"));
class Generator extends Base_1.default {
    constructor() {
        super(...arguments);
        this.fileNameIndex = 'index.js';
        this.fileNameDocumentation = 'Documentation.svelte';
        this.variables = [];
    }
    get indexPath() {
        return path.resolve(this.directory, this.fileNameIndex);
    }
    get documentationPath() {
        return path.resolve(this.directory, this.fileNameDocumentation);
    }
    generate() {
        // reset target documentation file if exists
        fs.writeFileSync(this.documentationPath, this.documentation.source);
        // create documentation clone from cloned file
        const path = this.documentationPath;
        const that = this.documentation.package;
        const component = this.documentation.component;
        const clone = new Documentation_1.default({ path, package: that, component });
        // rebind all imports paths and update the file
        clone.source = resolveRelativeImports_1.default(clone.source, this.documentation.path, this.documentationPath);
        // replace all partials
        // with generated source code
        // and process variables
        for (let i = 0; i < clone.partials.length; i++) {
            const variables = clone.apply(clone.partials[i]);
            this.variables = [...this.variables, ...variables];
        }
        // define variables inside the documentation
        clone.define(this.variables);
        // generate index file
        this.index();
    }
    index() {
        const content = `import Component from './${this.fileNameDocumentation}';\n\nexport default Component;`;
        fs.writeFileSync(this.indexPath, content);
    }
}
exports.default = Generator;
