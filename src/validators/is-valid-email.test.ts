import isValidEmail from "./is-valid-email";

const assertions = [
  {
    email: "user@example.gov.uk",
    response: true,
  },
  {
    email: "user@example.gov",
    response: true,
  },
  {
    email: "user@example",
    response: false,
  },
  {
    email: "userexample.gov.uk",
    response: false,
  },
  {
    email: "",
    response: false,
  },
  {
    email: " ",
    response: false,
  },
  {
    email: "user@.com",
    response: false,
  },
];

describe("isValidEmail", () => {
  it.each(assertions)(
    "should return $response for email '$email'",
    ({ email, response }) => {
      // Act
      const result = isValidEmail(email);

      // Assert
      expect(result).toBe(response);
    },
  );
});
