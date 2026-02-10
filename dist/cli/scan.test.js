"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scan_1 = __importDefault(require("./scan"));
console.error = jest.fn();
console.info = jest.fn();
describe("scan", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should thrown an error when invalid number of arguments are supplied", async () => {
        // Arrange
        const mockCause = new TypeError("Invalid arguments provided.");
        const mockError = new TypeError(`Scanning failed: ${mockCause}`);
        process.argv = [];
        // Act + Assert
        await expect((0, scan_1.default)()).rejects.toThrow(mockError);
        // Assert
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith("❌ An error has occurred during execution %s", mockCause);
    });
    it("should thrown an error when only one argument is supplied", async () => {
        // Arrange
        const mockCause = new TypeError("Invalid arguments provided.");
        const mockError = new TypeError(`Scanning failed: ${mockCause}`);
        process.argv = ["internal1"];
        // Act + Assert
        await expect((0, scan_1.default)()).rejects.toThrow(mockError);
        // Assert
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith("❌ An error has occurred during execution %s", mockCause);
    });
    it("should thrown an error when only two arguments are supplied", async () => {
        // Arrange
        const mockCause = new TypeError("Invalid arguments provided.");
        const mockError = new TypeError(`Scanning failed: ${mockCause}`);
        process.argv = ["internal1", "internal2"];
        // Act + Assert
        await expect((0, scan_1.default)()).rejects.toThrow(mockError);
        // Assert
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith("❌ An error has occurred during execution %s", mockCause);
    });
    it("should thrown an error when only three arguments are supplied", async () => {
        // Arrange
        const mockCause = new TypeError("Invalid arguments provided.");
        const mockError = new TypeError(`Scanning failed: ${mockCause}`);
        process.argv = ["internal1", "internal2", "--images"];
        // Act + Assert
        await expect((0, scan_1.default)()).rejects.toThrow(mockError);
        // Assert
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith("❌ An error has occurred during execution %s", mockCause);
    });
    it("should throw an error when invalid source type is provided", async () => {
        // Arrange
        const mockCause = new TypeError("Invalid scan type argument supplied");
        const mockError = new TypeError(`Scanning failed: ${mockCause}`);
        process.argv = ["internal1", "internal2", "--invalid", "sources.json"];
        // Act + Assert
        await expect((0, scan_1.default)()).rejects.toThrow(mockError);
        // Assert
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith("❌ An error has occurred during execution %s", mockCause);
    });
    it("should throw an error when invalid source type is provided", async () => {
        // Arrange
        const mockCause = new TypeError("Invalid scan type argument supplied");
        const mockError = new TypeError(`Scanning failed: ${mockCause}`);
        process.argv = ["internal1", "internal2", "--invalid", "sources.json"];
        // Act + Assert
        await expect((0, scan_1.default)()).rejects.toThrow(mockError);
        // Assert
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith("❌ An error has occurred during execution %s", mockCause);
    });
    it("should thrown an error when invalid source file is provided", async () => {
        // Arrange
        const mockCause = new TypeError("Invalid arguments provided.\n\r\n\rUsage: scan --images <source>");
        const mockError = new TypeError(`Scanning failed: ${mockCause}`);
        process.argv = ["internal1", "internal2", "--images", "invalid.json"];
        // Act + Assert
        await expect((0, scan_1.default)()).rejects.toThrow(mockError);
        // Assert
        expect(console.error).toHaveBeenCalledTimes(2);
        expect(console.error).toHaveBeenCalledWith("❌ An error has occurred during execution %s", mockCause);
    });
    it("should not throw an error when valid Docker image scan arguments are provided", async () => {
        // Arrange
        process.argv = ["internal1", "internal2", "--images", "sources.json"];
        // Act + Assert
        await (0, scan_1.default)();
        // Assert
        expect(console.info).toHaveBeenCalledTimes(7);
        expect(console.info).toHaveBeenCalledWith("⚡️ Docker images scanning");
        expect(console.error).not.toHaveBeenCalled();
    });
    it("should not throw an error when valid GitHub repository archival can arguments are provided", async () => {
        // Arrange
        process.argv = [
            "internal1",
            "internal2",
            "--github",
            "--archive",
            "--days",
            "90",
            "--email",
            "user@gov.uk",
            "--key",
            "test",
            "--template-id",
            "123",
            "--repository-name",
            "test",
        ];
        // Act + Assert
        await (0, scan_1.default)();
        // Assert
        expect(console.info).toHaveBeenCalledTimes(2);
        expect(console.info).toHaveBeenCalledWith("⚡️ Scanning %s repository for archival", "test");
        expect(console.info).toHaveBeenCalledWith("✅ Repository %s is not due for archival, last commit was %i day(s) ago on %s", "test", expect.any(Number), expect.any(Date));
        expect(console.error).not.toHaveBeenCalled();
    });
    it("should throw an error when invalid GitHub repository archival arguments are provided", async () => {
        // Arrange
        const githubArgumentError = new Error("Invalid --github scan type argument.");
        const mockCause = new TypeError("Invalid arguments provided.\n\r\n\r\n\rUsage: scan --github --archive --days <days> --email <email> --key <key> --template-id <id> --repository-name <name>");
        const mockError = new TypeError(`Scanning failed: ${mockCause}`);
        process.argv = [
            "internal1",
            "internal2",
            "--github",
            "--days",
            "90",
            "--email",
            "user@gov.uk",
            "--key",
            "test",
            "--template-id",
            "123",
            "--repository-name",
            "test",
        ];
        // Act + Assert
        await expect((0, scan_1.default)()).rejects.toThrow(mockError);
        // Assert
        expect(console.error).toHaveBeenCalledTimes(2);
        expect(console.error).toHaveBeenCalledWith("❌ An error has occurred while validating GitHub CLI arguments %o", githubArgumentError);
        expect(console.error).toHaveBeenCalledWith("❌ An error has occurred during execution %s", mockCause);
    });
});
