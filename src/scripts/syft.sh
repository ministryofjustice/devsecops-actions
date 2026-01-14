#!/bin/bash
# syft.sh - Syft SBOM Generator Installation Script
#
# DESCRIPTION:
#   Downloads, verifies, and installs Syft (a CLI tool for generating 
#   Software Bill of Materials from container images and filesystems).
#   Installs to ~/.local/bin for user-level access.
#
# USAGE:
#   ./syft.sh
#
# REQUIREMENTS:
#   - curl: For downloading the Syft package
#   - sha256sum: For verifying package integrity
#   - dpkg-deb: For extracting the Debian package
#
# INSTALLATION DETAILS:
#   - Version: 1.40.0
#   - Architecture: linux_amd64
#   - Install Location: $HOME/.local/bin/syft
#   - SHA256 Checksum: Verified against known good hash
#
# EXIT CODES:
#   0 - Success
#   1 - Missing dependencies, checksum failure, or installation error
#
# NOTES:
#   - Automatically adds $HOME/.local/bin to PATH for current session
#   - Cleans up temporary files after installation
#   - Validates installation by checking syft availability
#
# AUTHOR:
#   Ministry of Justice DevSecOps Team

set -euo pipefail

# Variables
VERSION="1.40.0"
FILE="syft_${VERSION}_linux_amd64.deb"
URL="https://github.com/anchore/syft/releases/download/v${VERSION}/${FILE}"
SHA256="d9235267318eaf7fe04d1ebd1794f0f4cc79b8d4379e49a04e2d10b9d73e9550"

# Dependencies
for cmd in curl sha256sum dpkg-deb; do
    command -v $cmd >/dev/null 2>&1 || { echo "❌ Missing $cmd executable."; exit 1; }
done

echo "⚡️ Installing Syft ${VERSION}.";

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
dpkg-deb -X "$FILE" tmp

mv tmp/usr/bin/syft "$HOME/.local/bin/"
chmod +x "$HOME/.local/bin/syft"

export PATH="$HOME/.local/bin:$PATH"

# Validate
command -v syft >/dev/null 2>&1 || { echo "❌ Missing syft executable."; exit 1; }

# Cleanup
rm -f "$FILE"
rm -rf tmp

echo "✅ $(syft --version) has been installed."
exit 0;
