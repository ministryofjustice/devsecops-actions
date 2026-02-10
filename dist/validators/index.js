"use strict";
/**
 * @fileoverview Validator functions module for input validation.
 *
 * @module validators
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.areGitHubArgumentsValid = exports.areImageArgumentsValid = exports.isValidEmail = void 0;
const is_valid_email_1 = __importDefault(require("./is-valid-email"));
exports.isValidEmail = is_valid_email_1.default;
const valid_image_arguments_1 = __importDefault(require("./valid-image-arguments"));
exports.areImageArgumentsValid = valid_image_arguments_1.default;
const validate_github_arguments_1 = __importDefault(require("./validate-github-arguments"));
exports.areGitHubArgumentsValid = validate_github_arguments_1.default;
