"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @fileoverview Main entry point for the DevSecOps CLI scanner application.
 *
 * Runs the CLI scan entry point and exits the process with a non-zero code on failure.
 * Uses IIFE (Immediately Invoked Function Expression) pattern for async execution.
 *
 * @module index
 */
const index_1 = __importDefault(require("./cli/index"));
(async () => {
    try {
        await (0, index_1.default)();
    }
    catch (error) {
        console.error("❌ CLI execution failure %o", error);
        process.exit(1);
    }
})();
//# sourceMappingURL=index.js.map