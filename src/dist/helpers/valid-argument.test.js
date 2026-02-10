"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const valid_argument_1 = __importDefault(require("./valid-argument"));
console.error = jest.fn();
describe("validateArguments", () => {
    const assertions = [
        {
            args: ["--images", "sources.json"],
            value: true,
        },
        {
            args: ["", ""],
            value: false,
        },
        {
            args: [" ", " "],
            value: false,
        },
        {
            args: ["--image", "sources.json"],
            value: false,
        },
        {
            args: ["--docker", "sources.json"],
            value: false,
        },
        {
            args: ["--images", "invalid_file.json"],
            value: false,
        },
    ];
    it.each(assertions)(`should return $value when $args is supplied as an argument`, ({ args, value }) => {
        // Arrange
        // Act
        const response = (0, valid_argument_1.default)(args);
        // Assert
        expect(response).toBe(value);
    });
});
//# sourceMappingURL=valid-argument.test.js.map