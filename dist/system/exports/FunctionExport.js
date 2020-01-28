"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comment_parser_1 = __importDefault(require("comment-parser"));
const BaseExport_1 = __importDefault(require("./BaseExport"));
const Description_1 = __importDefault(require("../models/Description"));
const create_1 = __importDefault(require("../helpers/create"));
class FunctionExport extends BaseExport_1.default {
    get declaration() {
        return this.data.declaration;
    }
    get name() {
        return this.declaration.id.name;
    }
    get jsdoc() {
        if (!this.data.leadingComments) {
            return false;
        }
        // parse only block comments
        const comment = this.data.leadingComments[0];
        if (comment.type !== 'Block') {
            return false;
        }
        // parse only jsdoc comments
        // comment value should be like
        // `*\n* Hello!\n* @returns {string}\n`
        if (!comment.value.match(/^\*[^*]/)) {
            return false;
        }
        // make jsdoc comment block
        const raw = `/*${comment.value}*/`;
        const parsed = comment_parser_1.default(raw);
        if (!parsed) {
            return false;
        }
        return parsed[0];
    }
    get description() {
        if (!this.jsdoc) {
            if (!this.data.leadingComments) {
                return false;
            }
            return create_1.default(Description_1.default).configure({ comments: this.data.leadingComments });
        }
        const content = this.jsdoc.description;
        const data = { type: 'Block', value: content };
        return create_1.default(Description_1.default).configure({ comments: [data] });
    }
    get tags() {
        if (!this.jsdoc) {
            return [];
        }
        return this.jsdoc.tags;
    }
    get arguments() {
        const declaration = this.data.declaration;
        if (!declaration.params) {
            return [];
        }
        const args = [];
        for (const param of declaration.params) {
            let name = '?';
            let value;
            if (param.type === 'Identifier') {
                const identifier = param;
                name = identifier.name;
            }
            else if (param.type === 'AssignmentPattern') {
                const assigment = param;
                const identifier = assigment.left;
                name = identifier.name;
                value = FunctionExport.resolveDefaultValue(assigment.right);
            }
            args.push({ name, default: value });
        }
        return args;
    }
    get result() {
        return {
            arguments: this.arguments,
            description: this.description && this.description.markdown,
            tags: this.tags,
            location: this.location.result
        };
    }
}
exports.default = FunctionExport;
