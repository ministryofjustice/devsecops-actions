# ==============================================================================
# Script: safechain.sh
# ==============================================================================
#
# Description: Downloads, verifies, and installs Safe-Chain - a supply chain
#              security tool that implements SLSA framework protections for
#              package dependencies. Prevents typosquatting, malicious packages,
#              and supply chain attacks through package age verification and
#              security policy enforcement.
#
# ==============================================================================
# USAGE
# ==============================================================================
# ./safechain.sh
#
# ==============================================================================
# PREREQUISITES
# ==============================================================================
# - curl: For downloading the Safe-Chain installer script
# - sha256sum: For verifying installer script integrity
# - sh: For executing the installation script
#
# ==============================================================================
# INSTALLATION PROCESS
# ==============================================================================
# 1. Validates required dependencies are available (curl, sha256sum)
# 2. Downloads Safe-Chain installer v1.4.6 from GitHub releases
# 3. Verifies SHA256 checksum for security and integrity
# 4. Executes the installation script
# 5. Validates successful installation
# 6. Displays installed version information
#
# ==============================================================================
# EXIT CODES
# ==============================================================================
# 0 - Success: Safe-Chain installed and validated
# 1 - Failure: Missing dependency, checksum mismatch, or installation error
#
# ==============================================================================
# ENVIRONMENT VARIABLES
# ==============================================================================
# SAFE_CHAIN_MINIMUM_PACKAGE_AGE_HOURS - Minimum package age in hours (default: 72)
#
# ==============================================================================
# SECURITY FEATURES
# ==============================================================================
# - Cryptographic verification of installer script (SHA256)
# - Package age validation (72 hours minimum by default)
# - Typosquatting detection and prevention
# - Malicious package identification
# - Supply chain attack mitigation
#
# ==============================================================================
# NOTES
# ==============================================================================
# - Installation is performed via official AikidoSec installer
# - Script uses 'set -euo pipefail' for strict error handling
# - Checksum verification prevents tampered or corrupted downloads
# - Version pinned to 1.4.6 for reproducible installations
#
# ==============================================================================
# TOOL INFORMATION
# ==============================================================================
# Tool: Safe-Chain (AikidoSec)
# Version: 1.4.6
# Repository: https://github.com/AikidoSec/safe-chain
# Framework: SLSA (Supply-chain Levels for Software Artifacts)
#
# ==============================================================================
# VERSION INFORMATION
# ==============================================================================
# Script Version: 1.0.0
# Last Updated: 2026-03-31
#
# ==============================================================================


set -euo pipefail

# Variables
VERSION="1.4.6"
FILE="install-safe-chain.sh"
URL="https://github.com/AikidoSec/safe-chain/releases/download/${VERSION}/${FILE}"
SHA256="1c49baa0d40285cf249364c5274ae2d0f11a5c65fb3aae23750dd06f91d9a356"

# Dependencies
for cmd in curl sha256sum; do
    command -v $cmd >/dev/null 2>&1 || { echo "❌ Missing $cmd executable."; exit 1; }
done

echo "⚡️ Installing safe-chain ${VERSION}.";

# Download
curl -fsSL -o "$FILE" "$URL"

# Checksum
CHECKSUM=$(sha256sum "$FILE" | awk '{print $1}')

if [ "$SHA256" != "$CHECKSUM" ]; then
    echo "❌ Failed checksum";
    exit 1;
fi

# Install
cat "$FILE" | sh -s -- --ci

# Validate
command -v safe-chain >/dev/null 2>&1 || { echo "❌ Missing safe-chain executable."; exit 1; }

echo "✅ $(safe-chain --version) has been installed."
exit 0;
