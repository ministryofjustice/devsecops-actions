# Syft Installation Script
#
# Description:
#   This script downloads, verifies, and installs Syft, a CLI tool for generating 
#   Software Bill of Materials (SBOM) from container images and filesystems.
#
# Prerequisites:
#   - wget: Required for downloading the Syft binary
#   - tar: Required for extracting the compressed archive
#   - Write permissions to /usr/local/bin
#
# Variables:
#   VERSION: The version of Syft to install (currently 1.40.0)
#   FILE: The name of the compressed archive file
#   URL: The download URL for the Syft release
#   SHA256: The expected SHA256 checksum for file integrity verification
#
# Process:
#   1. Validates required dependencies (wget, tar)
#   2. Downloads the specified Syft version from GitHub releases
#   3. Verifies the downloaded file's SHA256 checksum
#   4. Extracts the binary to /usr/local/bin
#   5. Sets executable permissions
#   6. Validates successful installation
#   7. Cleans up temporary files
#
# Exit Codes:
#   0: Success - Syft installed successfully
#   1: Failure - Missing dependencies, checksum mismatch, or installation failure
#
# Usage:
#   ./syft.sh
#
# Note:
#   This script is currently configured for darwin_amd64 architecture.
#   Modify FILE and URL variables for different platforms.

#!/bin/bash
set -euo pipefail

# Variables
VERSION="1.40.0"
FILE="syft_${VERSION}_darwin_amd64.tar.gz"
URL="https://github.com/anchore/syft/releases/download/v${VERSION}/${FILE}"
SHA256="370036e312a3a95a436b2c8fccb66160fe43b0ad68d3c47193958ee05b526d03"

# Dependencies
if ! command -v wget >/dev/null 2>&1; then
    echo "❌ Missing wget executable.";
    exit 1;
fi

if ! command -v tar >/dev/null 2>&1; then
    echo "❌ Missing tar executable.";
    exit 1;
fi

echo "⚡️ Installing Syft ${VERSION}.";

# Download
wget -q -T 30 --tries=3 -O "$FILE" "$URL"

# Checksum
CHECKSUM=$(sha256sum "$FILE" | awk '{print $1}')

if [ "$SHA256" != "$CHECKSUM" ]; then
    echo "❌ Failed checksum";
    exit 1;
fi

# Extract
tar -xzf "$FILE" -C /usr/local/bin
chmod +x /usr/local/bin/syft

# Validate
command -v syft >/dev/null 2>&1 || { echo "❌ Missing syft executable."; exit 1; }

# Cleanup
rm -f "$FILE"

echo "✅ Syft ${VERSION} has been installed."
syft --version
exit 0;
