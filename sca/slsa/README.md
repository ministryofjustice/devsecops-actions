# ⛓️ SLSA Supply Chain Security Action

Protect Your Dependencies from Supply Chain Attacks

---

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](../../LICENSE)
[![Ministry of Justice](https://img.shields.io/badge/Ministry%20of%20Justice-UK-blue.svg)](https://www.gov.uk/government/organisations/ministry-of-justice)

## Overview

A lightweight GitHub Action that implements **SLSA (Supply-chain Levels for Software Artifacts)** security framework to protect your project from supply chain attacks.
This action uses **Safe-Chain by AikidoSec** to validate packageintegrity before installation, preventing malicious dependencies from entering your codebase.

**Key Protection**: Blocks packages published less than 72 hours ago,
giving the security community time to detect and report malicious packages before they can harm your project.

---

## 📋 Table of Contents

- [What It Prevents](#-what-it-prevents)
- [Quick Start](#-quick-start)
- [Best Practices](#-best-practices)
- [FAQ](#-faq)

---

## 🛡 What It Prevents

This action protects against the following supply chain attacks:

### 1. **Newly Published Malicious Packages** 🚫

- **Attack**: Attackers publish packages with malicious code
- **Protection**: Blocks packages newer than 72 hours
- **Example**: `evil-logger` published 4 hours ago → **BLOCKED** ❌

### 2. **Typosquatting Attacks** 🎯

- **Attack**: Packages with names similar to popular libraries (`react-dom` vs `react-domm`)
- **Protection**: Detects suspicious package names
- **Example**: `expresss` instead of `express` → **BLOCKED** ❌

### 3. **Dependency Confusion** 🔀

- **Attack**: Public packages with same name as private internal packages
- **Protection**: Validates package sources and namespaces
- **Example**: Malicious public `@yourcompany/auth` → **BLOCKED** ❌

### 4. **Compromised Maintainer Accounts** 👤

- **Attack**: Legitimate packages hijacked through compromised accounts
- **Protection**: Detects unusual package updates
- **Example**: Sudden malicious update to trusted package → **BLOCKED** ❌

### 5. **Backdoored Packages** 🚪

- **Attack**: Legitimate-looking packages with hidden backdoors
- **Protection**: Community review period catches suspicious code
- **Example**: Package with hidden data exfiltration → **DETECTED** ⚠️

### 6. **Known Vulnerable Packages** 🔓

- **Attack**: Packages with published CVEs and security advisories
- **Protection**: Blocks packages with known vulnerabilities
- **Example**: Package with CVE-2024-12345 → **BLOCKED** ❌

---

## 🚀 Quick Start

### For npm/Node.js Projects

Add **before** your `npm ci` or `npm install`:

```yaml
name: CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      # ⛓️ SLSA Protection - Add BEFORE npm ci
      - name: ⛓️ SLSA Supply Chain Security
        uses: ministryofjustice/devsecops-actions/sca/slsa@3e9410cef31dd9cec64ad567efc959afd88a591c

      # Now safe to install dependencies
      - name: Install Dependencies
        run: npm ci

      - name: Run Tests
        run: npm test
```

### For Python Projects

Add **before** your `pip install -r requirements.txt`:

```yaml
name: CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"

      # ⛓️ SLSA Protection - Add BEFORE pip install
      - name: ⛓️ SLSA Supply Chain Security
        uses: ministryofjustice/devsecops-actions/sca/slsa@3e9410cef31dd9cec64ad567efc959afd88a591c

      # Now safe to install dependencies
      - name: Install Dependencies
        run: pip install -r requirements.txt

      - name: Run Tests
        run: pytest
```

---

## 📚 Best Practices

### ✅ Do's

1. **Run as First Step** - Place immediately after `checkout` and before any `npm ci` or `pip install`

   ```yaml
   - uses: actions/checkout@v4
   - uses: .../sca/slsa@... # ← First security step
   - run: npm ci # ← Then install
   ```

2. **Use in All Workflows** - Protect every workflow that installs dependencies
   - ✅ CI/CD pipelines
   - ✅ Deployment workflows
   - ✅ Scheduled jobs
   - ✅ Release workflows

3. **Pin to Commit SHA** - Use SHA instead of tags for maximum security

   ```yaml
   # ✅ Recommended
   uses: ministryofjustice/devsecops-actions/sca/slsa@3e9410cef31dd9cec64ad567efc959afd88a591c

   # ⚠️ Less secure
   uses: ministryofjustice/devsecops-actions/sca/slsa@v1.4.0
   ```

4. **Monitor Workflow Logs** - Review Safe-Chain output for warnings

   ```
   ✅ All packages validated successfully
   ⚠️ Warning: Package 'new-package' is only 48 hours old
   ❌ Blocked: Package 'suspicious-pkg' is 12 hours old
   ```

### ❌ Don'ts

1. **Don't Skip in Production** - Never bypass SLSA checks in production workflows

   ```yaml
   # ❌ BAD - Skipping security check
   if: github.ref != 'refs/heads/main'
   ```

2. **Don't Set Age Too Low** - Don't reduce below 72 hours without security approval

   ```yaml
   # ❌ BAD - Too permissive
   env:
     SAFE_CHAIN_MINIMUM_PACKAGE_AGE_HOURS: 1
   ```

3. **Don't Install Before Checking** - Always run SLSA before `npm ci` / `pip install`

   ```yaml
   # ❌ BAD - Installing before security check
   - run: npm ci
   - uses: .../sca/slsa@... # ← Too late!
   ```

4. **Don't Disable on Failures** - If SLSA blocks a package, investigate before overriding

---

## ❓ FAQ

### Q: What package ecosystems are supported?

**A**: Safe-Chain supports:

- 📦 npm
- 📦 npx
- 📦 yarn
- 📦 pnpm
- 📦 pnpx
- 📦 bun
- 📦 bunx
- 📦 pip
- 📦 pip3
- 📦 uv
- 📦 poetry
- 📦 pipx

### Q: What happens if a malicious package is detected?

**A**: The workflow fails immediately:

1. ❌ Workflow stops before package installation
2. 📋 Detailed logs show which package triggered the block

### Q: Is this better than Dependabot?

**A**: They complement each other:

| Tool                | Purpose                                           | When It Runs                          |
| ------------------- | ------------------------------------------------- | ------------------------------------- |
| **SLSA/Safe-Chain** | Prevents malicious packages from being installed  | Before every `npm ci` / `pip install` |
| **Dependabot**      | Updates dependencies to fix known vulnerabilities | Weekly / Monthly                      |

**Use both** for comprehensive protection! ✅

### Q: What if I need a package urgently?

**A**: Follow this process:

1. **Assess urgency**: Is this a critical security patch?
2. **Get approval**: OCTO Cyber team sign-off required
3. **Document**: Document decision
4. **Monitor**: Watch for any suspicious behaviour

---

## 🔗 Related Documentation

- [Safe-Chain GitHub](https://github.com/AikidoSec/safe-chain)
- [SLSA Framework](https://slsa.dev/)
- [Main SCA Action](../README.md)
- [NCSC Supply Chain Playbook](https://www.ncsc.gov.uk/information/cyber-essentials-supply-chain-playbook)

---

Made with ❤️ by the Ministry of Justice UK - OCTO Cyber
