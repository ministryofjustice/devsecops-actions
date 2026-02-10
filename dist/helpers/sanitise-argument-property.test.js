"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sanitise_argument_property_1 = __importDefault(require("./sanitise-argument-property"));
const assertions = [
    {
        input: "--images",
        response: "images",
    },
    {
        input: "--github",
        response: "github",
    },
    {
        input: "--invalid",
        response: "invalid",
    },
    {
        input: "--",
        response: "",
    },
    {
        input: "",
        response: "",
    },
    {
        input: String(),
        response: "",
    },
    {
        input: " ",
        response: " ",
    },
    {
        input: "test",
        response: "test",
    },
    {
        input: "--git--hub--",
        response: "github",
    },
];
describe("sanitiseArgumentProperty", () => {
    it.each(assertions)('should return $response when "$input" input is supplied', ({ input, response }) => {
        // Act
        const result = (0, sanitise_argument_property_1.default)(input);
        // Assert
        expect(result).toBe(response);
    });
});
