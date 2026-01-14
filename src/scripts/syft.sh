#!/bin/bash
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
rm -rf syft_ci

echo "✅ Syft ${VERSION} has been installed."
syft --version
exit 0;
