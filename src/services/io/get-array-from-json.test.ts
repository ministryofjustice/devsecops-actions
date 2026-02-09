import { readFileSync } from "node:fs";
import getArrayFromJson from "./get-array-from-json";

jest.mock("node:fs");

describe("isValidJson", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should call readFileSync with correct encoding", () => {
    // Arrange
    const mockArgs = ["--images", "sources.json"];
    const data =
      '{"images": ["ghcr.io/ministryofjustice/devsecops-hooks:latest","ghcr.io/ministryofjustice/devsecops-hooks:v1.0.0","ghcr.io/ministryofjustice/devsecops-hooks:v1.2.0","ghcr.io/ministryofjustice/devsecops-hooks:v1.3.0"]}';

    (readFileSync as jest.Mock).mockReturnValueOnce(data);

    // Act
    getArrayFromJson(mockArgs);

    // Assert
    expect(readFileSync).toHaveBeenCalledTimes(1);
    expect(readFileSync).toHaveBeenCalledWith("sources.json", {
      encoding: "utf8",
    });
  });

  it("should thrown an error, when property does not exist in the file", () => {
    // Arrange
    const mockArgs = ["--invalid", "sources.json"];
    const data =
      '{"images": ["ghcr.io/ministryofjustice/devsecops-hooks:latest","ghcr.io/ministryofjustice/devsecops-hooks:v1.0.0","ghcr.io/ministryofjustice/devsecops-hooks:v1.2.0","ghcr.io/ministryofjustice/devsecops-hooks:v1.3.0"]}';

    (readFileSync as jest.Mock).mockReturnValueOnce(data);

    // Act + Assert
    expect(() => getArrayFromJson(mockArgs)).toThrow(
      "invalid property does not exist in supplied JSON.",
    );
  });

  it("should thrown an error, when the property is not an array", () => {
    // Arrange
    const mockArgs = ["--images", "sources.json"];
    const data = '{"images": "this is a string"}';

    (readFileSync as jest.Mock).mockReturnValueOnce(data);

    // Act + Assert
    expect(() => getArrayFromJson(mockArgs)).toThrow(
      "images property is not an Array of values in the JSON file as expected.",
    );
  });

  it("should return the data, when a valid argument is supplied", () => {
    // Arrange
    const argument = ["--images", "sources.json"];
    const data =
      '{"images": ["ghcr.io/ministryofjustice/devsecops-hooks:latest","ghcr.io/ministryofjustice/devsecops-hooks:v1.0.0","ghcr.io/ministryofjustice/devsecops-hooks:v1.2.0","ghcr.io/ministryofjustice/devsecops-hooks:v1.3.0"]}';

    (readFileSync as jest.Mock).mockReturnValueOnce(data);

    // Act
    const response = getArrayFromJson(argument);

    // Assert
    expect(response).toEqual([
      "ghcr.io/ministryofjustice/devsecops-hooks:latest",
      "ghcr.io/ministryofjustice/devsecops-hooks:v1.0.0",
      "ghcr.io/ministryofjustice/devsecops-hooks:v1.2.0",
      "ghcr.io/ministryofjustice/devsecops-hooks:v1.3.0",
    ]);
  });
});
