"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_valid_email_1 = __importDefault(require("./is-valid-email"));
const assertions = [
    {
        email: "user@example.gov.uk",
        response: true,
    },
    {
        email: "user@example.gov",
        response: true,
    },
    {
        email: "user@example",
        response: false,
    },
    {
        email: "userexample.gov.uk",
        response: false,
    },
    {
        email: "",
        response: false,
    },
    {
        email: " ",
        response: false,
    },
    {
        email: "user@.com",
        response: false,
    },
];
describe("isValidEmail", () => {
    it.each(assertions)("should return $response for email '$email'", ({ email, response }) => {
        // Act
        const result = (0, is_valid_email_1.default)(email);
        // Assert
        expect(result).toBe(response);
    });
});
