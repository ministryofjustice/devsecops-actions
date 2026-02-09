import sanitiseArgumentProperty from "./sanitise-argument-property";

const assertions = [
  {
    input: "--images",
    response: "images",
  },
  {
    input: "--github",
    response: "github",
  },
  {
    input: "--invalid",
    response: "invalid",
  },
  {
    input: "--",
    response: "",
  },
  {
    input: "",
    response: "",
  },
  {
    input: String(),
    response: "",
  },
  {
    input: " ",
    response: " ",
  },
  {
    input: "test",
    response: "test",
  },
  {
    input: "--git--hub--",
    response: "github",
  },
];

describe("sanitiseArgumentProperty", () => {
  it.each(assertions)(
    'should return $response when "$input" input is supplied',
    ({ input, response }) => {
      // Act
      const result = sanitiseArgumentProperty(input);

      // Assert
      expect(result).toBe(response);
    },
  );
});
