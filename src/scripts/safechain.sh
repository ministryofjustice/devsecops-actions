set -euo pipefail

# Variables
COMMIT="62f26ecccb5a17c38c495aa7e735f50cbd00ab39"
FILE="safe-chain"
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
mv "./$FILE" "$HOME/.local/bin/$FILE"
chmod +x "$HOME/.local/bin/$FILE"

export PATH="$HOME/.local/bin:$PATH"
echo "$HOME/.local/bin" >> $GITHUB_PATH

# Validate
command -v safe-chain >/dev/null 2>&1 || { echo "❌ Missing safe-chain executable."; exit 1; }

if command -v npm >/dev/null 2>&1; then
    echo "✅ $(npm --version) exist, validating safe-chain."
    npm safe-chain-verify  
fi

if command -v pnpm >/dev/null 2>&1; then
    echo "✅ $(pnpm --version) exist, validating safe-chain."
    pnpm safe-chain-verify  
fi

if command -v pip >/dev/null 2>&1; then
    echo "✅ $(pip --version) exist, validating safe-chain."
    pip safe-chain-verify  
fi

if command -v uv >/dev/null 2>&1; then
    echo "✅ $(uv --version) exist, validating safe-chain."
    uv safe-chain-verify  
fi 

# Cleanup
rm -f "$FILE"

echo "✅ $(safe-chain --version) has been installed."
exit 0;
