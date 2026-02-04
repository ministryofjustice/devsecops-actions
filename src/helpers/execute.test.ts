import execute from "./execute";

console.info = jest.fn();
console.error = jest.fn();

describe("execute", () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it("should successfully scan three docker images", async () => {
    // Arrange
    const mockType = "--images";
    const mockValues = [
      "ghcr.io/ministryofjustice/devsecops-hooks:latest",
      "ghcr.io/ministryofjustice/devsecops-hooks:v1.0.0",
      "ghcr.io/ministryofjustice/devsecops-hooks:v1.2.0",
    ];

    // Act
    await execute(mockType, mockValues);

    // Assert
    expect(console.info).toHaveBeenCalledTimes(4);

    expect(console.info).toHaveBeenCalledWith(
      "✅ Successfully scanned %s",
      mockValues[0],
    );
    expect(console.info).toHaveBeenCalledWith(
      "✅ Successfully scanned %s",
      mockValues[1],
    );
    expect(console.info).toHaveBeenCalledWith(
      "✅ Successfully scanned %s",
      mockValues[2],
    );

    expect(console.info).toHaveBeenCalledWith(
      "\n\r\n\r✅ All %i images have been successfully scanned.",
      mockValues.length,
    );
  });

  it("should throw an error for an invalid source type", async () => {
    // Arrange
    const mockType = "--invalid";
    const mockValues = [
      "ghcr.io/ministryofjustice/devsecops-hooks:latest",
      "ghcr.io/ministryofjustice/devsecops-hooks:v1.0.0",
      "ghcr.io/ministryofjustice/devsecops-hooks:v1.2.0",
    ];
    const mockError = new TypeError("Image scanning failed");

    // Act + Assert
    await expect(execute(mockType, mockValues)).rejects.toThrow(mockError);

    // Assert
    expect(console.error).toHaveBeenCalledTimes(7);

    expect(console.error).toHaveBeenCalledWith(
      "\n\r\n\r❌ %i images did not scan successfully: \n\r",
      mockValues.length,
    );

    expect(console.error).toHaveBeenCalledWith("%i. %s", 1, mockValues[0]);
    expect(console.error).toHaveBeenCalledWith("%i. %s", 2, mockValues[1]);
    expect(console.error).toHaveBeenCalledWith("%i. %s", 3, mockValues[2]);
  });
});
