# Script: syft.sh
# Description: Downloads, verifies, and installs Syft - a CLI tool for generating
#              Software Bill of Materials (SBOM) from container images and filesystems.
#
# Usage: ./syft.sh
#
# Prerequisites:
#   - curl: For downloading the Syft package
#   - sha256sum: For verifying package integrity
#   - dpkg-deb: For extracting the Debian package
#
# Installation Process:
#   1. Validates required dependencies are available
#   2. Downloads Syft v1.40.0 from GitHub releases
#   3. Verifies SHA256 checksum for security
#   4. Extracts and installs to ~/.local/bin
#   5. Adds installation directory to PATH
#   6. Validates successful installation
#   7. Performs cleanup of temporary files
#
# Exit Codes:
#   0 - Success
#   1 - Failure (missing dependency, checksum mismatch, or installation error)
#
# Environment Variables Modified:
#   PATH - Prepends $HOME/.local/bin to ensure syft is accessible
#
# Notes:
#   - Installation is user-local (does not require sudo)
#   - Script uses 'set -euo pipefail' for strict error handling
#   - Temporary files are cleaned up regardless of installation success


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
echo "$HOME/.local/bin" >> $GITHUB_PATH

# Validate
command -v syft >/dev/null 2>&1 || { echo "❌ Missing syft executable."; exit 1; }

# Cleanup
rm -f "$FILE"
rm -rf tmp

echo "✅ $(syft --version) has been installed."
exit 0;
