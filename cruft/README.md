# 🚀 Cruft Template Synchronization Action

Enterprise-Grade Template Synchronisation for Cookiecutter Projects

---

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](../LICENSE)
[![Ministry of Justice](https://img.shields.io/badge/Ministry%20of%20Justice-UK-blue.svg)](https://www.gov.uk/government/organisations/ministry-of-justice)

## Overview

An automated template synchronisation action that maintains consistency between repositories created from Cookiecutter/Cruft
templates and their upstream sources. This action detects template updates, intelligently applies changes
and automatically creates pull requests with synchronized modifications, ensuring your projects remain
aligned with template best practices and improvements.

**Key Capabilities:**

- **Template Synchronization** - Automated detection and application of upstream template changes
- **Pull Request Automation** - Automatic PR creation with synchronized changes
- **Private Template Support** - SSH authentication for private template repositories
- **Signed Commits** - Git commit signing for verification and security
- **Intelligent Updates** - Conflict-aware synchronisation with strict mode enforcement

---

## 📋 Table of Contents

- [Architecture](#️-architecture)
- [Features](#-features)
- [Usage Examples](#-usage-examples)
- [Inputs](#-inputs)
- [Required Permissions](#-required-permissions)
- [Configuration](#️-configuration)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

---

## 🏗️ Architecture

### Component Architecture

![Cruft Flowchart](../docs/cruft.svg)

Each component is an independent composite action that can be configured individually:

1. **⚡️ Install** - Python environment setup and Cruft installation
2. **➕ Create** - Template update detection and PR creation
3. **🔑 Authenticate** - SSH authentication for private templates

---

## ✨ Features

### Core Capabilities

- ✅ **Automatic Template Updates**: Detects changes in upstream Cookiecutter/Cruft templates
- ✅ **Pull Request Automation**: Creates PRs automatically with synchronized changes
- ✅ **Private Template Support**: SSH-based authentication for private repositories
- ✅ **Signed Commits**: Git commit signing using SSH keys for verification
- ✅ **Intelligent Branch Naming**: Date-based branch naming for easy tracking
- ✅ **Strict Mode**: Enforces template consistency with strict update validation
- ✅ **Non-Interactive**: Fully automated workflow without manual intervention
- ✅ **Configurable Base Branch**: Target any base branch for pull requests

### Security Features

- 🔒 **SSH Key Management**: Secure SSH key configuration with proper permissions
- 🔒 **StrictHostKeyChecking**: Prevents man-in-the-middle attacks
- 🔒 **Ed25519 Support**: Modern cryptographic algorithm support
- 🔒 **Token Authentication**: GitHub token-based API access
- 🔒 **Isolated Identity Files**: Per-operation SSH identity isolation

---

## 📖 Usage Examples

### Quick Start - Public Template

The simplest way to synchronize a repository with a public Cookiecutter template:

#### Minimal Configuration

```yaml
name: Cruft Update
run-name: Template Sync 🚀

on:
  schedule:
    - cron: "0 2 * * 1" # Weekly on Monday at 2 AM UTC
  workflow_dispatch: # Manual trigger

permissions: {} # Top-level permissions set to none (explicit security)

jobs:
  cruft-update:
    name: Synchronize Template
    runs-on: ubuntu-latest
    timeout-minutes: 15

    permissions:
      contents: write
      pull-requests: write

    steps:
      - name: Checkout Repository
        uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2

      - name: Run Cruft Update
        uses: ministryofjustice/devsecops-actions/cruft@v1.0.0
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
```

This minimal setup provides:
✅ Weekly template synchronisation  
✅ Automatic pull request creation  
✅ Signed commits  
✅ Date-based branch naming

### Advanced Configuration - Private Template

For repositories using private Cookiecutter templates:

```yaml
name: Cruft Update - Private Template
run-name: Template Sync 🚀

on:
  schedule:
    - cron: "0 3 * * 1" # Weekly on Monday at 3 AM UTC
  workflow_dispatch:

permissions: {}

jobs:
  cruft-update:
    name: Synchronize Private Template
    runs-on: ubuntu-latest
    timeout-minutes: 20

    permissions:
      contents: write
      pull-requests: write

    steps:
      - name: Checkout Repository
        uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2

      - name: Run Cruft Update with SSH Authentication
        uses: ministryofjustice/devsecops-actions/cruft@v1.0.0
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          private: "true"
          ssh-key: ${{ secrets.CRUFT_SSH_KEY }}
          github-known-hosts: ${{ secrets.GITHUB_KNOWN_HOSTS }}
          base-branch: "main"
          python-version: "3.14.2"
```

### Production Configuration with Custom Base Branch

```yaml
name: Cruft Update - Production
run-name: Template Sync 🚀

on:
  schedule:
    - cron: "0 4 * * 1,4" # Monday and Thursday at 4 AM UTC

  workflow_dispatch:
    inputs:
      base-branch:
        description: "Target base branch"
        required: false
        default: "develop"

permissions: {}

jobs:
  cruft-update:
    name: Template Sync (${{ github.event.inputs.base-branch || 'develop' }})
    runs-on: ubuntu-latest
    timeout-minutes: 20

    permissions:
      contents: write
      pull-requests: write
      issues: write

    steps:
      - name: Checkout Repository
        uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2
        with:
          fetch-depth: 0 # Full history for better diff

      - name: Run Cruft Update
        uses: ministryofjustice/devsecops-actions/cruft@v1.0.0
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          private: "true"
          ssh-key: ${{ secrets.CRUFT_SSH_KEY }}
          github-known-hosts: ${{ secrets.GITHUB_KNOWN_HOSTS }}
          base-branch: ${{ github.event.inputs.base-branch || 'develop' }}
          python-version: "3.14.2"
```

### Multi-Repository Synchronization

For organizations managing multiple template-based repositories:

```yaml
name: Bulk Template Sync
run-name: Multi-Repo Template Sync 🚀

on:
  schedule:
    - cron: "0 5 * * 0" # Weekly on Sunday at 5 AM UTC
  workflow_dispatch:

permissions: {}

jobs:
  sync-templates:
    name: Sync Repository Templates
    runs-on: ubuntu-latest
    timeout-minutes: 30

    strategy:
      fail-fast: false
      matrix:
        repository:
          - repo-name-1
          - repo-name-2
          - repo-name-3

    permissions:
      contents: write
      pull-requests: write

    steps:
      - name: Checkout ${{ matrix.repository }}
        uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2
        with:
          repository: ministryofjustice/${{ matrix.repository }}
          token: ${{ secrets.ORG_ACCESS_TOKEN }}

      - name: Sync Template
        uses: ministryofjustice/devsecops-actions/cruft@v1.0.0
        with:
          token: ${{ secrets.ORG_ACCESS_TOKEN }}
          private: "true"
          ssh-key: ${{ secrets.CRUFT_SSH_KEY }}
          github-known-hosts: ${{ secrets.GITHUB_KNOWN_HOSTS }}
```

---

## 🔧 Inputs

All inputs are optional except `token`. The action works with sensible defaults for most use cases.

| Input                | Type   | Required | Default  | Description                                                                                     |
| -------------------- | ------ | -------- | -------- | ----------------------------------------------------------------------------------------------- |
| `token`              | string | **Yes**  | N/A      | GitHub token with write permissions for contents and pull-requests                              |
| `python-version`     | string | No       | `3.14.2` | Python version to use for Cruft installation                                                    |
| `private`            | string | No       | `false`  | Set to `true` if template repository is private and requires SSH authentication                 |
| `ssh-key`            | string | No       | `""`     | SSH private key for private template access. Required when `private` is `true`                  |
| `github-known-hosts` | string | No       | `""`     | GitHub SSH host key fingerprints. Required when `private` is `true`. We recommend using Ed25519 |
| `base-branch`        | string | No       | `main`   | Base branch where pull requests will be targeted                                                |

---

## 🔐 Required Permissions

Your workflow must explicitly grant these permissions:

| Permission      | Level     | Purpose                                |
| --------------- | --------- | -------------------------------------- |
| `contents`      | **write** | Repository checkout and commit changes |
| `pull-requests` | **write** | Creating and updating pull requests    |

---

## ⚙️ Configuration

### Setting Up SSH for Private Templates

#### 1. Generate SSH Key Pair

Generate an Ed25519 SSH key (recommended for security and performance):

```bash
ssh-keygen -t ed25519 -C "cruft-template-access" -f cruft_key
```

This creates two files:

- `cruft_key` - Private key (keep secret)
- `cruft_key.pub` - Public key (add to GitHub)

#### 2. Add Public Key to GitHub

Option A: Deploy Key (Recommended)

1. Navigate to template repository → Settings → Deploy keys
2. Click "Add deploy key"
3. Paste contents of `cruft_key.pub`
4. Title: "Cruft Template Sync"
5. Check "Allow write access" (only if updating template from consumer repo)

#### 3. Get GitHub Known Hosts

Retrieve GitHub's SSH host key [fingerprint](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints):

```bash
ssh-keyscan -t ed25519 github.com
```

Expected output:

```bash
github.com ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl
```

#### 4. Store in GitHub Secrets

Add these secrets to your repository:

1. **CRUFT_SSH_KEY**
   - Value: Contents of `cruft_key` (entire private key including headers)
   - Format:

     ```bash
     -----BEGIN OPENSSH PRIVATE KEY-----
     b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAAAMwAAAAtz...
     -----END OPENSSH PRIVATE KEY-----
     ```

2. **GITHUB_KNOWN_HOSTS**
   - Value: Output from `ssh-keyscan` command
   - Format: `github.com ssh-ed25519 AAC3Nza...`

### Branch Naming Convention

Pull requests are created with the following naming pattern:

```bash
chore/cookie-cutter-update-YYYYMMDD
```

**Examples:**

- `chore/cookie-cutter-update-20260128`
- `chore/cookie-cutter-update-20260204`

This convention:

- Groups updates under 'chore' semantic type
- Uses date suffix for uniqueness
- Makes tracking multiple updates easy

---

## 🔍 Troubleshooting

### Common Issues and Solutions

#### Issue: "No .cruft.json file found"

**Cause**: Repository was not created with Cruft or file was deleted

**Solution**:

```bash
# Initialize Cruft tracking
cruft link https://github.com/ministryofjustice/template-repository
```

#### Issue: SSH Authentication Failure

**Cause**: Invalid SSH key or incorrect known_hosts

**Solution**:

1. Verify SSH key format (must include headers/footers)
2. Ensure known_hosts is from `ssh-keyscan -t ed25519 github.com`
3. Check deploy key has correct repository access
4. Verify secrets are named exactly: `CRUFT_SSH_KEY` and `GITHUB_KNOWN_HOSTS`

#### Issue: "Permission denied" when creating PR

**Cause**: Insufficient GitHub token permissions

**Solution**:

```yaml
permissions:
  contents: write # Required for commits
  pull-requests: write # Required for PR creation
```

Also ensure the workflow utilises an appropriately configured PAT.

### Debug Mode

Enable debug logging by setting workflow environment variables:

```yaml
env:
  ACTIONS_STEP_DEBUG: true
  ACTIONS_RUNNER_DEBUG: true
```

---

## 📚 Best Practices

### Versioning Strategy

```yaml
# ✅ Recommended: Use specific version tags
uses: ministryofjustice/devsecops-actions/cruft@v1.0.0

# ✅ Alternative: Use commit SHA for maximum stability
uses: ministryofjustice/devsecops-actions/cruft@9babea875cafae0e3b05a5ec5aca76d6b560c42e

# ⚠️ Not recommended: Using branch names (unpredictable)
uses: ministryofjustice/devsecops-actions/cruft@main
```

### Security Best Practices

```yaml
# ✅ Always use GitHub's built-in token when possible
token: ${{ secrets.GITHUB_TOKEN }}

# ❌ Never hardcode tokens
token: ghp_abc123... # NEVER DO THIS

# ✅ Use organization tokens for cross-repo operations
token: ${{ secrets.ORG_ACCESS_TOKEN }}
```

### Scheduling Best Practices

```yaml
# ✅ Run weekly to balance freshness and noise
schedule:
  - cron: "0 2 * * 1" # Monday at 2 AM

# ✅ Run bi-weekly for stable templates
schedule:
  - cron: "0 2 1,15 * *" # 1st and 15th of month

# ⚠️ Avoid running too frequently
schedule:
  - cron: "0 * * * *" # Hourly - Too frequent!
```

### SSH Key Management

- 🔐 **Rotate regularly**: Change SSH keys every 90 days
- 🔐 **Use deploy keys**: Prefer deploy keys over personal keys
- 🔐 **Monitor usage**: Review GitHub audit logs for SSH access
- 🔐 **Limit scope**: One deploy key per template repository
- 🔐 **Document keys**: Keep a record of which keys are used where

---

## 🤝 Contributing

We welcome contributions! See the main repository [Contributing Guidelines](../README.md#-contributing) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes to `cruft/` actions
4. Test with a sample repository
5. Update this README if adding features
6. Submit a pull request

### Testing Locally

```bash
# Test SSH authentication setup
cd cruft/authenticate
# Review action.yml changes

# Test installation
cd cruft/install
pip install -r requirements.txt
cruft --version

# Test full workflow
cd ../../
# Create test repository and run action
```

---

## 📞 Support

### Getting Help

- **📖 Documentation**: This README and inline action documentation
- **🐛 Bug Reports**: [GitHub Issues](https://github.com/ministryofjustice/devsecops-actions/issues)
- **✨ Feature Requests**: [GitHub Issues](https://github.com/ministryofjustice/devsecops-actions/issues)
- **🔒 Security Issues**: See [Security](https://github.com/ministryofjustice/devsecops-actions?tab=security-ov-file)

### Response Times

- **Critical Issues**: Within 24 hours
- **Bugs**: Within 3-5 business days
- **Feature Requests**: Within 1-2 weeks

---

## 🏆 Acknowledgments

This action leverages:

- **Cruft** - Template synchronisation tool by [cruft](https://github.com/cruft/cruft)
- **Cookiecutter** - Project templating by [cookiecutter](https://github.com/cookiecutter/cookiecutter)
- **GitHub Actions** - CI/CD platform by GitHub

---

## 🔗 Related Documentation

- [Cruft Documentation](https://cruft.github.io/cruft/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

Made with ❤️ by the Ministry of Justice UK - 🐼 PandA Team
