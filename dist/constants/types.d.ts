/**
 * @fileoverview Type constants for scan operations and GitHub-specific scans.
 *
 * @module constants/types
 */
/**
 * Scan type constants for supported scan operations.
 *
 * Defines the available top-level scan types that can be invoked via CLI.
 */
declare const SCAN: {
    DOCKER: string;
    GITHUB: string;
};
/**
 * GitHub-specific scan type constants.
 *
 * Defines the available GitHub repository scan operations.
 */
declare const GITHUB_SCANS: {
    ARCHIVE: string;
};
declare const SOURCES_FILE_EXTENSION: {
    JSON: string;
};
export { SCAN, GITHUB_SCANS, SOURCES_FILE_EXTENSION };
//# sourceMappingURL=types.d.ts.map