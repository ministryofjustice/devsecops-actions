"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_arguments_1 = __importDefault(require("./get-arguments"));
describe("getArguments", () => {
    const originalArguments = process.argv;
    afterEach(() => {
        process.argv = originalArguments;
    });
    it("should return two arguments as expected and ignore first two implicit arguments", () => {
        // Arrange
        const expected = ["--images", "file.json"];
        process.argv = ["node", "path", "--images", "file.json"];
        // Assert
        const response = (0, get_arguments_1.default)();
        // Act
        expect(response).toEqual(expected);
    });
    it("should return three arguments when supplied", () => {
        // Arrange
        const expected = ["--images", "file.json", "--output=a.json"];
        process.argv = ["node", "path", "--images", "file.json", "--output=a.json"];
        // Assert
        const response = (0, get_arguments_1.default)();
        // Act
        expect(response).toEqual(expected);
    });
    it("should throw an error when zero arguments are supplied, expecting minimum two.", () => {
        // Arrange
        process.argv = ["node", "path"];
        // Assert
        expect(() => (0, get_arguments_1.default)()).toThrow("Invalid arguments provided.");
    });
    it("should throw an error when one arguments are supplied, expecting minimum two.", () => {
        // Arrange
        process.argv = ["node", "path", "--images"];
        // Act + Assert
        expect(() => (0, get_arguments_1.default)()).toThrow("Invalid arguments provided.");
    });
});
