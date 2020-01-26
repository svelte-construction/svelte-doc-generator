"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SvelteSource_1 = __importDefault(require("../base/SvelteSource"));
class BasePartial extends SvelteSource_1.default {
    get start() {
        return this.node.start;
    }
    get end() {
        return this.node.end;
    }
    get code() {
        if (!this.node.children.length) {
            return '';
        }
        const start = this.node.children[0].start;
        const end = this.node.children[this.node.children.length - 1].end;
        return this.source.substr(start, end - start);
    }
    generate() {
        return {
            variables: [],
            code: this.tag(this.code)
        };
    }
    tag(content = '', customAttributes = []) {
        const sourceAttributesCompiled = this.node.attributes
            .map((attribute) => this.extractNativeAttribute(attribute.name));
        const customAttributesCompiled = customAttributes
            .map((attribute) => attribute.raw);
        const attributesString = [
            ...sourceAttributesCompiled,
            ...customAttributesCompiled
        ].join(' ');
        return content
            ? `<${this.node.name} ${attributesString}>${content}</${this.node.name}>`
            : `<${this.node.name} ${attributesString} />`;
    }
    extractNativeAttribute(name) {
        const attribute = this.getNativeAttribute(name);
        if (!attribute) {
            return undefined;
        }
        return this.source
            .substr(attribute.start, attribute.end - attribute.start);
    }
    getNativeAttribute(name) {
        return this.node.attributes
            .find((attribute) => attribute.name === name);
    }
    getNativeAttributeAsString(name) {
        const attribute = this.getNativeAttribute(name);
        return attribute && attribute.value && attribute.value.length
            ? attribute.value[0].data : undefined;
    }
}
exports.default = BasePartial;
