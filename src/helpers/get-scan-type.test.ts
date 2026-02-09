import getScanType from "./get-scan-type";

const assertions = [
  {
    input: ["--images", "sources.json"],
    response: "images",
  },
  {
    input: ["--github", "--archive", "--days", "90"],
    response: "github",
  },
  {
    input: ["--invalid"],
    response: "invalid",
  },
  {
    input: [""],
    response: "",
  },
  {
    input: [String(null)],
    response: "null",
  },
  {
    input: [String(undefined)],
    response: "undefined",
  },
  {
    input: [String([])],
    response: "",
  },
];

describe("getScanType", () => {
  it.each(assertions)(
    'should return $response when "$input" is supplied as an argument',
    ({ input, response }) => {
      // Act
      const result = getScanType(input);

      // Assert
      expect(result).toBe(response);
    },
  );
});
