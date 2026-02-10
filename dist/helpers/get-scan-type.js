"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sanitise_argument_property_1 = __importDefault(require("./sanitise-argument-property"));
/**
 * Determines the scan type based on the first CLI argument.
 *
 * Extracts the scan type from the first argument by removing any leading `--` prefix.
 *
 * @param args - The list of CLI arguments
 * @returns The scan type derived from the first argument with any leading `--` removed, or an empty string if no arguments are provided
 *
 * @example
 * ```typescript
 * const type = getScanType(['--images', 'config.json']);
 * // Returns: 'images'
 * ```
 */
const getScanType = (args) => args[0] ? (0, sanitise_argument_property_1.default)(args[0]) : "";
exports.default = getScanType;
