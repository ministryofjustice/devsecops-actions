"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const get_array_from_json_1 = __importDefault(require("./get-array-from-json"));
jest.mock("node:fs");
describe("isValidJson", () => {
    afterEach(() => {
        jest.resetAllMocks();
    });
    it("should call readFileSync with correct encoding", () => {
        // Arrange
        const mockArgs = ["--images", "sources.json"];
        const data = '{"images": ["ghcr.io/ministryofjustice/devsecops-hooks:latest","ghcr.io/ministryofjustice/devsecops-hooks:v1.0.0","ghcr.io/ministryofjustice/devsecops-hooks:v1.2.0","ghcr.io/ministryofjustice/devsecops-hooks:v1.3.0"]}';
        node_fs_1.readFileSync.mockReturnValueOnce(data);
        // Act
        (0, get_array_from_json_1.default)(mockArgs);
        // Assert
        expect(node_fs_1.readFileSync).toHaveBeenCalledTimes(1);
        expect(node_fs_1.readFileSync).toHaveBeenCalledWith("sources.json", {
            encoding: "utf8",
        });
    });
    it("should thrown an error, when property does not exist in the file", () => {
        // Arrange
        const mockArgs = ["--invalid", "sources.json"];
        const data = '{"images": ["ghcr.io/ministryofjustice/devsecops-hooks:latest","ghcr.io/ministryofjustice/devsecops-hooks:v1.0.0","ghcr.io/ministryofjustice/devsecops-hooks:v1.2.0","ghcr.io/ministryofjustice/devsecops-hooks:v1.3.0"]}';
        node_fs_1.readFileSync.mockReturnValueOnce(data);
        // Act + Assert
        expect(() => (0, get_array_from_json_1.default)(mockArgs)).toThrow("invalid property does not exist in supplied JSON.");
    });
    it("should thrown an error, when the property is not an array", () => {
        // Arrange
        const mockArgs = ["--images", "sources.json"];
        const data = '{"images": "this is a string"}';
        node_fs_1.readFileSync.mockReturnValueOnce(data);
        // Act + Assert
        expect(() => (0, get_array_from_json_1.default)(mockArgs)).toThrow("images property is not an Array of values in the JSON file as expected.");
    });
    it("should return the data, when a valid argument is supplied", () => {
        // Arrange
        const argument = ["--images", "sources.json"];
        const data = '{"images": ["ghcr.io/ministryofjustice/devsecops-hooks:latest","ghcr.io/ministryofjustice/devsecops-hooks:v1.0.0","ghcr.io/ministryofjustice/devsecops-hooks:v1.2.0","ghcr.io/ministryofjustice/devsecops-hooks:v1.3.0"]}';
        node_fs_1.readFileSync.mockReturnValueOnce(data);
        // Act
        const response = (0, get_array_from_json_1.default)(argument);
        // Assert
        expect(response).toEqual([
            "ghcr.io/ministryofjustice/devsecops-hooks:latest",
            "ghcr.io/ministryofjustice/devsecops-hooks:v1.0.0",
            "ghcr.io/ministryofjustice/devsecops-hooks:v1.2.0",
            "ghcr.io/ministryofjustice/devsecops-hooks:v1.3.0",
        ]);
    });
});
