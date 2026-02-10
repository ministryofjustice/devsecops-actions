"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = require("node:path");
const get_command_1 = __importDefault(require("./get-command"));
describe("getCommand", () => {
    const sbom = (0, node_path_1.resolve)(__dirname, "..", "..", "sca", "sbom");
    it("should return syft scan command for docker images on GHCR", () => {
        // Arrange
        const mockType = "--images";
        const mockValue = "ghcr.io/ministryofjustice/devsecops-hooks:latest";
        const mockImage = mockValue.split(":");
        // Act
        const response = (0, get_command_1.default)(mockType, mockValue);
        // Assert
        expect(response).toEqual(`syft scan ${mockValue} --source-name ${mockValue} --config ${sbom}/config.yml --source-name "${mockImage[0]}" --source-version "${mockImage[1]}" --output cyclonedx-json=sca-sbom-${mockImage[1]}.cdx.json`);
    });
    it("should return syft scan command for docker images on Docker Hub", () => {
        // Arrange
        const mockType = "--images";
        const mockValue = "dockerhub.io/ministryofjustice/devsecops-hooks:v1.0.2";
        const mockImage = mockValue.split(":");
        // Act
        const response = (0, get_command_1.default)(mockType, mockValue);
        // Assert
        expect(response).toEqual(`syft scan ${mockValue} --source-name ${mockValue} --config ${sbom}/config.yml --source-name "${mockImage[0]}" --source-version "${mockImage[1]}" --output cyclonedx-json=sca-sbom-${mockImage[1]}.cdx.json`);
    });
    it("should return an empty command for an unrecognised command", () => {
        // Arrange
        const mockType = "--containers";
        const mockValue = "";
        // Act
        const response = (0, get_command_1.default)(mockType, mockValue);
        // Assert
        expect(response).toEqual("");
    });
});
//# sourceMappingURL=get-command.test.js.map