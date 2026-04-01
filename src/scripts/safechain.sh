set -euo pipefail

# Variables
COMMIT="caf56d0b17614d6291770e3e6efb906bba1d3d93"
FILE="safe-chain-linuxstatic-x64"
URL="https://github.com/ministryofjustice/devsecops-actions/raw/${COMMIT}/sca/slsa/${FILE}"
SHA256="06779120ef7958079b690d3e7f04299af3d12aacc5f9b38772cef57933e3d478"

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
mkdir -p "$HOME/.local/bin"
mv "./$FILE" "$HOME/.local/bin/"
chmod +x "$HOME/.local/bin/$FILE"

export PATH="$HOME/.local/bin:$PATH"
echo "$HOME/.local/bin" >> $GITHUB_PATH

# Validate
command -v safe-chain >/dev/null 2>&1 || { echo "❌ Missing safe-chain executable."; exit 1; }

npm safe-chain-verify
pnpm safe-chain-verify
pip safe-chain-verify
uv safe-chain-verify

# Cleanup
rm -f "$FILE"

echo "✅ $(safe-chain --version) has been installed."
exit 0;
