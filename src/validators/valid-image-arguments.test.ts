import validateImageArguments from "./valid-image-arguments";

console.error = jest.fn();

describe("validateImageArguments", () => {
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
      args: ["--images", "invalid_file.json"],
      value: false,
    },
  ];

  it.each(assertions)(
    `should return $value when $args is supplied as an argument`,
    ({ args, value }) => {
      // Arrange

      // Act
      const response = validateImageArguments(args);

      // Assert
      expect(response).toBe(value);
    },
  );
});
