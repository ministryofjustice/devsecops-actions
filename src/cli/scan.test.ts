import { scan } from "./scan.ts";

console.error = jest.fn();

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
    await expect(scan()).rejects.toThrow(mockError);

    // Assert
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      "❌ An error has occurred during execution %s",
      mockCause
    );
  });

  it("should thrown an error when only one argument is supplied", async () => {
    // Arrange
    const mockCause = new TypeError("Invalid arguments provided.");
    const mockError = new TypeError(`Scanning failed: ${mockCause}`);
    process.argv = ["internal1"];

    // Act + Assert
    await expect(scan()).rejects.toThrow(mockError);

    // Assert
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      "❌ An error has occurred during execution %s",
      mockCause
    );
  });

  it("should thrown an error when only two arguments are supplied", async () => {
    // Arrange
    const mockCause = new TypeError("Invalid arguments provided.");
    const mockError = new TypeError(`Scanning failed: ${mockCause}`);
    process.argv = ["internal1", "internal2"];

    // Act + Assert
    await expect(scan()).rejects.toThrow(mockError);

    // Assert
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      "❌ An error has occurred during execution %s",
      mockCause
    );
  });

  it("should thrown an error when only three arguments are supplied", async () => {
    // Arrange
    const mockCause = new TypeError("Invalid arguments provided.");
    const mockError = new TypeError(`Scanning failed: ${mockCause}`);
    process.argv = ["internal1", "internal2", "--images"];

    // Act + Assert
    await expect(scan()).rejects.toThrow(mockError);

    // Assert
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      "❌ An error has occurred during execution %s",
      mockCause
    );
  });

  it("should thrown an error when invalid source type is provided", async () => {
    // Arrange
    const mockCause = new TypeError(
      "Invalid arguments provided.\n\rFirst argument: --images\n\rSecond argument: Source JSON\n\r\n\rUsage: scan <type> <source>\n\rUsage: scan --images source.json\n\r"
    );
    const mockError = new TypeError(`Scanning failed: ${mockCause}`);
    process.argv = ["internal1", "internal2", "--invalid", "sources.json"];

    // Act + Assert
    await expect(scan()).rejects.toThrow(mockError);

    // Assert
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      "❌ An error has occurred during execution %s",
      mockCause
    );
  });

  it("should thrown an error when invalid source type is provided", async () => {
    // Arrange
    const mockCause = new TypeError(
      "Invalid arguments provided.\n\rFirst argument: --images\n\rSecond argument: Source JSON\n\r\n\rUsage: scan <type> <source>\n\rUsage: scan --images source.json\n\r"
    );
    const mockError = new TypeError(`Scanning failed: ${mockCause}`);
    process.argv = ["internal1", "internal2", "--invalid", "sources.json"];

    // Act + Assert
    await expect(scan()).rejects.toThrow(mockError);

    // Assert
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      "❌ An error has occurred during execution %s",
      mockCause
    );
  });

  it("should thrown an error when invalid source file is provided", async () => {
    // Arrange
    const mockCause = new TypeError(
      "Invalid arguments provided.\n\rFirst argument: --images\n\rSecond argument: Source JSON\n\r\n\rUsage: scan <type> <source>\n\rUsage: scan --images source.json\n\r"
    );
    const mockError = new TypeError(`Scanning failed: ${mockCause}`);
    process.argv = ["internal1", "internal2", "--images", "invalid.json"];

    // Act + Assert
    await expect(scan()).rejects.toThrow(mockError);

    // Assert
    expect(console.error).toHaveBeenCalledTimes(2);

    expect(console.error).toHaveBeenCalledWith(
      "❌ An error has occurred during execution %s",
      mockCause
    );
  });

  it("should not throw an error when valid arguments are provided", async () => {
    // Arrange
    process.argv = ["internal1", "internal2", "--images", "sources.json"];

    // Act + Assert
    await scan();

    // Assert
    expect(console.error).not.toHaveBeenCalled();
  });
});
