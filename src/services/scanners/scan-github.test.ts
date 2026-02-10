import { execFileSync } from "node:child_process";
import sendEmail from "../notifications";

import scanGithub from "./scan-github";

jest.mock("node:child_process", () => ({
  execFileSync: jest.fn(),
}));

jest.mock("../notifications", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("scanGithub", () => {
  console.info = jest.fn();
  console.warn = jest.fn();
  console.error = jest.fn();

  const command = "git";
  const argument = ["log", "-1", "--format=%ct"];
  const options = {
    encoding: "utf8",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should print the warning message and send an email when the repository last commit is over supplied days (threshold)", async () => {
    // Arrange
    const mockName = "test";
    const mockDays = 90;
    const mockEmail = "user@gov.uk";
    const mockKey = "test";
    const mockTemplate = "123";
    const mockLastCommit = "1989-09-20T00:00:00.000Z";
    const mockEpoch = new Date("1989-09-20").valueOf() / 1000;
    const mockOptions = {
      personalisation: {
        date: String(new Date(mockLastCommit)),
        name: mockName,
      },
      reference: expect.stringContaining(`${mockName}`),
    };

    (execFileSync as jest.Mock).mockReturnValueOnce(mockEpoch);
    (sendEmail as jest.Mock).mockResolvedValue(true);

    // Act
    const response = await scanGithub(
      mockName,
      mockDays,
      mockEmail,
      mockKey,
      mockTemplate,
    );

    // Assert
    expect(execFileSync).toHaveBeenCalledTimes(1);
    expect(execFileSync).toHaveBeenCalledWith(command, argument, options);

    expect(console.info).not.toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();

    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith(
      "⚠️ Repository %s is %i day(s) old, last commit was on %s",
      mockName,
      expect.any(Number),
      new Date(mockLastCommit),
    );

    expect(sendEmail).toHaveBeenCalledTimes(1);
    expect(sendEmail).toHaveBeenCalledWith(
      mockEmail,
      mockKey,
      mockTemplate,
      mockOptions,
    );

    expect(response).toBeFalsy();
  });

  it("should print okay message when the repository is in threshold and not send any email", async () => {
    // Arrange
    const mockName = "test";
    const mockDays = 90;
    const mockEmail = "user@gov.uk";
    const mockKey = "test";
    const mockTemplate = "123";
    const mockEpoch = Date.now() / 1000;

    (execFileSync as jest.Mock).mockReturnValueOnce(mockEpoch);

    // Act
    const response = await scanGithub(
      mockName,
      mockDays,
      mockEmail,
      mockKey,
      mockTemplate,
    );

    // Assert
    expect(execFileSync).toHaveBeenCalledTimes(1);
    expect(execFileSync).toHaveBeenCalledWith(command, argument, options);

    expect(console.warn).not.toHaveBeenCalled();
    expect(console.error).not.toHaveBeenCalled();

    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledWith(
      "✅ Repository %s is not due for archival, last commit was %i day(s) ago on %s",
      mockName,
      expect.any(Number),
      expect.any(Date),
    );

    expect(sendEmail).toHaveBeenCalledTimes(0);

    expect(response).toBeTruthy();
  });

  it("should catch any error thrown and not send any email", async () => {
    // Arrange
    const mockName = "test";
    const mockDays = 90;
    const mockEmail = "user@gov.uk";
    const mockKey = "test";
    const mockTemplate = "123";
    const mockError = new Error("mock error");

    (execFileSync as jest.Mock).mockImplementation(() => {
      throw mockError;
    });

    // Act
    await expect(
      scanGithub(mockName, mockDays, mockEmail, mockKey, mockTemplate),
    ).rejects.toThrow(
      new TypeError(
        `Failed to scan the GitHub repository for archival action: ${mockError}`,
      ),
    );

    // Assert
    expect(execFileSync).toHaveBeenCalledTimes(1);
    expect(execFileSync).toHaveBeenCalledWith(command, argument, options);

    expect(console.info).not.toHaveBeenCalled();
    expect(console.warn).not.toHaveBeenCalled();

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      "❌ Failed to scan the GitHub repository for archival action",
      mockError,
    );

    expect(sendEmail).toHaveBeenCalledTimes(0);
  });
});
