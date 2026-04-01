set -euo pipefail

# Variables
COMMIT="25f7d3ac1b6fcdfcf0feeffac5d6ca9b4ec186b7"
DIRECTORY="${HOME}/.safe-chain/bin"
FILE="safe-chain"
URL="https://raw.githubusercontent.com/ministryofjustice/devsecops-actions/${COMMIT}/sca/slsa/${FILE}"
SHA256="d6f351dcfb2bd5a11e58d5ce243a1815a976c03768e0519822f2f4e4f96f2d03"

# Dependencies
for cmd in curl sha256sum; do
    command -v $cmd >/dev/null 2>&1 || { echo "❌ Missing $cmd executable."; exit 1; }
done

echo "⚡️ Installing safe-chain from ${URL}.";

# Download
curl -fsSL -o "$FILE" "$URL"

# Checksum
CHECKSUM=$(sha256sum "$FILE" | awk '{print $1}')

if [ "$SHA256" != "$CHECKSUM" ]; then
    echo "❌ Failed checksum";
    exit 1;
fi

# Install
if [ ! -d "$DIRECTORY" ]; then
    mkdir -p "$DIRECTORY" || { echo "❌ Directory $DIRECTORY creation failed."; exit 1; }
fi

mv "./$FILE" "$DIRECTORY/$FILE"
chmod +x "$DIRECTORY/$FILE"

export PATH="$DIRECTORY:$PATH"
echo "$DIRECTORY" >> $GITHUB_PATH

safe-chain setup-ci

# Validate
command -v safe-chain >/dev/null 2>&1 || { echo "❌ Missing safe-chain executable."; exit 1; }

# Cleanup
rm -f "$FILE"

echo "✅ $(safe-chain --version) has been installed."
exit 0;
