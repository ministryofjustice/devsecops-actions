import areImageArgumentsValid from "./valid-image-arguments";

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

  it.each(assertions)(
    `should return $value when $args is supplied as an argument`,
    ({ args, value }) => {
      // Arrange

      // Act
      const response = areImageArgumentsValid(args);

      // Assert
      expect(response).toBe(value);
    },
  );
});
