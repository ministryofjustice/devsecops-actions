"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanGithub = exports.scanImages = exports.sendEmail = exports.getArrayFromJson = void 0;
/**
 * @fileoverview Services module for DevSecOps scanning operations.
 *
 * @module services
 */
const io_1 = __importDefault(require("./io"));
exports.getArrayFromJson = io_1.default;
const notifications_1 = __importDefault(require("./notifications"));
exports.sendEmail = notifications_1.default;
const scanners_1 = require("./scanners");
Object.defineProperty(exports, "scanImages", { enumerable: true, get: function () { return scanners_1.scanImages; } });
Object.defineProperty(exports, "scanGithub", { enumerable: true, get: function () { return scanners_1.scanGithub; } });
