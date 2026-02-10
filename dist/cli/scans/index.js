"use strict";
/**
 * @fileoverview Scan implementations module for different scan types.
 *
 * @module cli/scans
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.github = exports.docker = void 0;
const docker_1 = __importDefault(require("./docker"));
exports.docker = docker_1.default;
const github_1 = __importDefault(require("./github"));
exports.github = github_1.default;
