"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const valid_image_arguments_1 = __importDefault(require("./valid-image-arguments"));
console.error = jest.fn();
describe("areImageArgumentsValid", () => {
    const assertions = [
        {
            args: ["", ""],
            value: false,
        },
        {
            args: [" ", " "],
            value: false,
        },
        {
            args: ["--images", "invalid_file.json"],
            value: false,
        },
        {
            args: ["--images", "https://invalid-url/invalid_file.json"],
            value: false,
        },
        {
            args: ["--images", "../../invalid_path.json"],
            value: false,
        },
        {
            args: ["--images", "~/invalid"],
            value: false,
        },
        {
            args: ["--images", "sources.xml"],
            value: false,
        },
        {
            args: ["--images", "README.md"],
            value: false,
        },
        {
            args: ["--images", "Dockerfile"],
            value: false,
        },
        {
            args: ["--images", "sources.json"],
            value: true,
        },
    ];
    it.each(assertions)(`should return $value when $args is supplied as an argument`, ({ args, value }) => {
        // Arrange
        // Act
        const response = (0, valid_image_arguments_1.default)(args);
        // Assert
        expect(response).toBe(value);
    });
});
