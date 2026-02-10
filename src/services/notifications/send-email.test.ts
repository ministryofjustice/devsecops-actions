import { NotifyClient } from "notifications-node-client";

import sendEmail from "./send-email";
import { EmailOptions } from "../../types/notifications";

jest.mock("notifications-node-client");

describe("sendEmail", () => {
  console.info = jest.fn();
  console.error = jest.fn();

  const mockEmail = "user@gov.uk";
  const mockKey = "test";
  const mockTemplate = "123";
  const mockOptions: EmailOptions = {
    personalisation: {
      name: "test",
      date: "1970-01-01",
    },
    reference: "test",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should send an email", async () => {
    // Arrange
    (NotifyClient as jest.Mock).mockImplementation(() => ({
      sendEmail: jest.fn(),
    }));

    // Act
    await sendEmail(mockEmail, mockKey, mockTemplate, mockOptions);

    // Assert
    expect(NotifyClient).toHaveBeenCalledTimes(1);
    expect(NotifyClient).toHaveBeenCalledWith(mockKey);

    expect(console.info).toHaveBeenCalledTimes(1);
    expect(console.info).toHaveBeenCalledWith("📧 Email has been dispatched.");

    expect(console.error).not.toHaveBeenCalled();
  });

  it("should throw an error when an exception is caught", async () => {
    // Arrange
    const mockError = new Error("Mock error");
    (NotifyClient as jest.Mock).mockImplementation(() => ({
      sendEmail: jest.fn().mockRejectedValueOnce(mockError),
    }));

    // Act + Assert
    await expect(
      sendEmail(mockEmail, mockKey, mockTemplate, mockOptions),
    ).rejects.toThrow("Unable to send email");

    // Assert
    expect(NotifyClient).toHaveBeenCalledTimes(1);
    expect(NotifyClient).toHaveBeenCalledWith(mockKey);

    expect(console.info).toHaveBeenCalledTimes(0);

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      "❌ Unable to send an email %o",
      mockError,
    );
  });
});
