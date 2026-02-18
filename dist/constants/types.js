"use strict";
/**
 * @fileoverview Type constants for scan operations and GitHub-specific scans.
 *
 * @module constants/types
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SOURCES_FILE_EXTENSION = exports.GITHUB_SCANS = exports.SCAN = void 0;
/**
 * Scan type constants for supported scan operations.
 *
 * Defines the available top-level scan types that can be invoked via CLI.
 */
const SCAN = {
    DOCKER: "images",
    GITHUB: "github",
};
exports.SCAN = SCAN;
/**
 * GitHub-specific scan type constants.
 *
 * Defines the available GitHub repository scan operations.
 */
const GITHUB_SCANS = {
    ARCHIVE: "archive",
};
exports.GITHUB_SCANS = GITHUB_SCANS;
/**
 * Supported source file extension constants.
 *
 * Defines the acceptable file extensions for source configuration files.
 */
const SOURCES_FILE_EXTENSION = {
    JSON: ".json",
};
exports.SOURCES_FILE_EXTENSION = SOURCES_FILE_EXTENSION;
