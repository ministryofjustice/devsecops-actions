"use strict";
/**
 * @fileoverview Scanner service module for security scanning operations.
 *
 * @module services/scanners
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanGithub = exports.scanImages = void 0;
const scan_images_1 = __importDefault(require("./scan-images"));
exports.scanImages = scan_images_1.default;
const scan_github_1 = __importDefault(require("./scan-github"));
exports.scanGithub = scan_github_1.default;
