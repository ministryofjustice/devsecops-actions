import areGitHubArgumentsValid from "./validate-github-arguments";

const falsyAssertions = [
  {
    input: [],
    response: false,
    error: new Error("Invalid --github scan type argument."),
  },
  {
    input: [""],
    response: false,
    error: new Error("Invalid --github scan type argument."),
  },
  {
    input: [" "],
    response: false,
    error: new Error("Invalid --github scan type argument."),
  },
  {
    input: [String()],
    response: false,
    error: new Error("Invalid --github scan type argument."),
  },
  {
    input: ["--invalid"],
    response: false,
    error: new Error("Invalid --github scan type argument."),
  },
  {
    input: ["--github"],
    response: false,
    error: new Error("Invalid --github scan type argument."),
  },
  {
    input: ["--github", "--invalid"],
    response: false,
    error: new Error("Invalid --github scan type argument."),
  },
  {
    input: ["--github", "--archive"],
    response: false,
    error: new Error(
      "Invalid --days argument value, it must be more than zero days.",
    ),
  },
  {
    input: ["--github", "--archive", "--days"],
    response: false,
    error: new Error(
      "Invalid --days argument value, it must be more than zero days.",
    ),
  },
  {
    input: ["--github", "--archive", "--days", ""],
    response: false,
    error: new Error(
      "Invalid --days argument value, it must be more than zero days.",
    ),
  },
  {
    input: ["--github", "--archive", "--days", " "],
    response: false,
    error: new Error(
      "Invalid --days argument value, it must be more than zero days.",
    ),
  },
  {
    input: ["--github", "--archive", "--days", "0"],
    response: false,
    error: new Error(
      "Invalid --days argument value, it must be more than zero days.",
    ),
  },
  {
    input: ["--github", "--archive", "--days", "1", "--email"],
    response: false,
    error: new Error(
      "Invalid --email argument value, must be a valid email address.",
    ),
  },
  {
    input: ["--github", "--archive", "--days", "1", "--email", "invalid"],
    response: false,
    error: new Error(
      "Invalid --email argument value, must be a valid email address.",
    ),
  },
  {
    input: [
      "--github",
      "--archive",
      "--days",
      "1",
      "--email",
      "invalid@invalid",
    ],
    response: false,
    error: new Error(
      "Invalid --email argument value, must be a valid email address.",
    ),
  },
  {
    input: [
      "--github",
      "--archive",
      "--days",
      "1",
      "--email",
      "user@gov.uk",
      "--key",
    ],
    response: false,
    error: new Error("Invalid --key argument value, must be a valid API key."),
  },
  {
    input: [
      "--github",
      "--archive",
      "--days",
      "1",
      "--email",
      "user@gov.uk",
      "--key",
      "",
    ],
    response: false,
    error: new Error("Invalid --key argument value, must be a valid API key."),
  },
  {
    input: [
      "--github",
      "--archive",
      "--days",
      "1",
      "--email",
      "user@gov.uk",
      "--key",
      " ",
    ],
    response: false,
    error: new Error("Invalid --key argument value, must be a valid API key."),
  },
  {
    input: [
      "--github",
      "--archive",
      "--days",
      "1",
      "--email",
      "user@gov.uk",
      "--key",
      "test",
      "--template-id",
    ],
    response: false,
    error: new Error(
      "Invalid --template-id argument value, must be a valid GovNotify template identifier.",
    ),
  },
  {
    input: [
      "--github",
      "--archive",
      "--days",
      "1",
      "--email",
      "user@gov.uk",
      "--key",
      "test",
      "--template-id",
      "",
    ],
    response: false,
    error: new Error(
      "Invalid --template-id argument value, must be a valid GovNotify template identifier.",
    ),
  },
  {
    input: [
      "--github",
      "--archive",
      "--days",
      "1",
      "--email",
      "user@gov.uk",
      "--key",
      "test",
      "--template-id",
      " ",
    ],
    response: false,
    error: new Error(
      "Invalid --template-id argument value, must be a valid GovNotify template identifier.",
    ),
  },
  {
    input: [
      "--github",
      "--archive",
      "--days",
      "1",
      "--email",
      "user@gov.uk",
      "--key",
      "test",
      "--template-id",
      "123",
      "--repository-name",
    ],
    response: false,
    error: new Error(
      "Invalid --repository-name argument value, must be a valid name.",
    ),
  },
  {
    input: [
      "--github",
      "--archive",
      "--days",
      "1",
      "--email",
      "user@gov.uk",
      "--key",
      "test",
      "--template-id",
      "123",
      "--repository-name",
      "",
    ],
    response: false,
    error: new Error(
      "Invalid --repository-name argument value, must be a valid name.",
    ),
  },
  {
    input: [
      "--github",
      "--archive",
      "--days",
      "1",
      "--email",
      "user@gov.uk",
      "--key",
      "test",
      "--template-id",
      "123",
      "--repository-name",
      " ",
    ],
    response: false,
    error: new Error(
      "Invalid --repository-name argument value, must be a valid name.",
    ),
  },
];

const truthyAssertions = [
  {
    input: [
      "--github",
      "--archive",
      "--days",
      "90",
      "--email",
      "test@example.gov.uk",
      "--key",
      "test",
      "--template-id",
      "123",
      "--repository-name",
      "test",
    ],
    response: true,
  },
];

describe("areGitHubArgumentsValid", () => {
  console.error = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it.each(falsyAssertions)(
    'should return $response for "$input"',
    ({ input, response, error }) => {
      // Act
      const result = areGitHubArgumentsValid(input);

      // Assert
      expect(result).toBe(response);

      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(
        "❌ An error has occurred while validating GitHub CLI arguments %o",
        error,
      );
    },
  );

  it.each(truthyAssertions)(
    'should return $response for "$input"',
    ({ input, response }) => {
      // Act
      const result = areGitHubArgumentsValid(input);

      // Assert
      expect(result).toBe(response);
      expect(console.error).toHaveBeenCalledTimes(0);
    },
  );
});
