"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = __importDefault(require("../base/Base"));
const Location_1 = __importDefault(require("../models/Location"));
class BaseExport extends Base_1.default {
    get location() {
        const data = this.data.loc;
        return new Location_1.default({ data });
    }
}
exports.default = BaseExport;
