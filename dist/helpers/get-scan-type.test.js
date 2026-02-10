"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_scan_type_1 = __importDefault(require("./get-scan-type"));
const assertions = [
    {
        input: ["--images", "sources.json"],
        response: "images",
    },
    {
        input: ["--github", "--archive", "--days", "90"],
        response: "github",
    },
    {
        input: ["--invalid"],
        response: "invalid",
    },
    {
        input: [""],
        response: "",
    },
    {
        input: [String(null)],
        response: "null",
    },
    {
        input: [String(undefined)],
        response: "undefined",
    },
    {
        input: [String([])],
        response: "",
    },
];
describe("getScanType", () => {
    it.each(assertions)('should return $response when "$input" is supplied as an argument', ({ input, response }) => {
        // Act
        const result = (0, get_scan_type_1.default)(input);
        // Assert
        expect(result).toBe(response);
    });
});
