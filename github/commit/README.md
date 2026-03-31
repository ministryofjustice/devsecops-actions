# 🔎 Commit Validation Action

Commit verification for GitHub Repositories

---

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](../../LICENSE)
[![Ministry of Justice](https://img.shields.io/badge/Ministry%20of%20Justice-UK-blue.svg)](https://www.gov.uk/government/organisations/ministry-of-justice)

## Overview

A comprehensive composite action that validates Git commits to ensure they meet security and quality standards.
This action enforces two critical requirements: commit signing (GPG/SSH signatures) and conventional commit message
formatting, providing automated gates for code integrity and traceability.

**Key Capabilities:**

- **Commit Signature Verification** - Ensures commits are cryptographically signed
- **Conventional Commit Validation** - Enforces standardised commit message format
- **Zero Configuration** - Works out-of-the-box with sensible defaults
- **Customisable** - Supports custom commitlint configurations

---

## 📋 Table of Contents

- [Architecture](#️-architecture)
- [Features](#-features)
- [What It Does](#-what-it-does)
- [Usage Examples](#-usage-examples)
- [Inputs](#-inputs)
- [Required Permissions](#-required-permissions)
- [Configuration](#️-configuration)
- [Outputs](#-outputs)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

---

## 🏗️ Architecture

### Component Workflow

This action performs two sequential validation checks on the most recent commit:

1. **🧩 Conventional Commit Validation** - Parses commit message against conventional commit specification
2. **🔐 Signature Verification** - Confirms commit has been cryptographically signed

Both checks must pass for the action to succeed.

### Validation Flow

```txt
📦 Repository Checkout
        ↓
⚡️ Node.js Setup
        ↓
⚙️ Install Dependencies
        ↓
🧩 Conventional Commit Check
        ├─ ✅ Valid format → Continue
        └─ ❌ Invalid format → Fail
        ↓
🔐 Signature Check
        ├─ ✅ Signed → Success
        └─ ❌ Unsigned → Fail
```

---

## ✨ Features

### Commit Message Validation

- ✅ **Conventional Commits** - Enforces `type(scope): subject` format
- ✅ **Semantic Types** - Validates commit types (feat, fix, docs, etc.)
- ✅ **Custom Rules** - Supports custom commitlint configurations
- ✅ **Clear Error Messages** - Detailed feedback for invalid messages

### Signature Verification

- ✅ **GPG Signatures** - Detects GPG-signed commits
- ✅ **SSH Signatures** - Supports SSH commit signing
- ✅ **No Key Required** - Checks signature presence, not validity
- ✅ **Fast Validation** - Lightweight verification process

### Quality Assurance

- ✅ **Automated Gates** - Prevents non-compliant commits from merging
- ✅ **Audit Trail** - Ensures commit traceability and authorship
- ✅ **CI/CD Integration** - Works with any GitHub Actions workflow

---

## 🎯 What it does

### 1. 📦 Repository Checkout

**Action**: `sca/repository/`  
**Purpose**: Secure code retrieval with full Git history

- Clones repository with complete commit history
- Authenticates using provided GitHub token
- Preserves Git metadata for signature verification

### 2. ⚡️ Node.js Setup

**Purpose**: Installs Node.js runtime for commitlint

- Installs specified Node.js version (default: 24.11.1)
- Configures npm environment
- Prepares runtime for commitlint execution

### 3. ⚙️ Install Dependencies

**Purpose**: Installs commitlint and dependencies

- Runs `npm ci` for reproducible installation
- Uses `--ignore-scripts` for security
- Installs from action's local `package.json`

### 4. 🧩 Conventional Commit Validation

**Purpose**: Enforces conventional commit message format

- Extracts commit message from most recent commit
- Validates against conventional commit specification
- Checks for required format: `type(scope): subject`
- Validates commit types (feat, fix, docs, refactor, etc.)
- **Customisable**: Use `config-file` input for custom rules
- **Fails** if commit message format is invalid

**Expected Format:**

```txt
<type>(<scope>): <subject>

<body>

<footer>
```

**Valid Examples:**

- `feat(auth): add OAuth2 authentication`
- `fix(api): resolve null pointer exception`
- `docs(readme): update installation guide`
- `refactor(core)!: restructure module architecture`

**Invalid Examples:**

- ❌ `Updated files` - No type specified
- ❌ `fix:` - Empty subject
- ❌ `Feature: new login` - Incorrect type capitalisation

### 5. 🔐 Signature Verification

**Purpose**: Ensures commits are cryptographically signed

- Runs `git log --show-signature` on most recent commit
- Detects presence of GPG or SSH signatures
- **Does not require** public key import
- **Does not validate** trust chain or signature authenticity (only existence)
- Searches for signature indicators:
  - `gpg: Signature made` (GPG signatures)
  - `BEGIN PGP SIGNATURE` (PGP signatures)
- **Fails** if no signature is detected

**What it checks:**

- ✅ Commit has been signed (GPG or SSH)
- ❌ Does NOT verify signature validity
- ❌ Does NOT check signing key identity

---

## 📖 Usage Examples

### Quick Start - Minimal Configuration

Validate commits with default settings:

```yaml
name: Commit Validation
run-name: Commit Validation 🔎

on:
  pull_request:
    branches: ["**"]
  push:
    branches: ["main", "develop"]

permissions: {}

jobs:
  validate-commit:
    name: Validate Commit
    runs-on: ubuntu-latest
    timeout-minutes: 10

    permissions:
      contents: read

    steps:
      - name: Validate Commit
        uses: ministryofjustice/devsecops-actions/github/commit@9babea875cafae0e3b05a5ec5aca76d6b560c42e
```

**This validates:**

- ✅ Commit message follows conventional commits format
- ✅ Commit has been cryptographically signed

### Production Configuration

Advanced configuration with custom commitlint rules:

```yaml
name: Commit Validation
run-name: Commit Validation 🔎

on:
  pull_request:
    branches: ["main", "develop", "release/*"]
    types: [opened, synchronize, reopened]

  push:
    branches: ["main", "develop"]

  workflow_dispatch:

permissions: {}

jobs:
  validate-commit:
    name: Validate Commit
    runs-on: ubuntu-latest
    timeout-minutes: 10

    permissions:
      contents: read

    steps:
      - name: Validate Commit with Custom Config
        uses: ministryofjustice/devsecops-actions/github/commit@9babea875cafae0e3b05a5ec5aca76d6b560c42e
        with:
          config-file: ".github/commitlint.config.js"
          node-version: "24.11.1"
```

### Multiple Branch Validation

Validate commits across multiple branches:

```yaml
name: Commit Validation - Multi-Branch
run-name: Commit Validation 🔎

on:
  push:
    branches:
      - "main"
      - "develop"
      - "feature/**"
      - "bugfix/**"
      - "hotfix/**"

permissions: {}

jobs:
  validate-commit:
    name: Validate Commit
    runs-on: ubuntu-latest
    timeout-minutes: 10

    permissions:
      contents: read

    steps:
      - name: Validate Commit
        uses: ministryofjustice/devsecops-actions/github/commit@9babea875cafae0e3b05a5ec5aca76d6b560c42e
```

### Pull Request Validation

Ensure all commits in a PR are compliant:

```yaml
name: PR Commit Validation
run-name: PR Validation 🔎

on:
  pull_request:
    types: [opened, synchronize, reopened]

permissions: {}

jobs:
  validate-commits:
    name: Validate PR Commits
    runs-on: ubuntu-latest
    timeout-minutes: 15

    permissions:
      contents: read

    steps:
      - name: Validate Latest Commit
        uses: ministryofjustice/devsecops-actions/github/commit@9babea875cafae0e3b05a5ec5aca76d6b560c42e
        with:
          config-file: "commitlint.config.js"
```

---

## 🔧 Inputs

All inputs are optional. The action works with zero configuration.

| Input          | Type   | Required | Default             | Description                                                                      |
| -------------- | ------ | -------- | ------------------- | -------------------------------------------------------------------------------- |
| `config-file`  | string | No       | `""`                | Path to custom commitlint configuration file (e.g., `commitlint.config.js`)      |
| `node-version` | string | No       | `"24.11.1"`         | Node.js version to use for commitlint execution                                  |

---

## 🔐 Required Permissions

Your workflow must explicitly grant these permissions:

| Permission | Level    | Purpose                                         |
| ---------- | -------- | ----------------------------------------------- |
| `contents` | **read** | Repository checkout and commit history access   |

**Example:**

```yaml
permissions:
  contents: read
```

---

## ⚙️ Configuration

### Custom Commitlint Configuration

Create a custom commitlint configuration file to tailor validation rules.

#### File Structure

Create `commitlint.config.js` in your repository root:

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation changes
        'style',    // Code style changes (formatting, etc.)
        'refactor', // Code refactoring
        'perf',     // Performance improvements
        'test',     // Adding or updating tests
        'build',    // Build system changes
        'ci',       // CI/CD changes
        'chore',    // Maintenance tasks
        'revert',   // Revert previous commit
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 160],
    'footer-leading-blank': [1, 'always'],
  },
};
```

#### Usage

```yaml
- uses: ministryofjustice/devsecops-actions/github/commit@9babea875cafae0e3b05a5ec5aca76d6b560c42e
  with:
    config-file: "commitlint.config.js"
```

#### Custom Rules Examples

**Require scope:**

```javascript
rules: {
  'scope-empty': [2, 'never'], // Scope is mandatory
}
```

**Custom types:**

```javascript
rules: {
  'type-enum': [
    2,
    'always',
    ['feat', 'fix', 'docs', 'security', 'deploy'],
  ],
}
```

**Enforce ticket references:**

```javascript
rules: {
  'footer-max-line-length': [0], // Disable
  'references-empty': [2, 'never'], // Must reference issue/ticket
}
```

### Conventional Commit Specification

The action validates against the [Conventional Commits](https://www.conventionalcommits.org/) specification.

**Format:**

```txt
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**

| Type       | Description                                              | Example                                     |
| ---------- | -------------------------------------------------------- | ------------------------------------------- |
| `feat`     | New feature                                              | `feat(auth): add JWT authentication`        |
| `fix`      | Bug fix                                                  | `fix(api): handle null response`            |
| `docs`     | Documentation changes                                    | `docs: update README installation steps`    |
| `style`    | Code style (whitespace, formatting)                      | `style: apply prettier formatting`          |
| `refactor` | Code change that neither fixes bug nor adds feature      | `refactor(parser): simplify token logic`    |
| `perf`     | Performance improvement                                  | `perf(database): optimise query execution`  |
| `test`     | Adding or updating tests                                 | `test(user): add integration tests`         |
| `build`    | Build system or external dependencies                    | `build: upgrade to webpack 5`               |
| `ci`       | CI/CD configuration changes                              | `ci: add deployment workflow`               |
| `chore`    | Maintenance tasks                                        | `chore: update dependencies`                |
| `revert`   | Revert previous commit                                   | `revert: revert commit abc123`              |

**Breaking Changes:**

Add `!` after type/scope to indicate breaking changes:

```bash
feat(api)!: remove deprecated v1 endpoints

BREAKING CHANGE: API v1 endpoints have been removed. Migrate to v2.
```

### Commit Signing

The action checks for commit signature **presence** but does not verify signature validity.

**Supported Signature Types:**

- **GPG Signatures** - Traditional GPG key signing
- **SSH Signatures** - Git SSH signing (Git 2.34+)

**How to sign commits:**

#### GPG Signing

```bash
# Generate GPG key
gpg --full-generate-key

# Configure Git
git config --global user.signingkey YOUR_KEY_ID
git config --global commit.gpgsign true

# Sign a commit
git commit -S -m "feat: add new feature"
```

#### SSH Signing

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Configure Git
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519.pub
git config --global commit.gpgsign true

# Sign a commit
git commit -S -m "feat: add new feature"
```

**Note**: The action only checks that a signature exists, not whether it's valid or trusted.
This allows validation in CI environments without importing public keys.

---

## 📤 Outputs

### Action Outputs

This action does not produce artifacts but provides immediate feedback:

#### Success Indicators

- ✅ **Exit Code 0** - All validations passed
- ✅ **Console Output** - Displays commit message and signature info
- ✅ **GitHub Check** - Green checkmark in PR checks

#### Failure Indicators

- ❌ **Exit Code 1** - Validation failed
- ❌ **Error Messages** - Detailed failure explanation
- ❌ **GitHub Check** - Red X in PR checks

### Console Output Examples

#### Valid Commit (Success)

```bash
🧩 Conventional Commit Validation
feat(auth): add OAuth2 authentication
✅ Commit message is valid

🔐 Signature Verification
gpg: Signature made Thu 26 Feb 2026 14:15:00 GMT
gpg:                using RSA key ED37D6E7EB2CEBF06DF4E75097AAE65204663900
✅ Commit is signed
```

#### Invalid Commit Message (Failure)

```bash
🧩 Conventional Commit Validation
Updated authentication
❌ Commit message validation failed:
  ⧗   input: Updated authentication
  ✖   subject may not be empty [subject-empty]
  ✖   type may not be empty [type-empty]
```

#### Unsigned Commit (Failure)

```bash
🔐 Signature Verification
feat(auth): add OAuth2 authentication
❌ Commit is unsigned!
Error: Process completed with exit code 1.
```

---

## 🔍 Troubleshooting

### Common Issues

#### Issue: "Commit message validation failed"

**Symptom:**

```bash
✖   type may not be empty [type-empty]
```

**Cause**: Commit message doesn't follow conventional commits format

**Solution**: Format commit message correctly:

```bash
# ✅ Correct
git commit -m "feat(api): add user endpoint"

# ❌ Incorrect
git commit -m "Added user endpoint"
```

#### Issue: "Commit is unsigned"

**Symptom:**

```bash
❌ Commit is unsigned!
```

**Cause**: Commit lacks cryptographic signature

**Solution**: Configure Git signing:

```bash
# GPG signing
git config --global commit.gpgsign true
git config --global user.signingkey YOUR_GPG_KEY_ID

# SSH signing
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519.pub
git config --global commit.gpgsign true
```

#### Issue: "Can't check signature: No public key"

**Symptom** (in logs):

```bash
gpg: Can't check signature: No public key
❌ Commit is unsigned!
```

**Cause**: The action correctly detects signature presence but GPG shows warning

**Solution**: This is expected behaviour. The action checks for `"gpg: Signature made"` which appears before the "No public key" warning.
If you still get failure, ensure your commits are actually signed locally before pushing.

#### Issue: Custom config file not found

**Symptom:**

```bash
Error: Cannot find module './commitlint.config.js'
```

**Cause**: Config file path is incorrect or file doesn't exist

**Solution**: Verify file exists and path is correct:

```bash
# Check file exists
ls -la .github/commitlint.config.js

# Use correct path
config-file: ".github/commitlint.config.js"
```

#### Issue: Node.js version incompatibility

**Symptom:**

```bash
Error: The engine "node" is incompatible with this module
```

**Cause**: Specified Node.js version too old

**Solution**: Use newer Node.js version:

```yaml
with:
  node-version: "24.11.1"
```

### Debug Mode

Enable detailed logging for troubleshooting:

```yaml
env:
  ACTIONS_STEP_DEBUG: true
  ACTIONS_RUNNER_DEBUG: true

steps:
  - name: Validate Commit
    uses: ministryofjustice/devsecops-actions/github/commit@9babea875cafae0e3b05a5ec5aca76d6b560c42e
```

---

## 📚 Best Practices

### Versioning Strategy

```yaml
# ✅ Recommended: Commit SHA (maximum security and stability)
uses: ministryofjustice/devsecops-actions/github/commit@9babea875cafae0e3b05a5ec5aca76d6b560c42e

# ⚠️ Acceptable: Version tag (updated periodically)
uses: ministryofjustice/devsecops-actions/github/commit@v1.4.0

# ❌ Not recommended: Branch names (security risk)
uses: ministryofjustice/devsecops-actions/github/commit@main
```

### Commit Message Best Practices

```yaml
# ✅ Good examples
feat(auth): implement JWT token refresh
fix(api): resolve race condition in request handler
docs(readme): clarify installation requirements
refactor(database)!: migrate to PostgreSQL 15

# ❌ Bad examples
Update code        # No type
feat: .           # Empty subject
FIX: bug          # Incorrect capitalisation
feat(Auth): add   # Incorrect scope case
```

### Signature Best Practices

```bash
# ✅ Always sign commits
git commit -S -m "feat: add feature"

# ✅ Configure signing globally
git config --global commit.gpgsign true

# ✅ Use SSH signing for simplicity (Git 2.34+)
git config --global gpg.format ssh

# ❌ Don't skip signing
git commit --no-gpg-sign -m "feat: add feature"
```

## 🤝 Contributing

See the main repository [Contributing Guidelines](../../README.md#-contributing) for details.

### Testing Changes

```bash
# Navigate to action directory
cd github/commit

# Review action definition
cat action.yml

# Validate YAML
npm run validate:yml

# Test locally with act
act push -W .github/workflows/commit-validation.yml
```

### Development Workflow

1. **Make changes** to `action.yml`
2. **Test locally** with act or in a test repository
3. **Update documentation** in this README if needed
4. **Commit changes** following conventional commit format
5. **Sign your commit** with GPG or SSH
6. **Submit pull request** with clear description

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](../../LICENSE) file for full details.

---

## 📞 Support

### Getting Help

- **📖 Documentation**: This README and inline action documentation
- **🐛 Bug Reports**: [GitHub Issues](https://github.com/ministryofjustice/devsecops-actions/issues)
- **✨ Feature Requests**: [GitHub Issues](https://github.com/ministryofjustice/devsecops-actions/issues)
- **🔒 Security Issues**: See [Security Policy](https://github.com/ministryofjustice/devsecops-actions?tab=security-ov-file)

---

## 🏆 Acknowledgements

This action leverages:

- **[Commitlint](https://commitlint.js.org/)** - Conventional commit validation
- **[Conventional Commits](https://www.conventionalcommits.org/)** - Commit message specification
- **Git** - Built-in commit signature verification

---

## 🔗 Related Documentation

- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Commitlint Documentation](https://commitlint.js.org/)
- [Git Commit Signing](https://docs.github.com/en/authentication/managing-commit-signature-verification)
- [GPG Signing Guide](https://docs.github.com/en/authentication/managing-commit-signature-verification/signing-commits)
- [SSH Signing Guide](https://docs.github.com/en/authentication/managing-commit-signature-verification/about-commit-signature-verification#ssh-commit-signature-verification)
- [Main Repository README](../../README.md)

---

Made with ❤️ by the Ministry of Justice UK - OCTO Cyber
