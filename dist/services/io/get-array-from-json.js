"use strict";
/**
 * @fileoverview Extracts array data from JSON files.
 *
 * @module services/io/get-array-from-json
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const file = __importStar(require("node:fs"));
const helpers_1 = require("../../helpers");
/**
 * Extracts an array from a JSON file based on a specified property name.
 *
 * Reads a JSON file from the file system, parses it, and extracts the array value
 * from the specified property after sanitising the property name.
 *
 * @param args - An array containing exactly two elements:
 *   - `args[0]`: The property name prefixed with `--` (e.g., `'--images'`)
 *   - `args[1]`: The file path to the JSON file to read
 * @returns An array of strings extracted from the specified property in the JSON file
 * @throws {TypeError} If the specified property does not exist in the JSON file
 * @throws {TypeError} If the specified property is not an array
 * @throws {SyntaxError} If the file cannot be parsed as valid JSON
 * @throws {Error} If the file cannot be read (e.g., file not found, permission denied)
 *
 * @example
 * ```typescript
 * // Given a JSON file at './config.json' with content: { "images": ["nginx:latest", "alpine:3.18"] }
 * const images = getArrayFromJson(['--images', './config.json']);
 * // Returns: ['nginx:latest', 'alpine:3.18']
 * ```
 */
const getArrayFromJson = (args) => {
    const type = (0, helpers_1.sanitiseArgumentProperty)(args[0]);
    const source = args[1];
    const raw = file.readFileSync(source, { encoding: "utf8" });
    const json = JSON.parse(raw);
    if (!Object.hasOwn(json, type)) {
        throw new TypeError(`${type} property does not exist in supplied JSON.`);
    }
    const data = json[type];
    if (!Array.isArray(data)) {
        throw new TypeError(`${type} property is not an Array of values in the JSON file as expected.`);
    }
    return data;
};
exports.default = getArrayFromJson;
