"use strict";
/**
 * @fileoverview Helper functions module for devsecops-actions.
 *
 * @module helpers
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitiseArgumentProperty = exports.getScanType = exports.getArguments = void 0;
const get_arguments_1 = __importDefault(require("./get-arguments"));
exports.getArguments = get_arguments_1.default;
const get_scan_type_1 = __importDefault(require("./get-scan-type"));
exports.getScanType = get_scan_type_1.default;
const sanitise_argument_property_1 = __importDefault(require("./sanitise-argument-property"));
exports.sanitiseArgumentProperty = sanitise_argument_property_1.default;
