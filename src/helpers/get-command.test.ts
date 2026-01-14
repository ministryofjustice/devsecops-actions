import { resolve } from "node:path";
import { getCommand } from "./get-command.ts";

describe("getCommand", () => {
  const sbom = resolve(__dirname, "..", "..", "sca", "steps", "SBOM");

  it("should return syft scan command for docker images on GHCR", () => {
    // Arrange
    const mockType = "--images";
    const mockValue = "ghcr.io/ministryofjustice/devsecops-hooks:latest";
    const mockImage = mockValue.split(":");

    // Act
    const response = getCommand(mockType, mockValue);

    // Assert
    expect(response).toEqual(
      `syft scan ${mockValue} --source-name ${mockValue} --config ${sbom}/config.yml --source-name "${mockImage[0]}" --source-version "${mockImage[1]}" --output cyclonedx-json=sca-sbom-${mockImage[1]}.cdx.json`
    );
  });

  it("should return syft scan command for docker images on Docker Hub", () => {
    // Arrange
    const mockType = "--images";
    const mockValue = "dockerhub.io/ministryofjustice/devsecops-hooks:v1.0.2";
    const mockImage = mockValue.split(":");

    // Act
    const response = getCommand(mockType, mockValue);

    // Assert
    expect(response).toEqual(
      `syft scan ${mockValue} --source-name ${mockValue} --config ${sbom}/config.yml --source-name "${mockImage[0]}" --source-version "${mockImage[1]}" --output cyclonedx-json=sca-sbom-${mockImage[1]}.cdx.json`
    );
  });

  it("should return an empty command for an unrecognised command", () => {
    // Arrange
    const mockType = "--containers";
    const mockValue = "";

    // Act
    const response = getCommand(mockType, mockValue);

    // Assert
    expect(response).toEqual("");
  });
});
