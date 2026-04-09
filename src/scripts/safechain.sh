#!/usr/bin/env bash
# ==============================================================================
# Safe-Chain Installation Script
# ==============================================================================
#
# Copyright (c) Ministry of Justice UK
# SPDX-License-Identifier: MIT
#
# ==============================================================================
# DESCRIPTION
# ==============================================================================
# Downloads and installs the Safe-Chain binary for SLSA supply chain security.
# This script performs the following operations:
#
# 1. Downloads safe-chain binary from GitHub repository
# 2. Verifies SHA256 checksum for integrity
# 3. Installs to ~/.safe-chain/bin directory
# 4. Makes binary executable and adds to PATH
# 5. Runs setup-ci to configure CI environment
# 6. Validates installation success
#
# ==============================================================================
# SECURITY
# ==============================================================================
# - Uses pinned commit SHA for download URL
# - Verifies binary integrity with SHA256 checksum
# - Fails immediately if checksum doesn't match
# - Downloads from trusted GitHub repository
#
# ==============================================================================
# USAGE
# ==============================================================================
# Run via npm script:
#   npm run install:safechain
#
# Or directly:
#   bash src/scripts/safechain.sh
#
# ==============================================================================
# PREREQUISITES
# ==============================================================================
# - curl (for downloading binary)
# - sha256sum (for checksum verification)
# - GitHub Actions environment (sets GITHUB_PATH)
#
# ==============================================================================
# VERSION INFORMATION
# ==============================================================================
# Safe-Chain Version: 1.4.6
# Binary Commit: 25f7d3ac1b6fcdfcf0feeffac5d6ca9b4ec186b7
# Last Updated: 2026-04-01
#
# ==============================================================================

set -euo pipefail

# Variables
COMMIT="8c77d3a65a46d1d4b5416eafae5b84371ecd797d"
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
