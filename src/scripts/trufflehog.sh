#!/bin/bash
#
# Trufflehog Installation Script
#
# Description:
#   This script downloads, verifies, and installs Trufflehog, a tool for finding
#   secrets in git repositories, codebases, and filesystems.
#
# Prerequisites:
#   - curl: For downloading the Trufflehog release archive
#   - sha256sum: For verifying the integrity of the downloaded file
#   - tar: For extracting the archive
#
# Installation Process:
#   1. Checks for required dependencies (curl, sha256sum, tar)
#   2. Downloads the specified version of Trufflehog from GitHub releases
#   3. Verifies the downloaded file against the expected SHA256 checksum
#   4. Extracts the binary to $HOME/.local/bin
#   5. Sets executable permissions on the binary
#   6. Adds the installation directory to PATH
#   7. Validates the installation
#   8. Cleans up temporary files
#
# Configuration:
#   VERSION: The version of Trufflehog to install (currently 3.92.4)
#   FILE: The name of the release archive
#   URL: The GitHub releases URL for downloading
#   SHA256: Expected checksum for file integrity verification
#
# Exit Codes:
#   0: Successful installation
#   1: Missing dependencies, checksum failure, or installation failure
#
# Output:
#   - Progress messages with emoji indicators
#   - Final confirmation of installed version
#
# Author: Ministry of Justice DevSecOps Team
# Repository: ministryofjustice/devsecops-actions

set -euo pipefail

# Variables
VERSION="3.92.4"
FILE="trufflehog_${VERSION}_linux_amd64.tar.gz"
URL="https://github.com/trufflesecurity/trufflehog/releases/download/v${VERSION}/${FILE}"
SHA256="98937dbfe048695bf1f34e8b76e6ef4caf75260760c0b5777dddf9bf34803052"

# Dependencies
for cmd in curl sha256sum tar; do
    command -v $cmd >/dev/null 2>&1 || { echo "❌ Missing $cmd executable."; exit 1; }
done

echo "⚡️ Installing Trufflehog ${VERSION}.";

# Download
curl -fsSL -o "$FILE" "$URL"

# Checksum
CHECKSUM=$(sha256sum "$FILE" | awk '{print $1}')

if [ "$SHA256" != "$CHECKSUM" ]; then
    echo "❌ Failed checksum";
    exit 1;
fi

# Install
mkdir -p "$HOME/.local/bin"
tar -xzf "$FILE" -C "$HOME/.local/bin"

chmod +x "$HOME/.local/bin/trufflehog"

export PATH="$HOME/.local/bin:$PATH"

# Validate
command -v trufflehog >/dev/null 2>&1 || { echo "❌ Missing trufflehog executable."; exit 1; }

# Cleanup
rm -f "$FILE"

echo "✅ $(trufflehog --version) has been installed."
exit 0;
