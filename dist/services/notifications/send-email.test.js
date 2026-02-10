"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notifications_node_client_1 = require("notifications-node-client");
const send_email_1 = __importDefault(require("./send-email"));
jest.mock("notifications-node-client");
describe("sendEmail", () => {
    console.info = jest.fn();
    console.error = jest.fn();
    const mockEmail = "user@gov.uk";
    const mockKey = "test";
    const mockTemplate = "123";
    const mockOptions = {
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
        notifications_node_client_1.NotifyClient.mockImplementation(() => ({
            sendEmail: jest.fn(),
        }));
        // Act
        await (0, send_email_1.default)(mockEmail, mockKey, mockTemplate, mockOptions);
        // Assert
        expect(notifications_node_client_1.NotifyClient).toHaveBeenCalledTimes(1);
        expect(notifications_node_client_1.NotifyClient).toHaveBeenCalledWith(mockKey);
        expect(console.info).toHaveBeenCalledTimes(1);
        expect(console.info).toHaveBeenCalledWith("📧 Email has been dispatched.");
        expect(console.error).not.toHaveBeenCalled();
    });
    it("should throw an error when an exception is caught", async () => {
        // Arrange
        const mockError = new Error("Mock error");
        notifications_node_client_1.NotifyClient.mockImplementation(() => ({
            sendEmail: jest.fn().mockRejectedValueOnce(mockError),
        }));
        // Act + Assert
        await expect((0, send_email_1.default)(mockEmail, mockKey, mockTemplate, mockOptions)).rejects.toThrow(new Error("Unable to send email"));
        // Assert
        expect(notifications_node_client_1.NotifyClient).toHaveBeenCalledTimes(1);
        expect(notifications_node_client_1.NotifyClient).toHaveBeenCalledWith(mockKey);
        expect(console.info).toHaveBeenCalledTimes(0);
        expect(console.error).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledWith("❌ Unable to send an email %o", mockError);
    });
});
