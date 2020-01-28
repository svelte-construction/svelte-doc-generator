"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Models factory.
 * Create an instance of the model and configure it.
 * Set configuration data after constructor properties initialization.
 * So we can override default class properties with configuration.
 */
function create(model) {
    return new model;
}
exports.default = create;
