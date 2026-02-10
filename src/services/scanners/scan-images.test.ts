import scanImages from "./scan-images";

console.info = jest.fn();
console.error = jest.fn();

describe("execute", () => {
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it("should successfully scan three docker images", async () => {
    // Arrange
    const mockValues = [
      "ghcr.io/ministryofjustice/devsecops-hooks:latest",
      "ghcr.io/ministryofjustice/devsecops-hooks:v1.0.0",
      "ghcr.io/ministryofjustice/devsecops-hooks:v1.2.0",
      "ghcr.io/ministryofjustice/devsecops-hooks:v1.4.0@sha256:457a7e82b47146f56902607c4ec598c852f2afda640990d08fc3d00f28e38fbc",
    ];

    // Act
    await scanImages(mockValues);

    // Assert
    expect(console.info).toHaveBeenCalledTimes(5);

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
      "✅ Successfully scanned %s",
      mockValues[3],
    );

    expect(console.info).toHaveBeenCalledWith(
      "\n\r\n\r✅ All %i images have been successfully scanned.",
      mockValues.length,
    );
  });

  it("should throw an error for an invalid source type", async () => {
    // Arrange
    const mockValues = ["ghcr.io/ministryofjustice/devsecops-hooks:invalid"];
    const mockError = new TypeError("Image scanning failed");

    // Act + Assert
    await expect(scanImages(mockValues)).rejects.toThrow(mockError);

    // Assert
    expect(console.error).toHaveBeenCalledTimes(3);

    expect(console.error).toHaveBeenCalledWith(
      "\n\r\n\r❌ %i images did not scan successfully: \n\r",
      mockValues.length,
    );

    expect(console.error).toHaveBeenCalledWith("%i. %s", 1, mockValues[0]);
  });
});
