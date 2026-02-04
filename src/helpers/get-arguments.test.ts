import getArguments from "./get-arguments";

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
    const response = getArguments();

    // Act
    expect(response).toEqual(expected);
  });

  it("should return three arguments when supplied", () => {
    // Arrange
    const expected = ["--images", "file.json", "--output=a.json"];
    process.argv = ["node", "path", "--images", "file.json", "--output=a.json"];

    // Assert
    const response = getArguments();

    // Act
    expect(response).toEqual(expected);
  });

  it("should throw an error when zero arguments are supplied, expecting minimum two.", () => {
    // Arrange
    process.argv = ["node", "path"];

    // Assert
    expect(() => getArguments()).toThrow("Invalid arguments provided.");
  });

  it("should throw an error when one arguments are supplied, expecting minimum two.", () => {
    // Arrange
    process.argv = ["node", "path", "--images"];

    // Act + Assert
    expect(() => getArguments()).toThrow("Invalid arguments provided.");
  });
});
