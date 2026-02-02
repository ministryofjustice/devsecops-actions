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
- **Private Template Support** - HTTPS token authentication for private template repositories
- **Verified Commits** - GitHub App bot commits with automatic verification
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

1. **⚒️ Install** - Python environment setup and Cruft installation
2. **🔑 Authenticate** - HTTPS token authentication for private templates
3. **🔎 Check** - Template update detection and availability checking
4. **✏️ Create** - Pull request creation with template updates

---

## ✨ Features

### Core Capabilities

- ✅ **Automatic Template Updates**: Detects changes in upstream Cookiecutter/Cruft templates
- ✅ **Pull Request Automation**: Creates PRs automatically with synchronized changes
- ✅ **Private Template Support**: HTTPS token-based authentication for private repositories
- ✅ **GitHub App Integration**: Verified commits via GitHub App authentication
- ✅ **Intelligent Branch Naming**: Date-based branch naming for easy tracking
- ✅ **Strict Mode**: Enforces template consistency with strict update validation
- ✅ **Non-Interactive**: Fully automated workflow without manual intervention
- ✅ **Configurable Base Branch**: Target any base branch for pull requests

### Security Features

- 🔒 **Token Authentication**: Secure HTTPS-based authentication with GitHub tokens
- 🔒 **GitHub App Support**: First-class GitHub App integration for verified commits
- 🔒 **Verified Commits**: Automatic commit verification via GitHub App bot users
- 🔒 **Permission Scoping**: Fine-grained permission control for token generation
- 🔒 **Secure Token Handling**: Environment-based token management

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
✅ Verified commits via GitHub App (when configured)  
✅ Date-based branch naming

### Advanced Configuration - Private Template with GitHub App

For repositories using private Cookiecutter templates with GitHub App authentication:

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
      workflows: write

    steps:
      - name: Checkout Repository
        uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2

      - name: Run Cruft Update with GitHub App
        uses: ministryofjustice/devsecops-actions/cruft@v1.0.0
        with:
          private: "true"
          github-app-id: ${{ secrets.CRUFT_APP_ID }}
          github-app-private-key: ${{ secrets.CRUFT_APP_PRIVATE_KEY }}
          github-app-owner: "${{ github.repository_owner }}"
          github-app-repositories: "${{ github.event.repository.name }},template-repository"
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
      workflows: write
      issues: write

    steps:
      - name: Checkout Repository
        uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2
        with:
          fetch-depth: 0 # Full history for better diff

      - name: Run Cruft Update
        uses: ministryofjustice/devsecops-actions/cruft@v1.0.0
        with:
          private: "true"
          github-app-id: ${{ secrets.CRUFT_APP_ID }}
          github-app-private-key: ${{ secrets.CRUFT_APP_PRIVATE_KEY }}
          github-app-owner: "${{ github.repository_owner }}"
          github-app-repositories: "${{ github.event.repository.name }},template-repository"
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
          github-app-id: ${{ secrets.CRUFT_APP_ID }}
          github-app-private-key: ${{ secrets.CRUFT_APP_PRIVATE_KEY }}
          github-app-owner: "${{ github.repository_owner }}"
          github-app-repositories: "${{ matrix.repository }},template-repository"
```

---

## 🔧 Inputs

All inputs are optional except when using GitHub App authentication for private templates. The action works with sensible defaults for most use cases.

| Input                          | Type   | Required | Default  | Description                                                                                    |
| ------------------------------ | ------ | -------- | -------- | ---------------------------------------------------------------------------------------------- |
| `token`                        | string | No       | N/A      | GitHub token with write permissions for contents and pull-requests (required if not using App) |
| `python-version`               | string | No       | `3.14.2` | Python version to use for Cruft installation                                                   |
| `private`                      | string | No       | `false`  | Set to `true` if template repository is private and requires authentication                    |
| `github-app-id`                | string | No       | `""`     | GitHub App ID for authentication token generation (required for private templates with App)    |
| `github-app-private-key`       | string | No       | `""`     | GitHub App private key in PEM format (required for private templates with App)                 |
| `github-app-owner`             | string | No       | `""`     | GitHub organisation or user name for token scope limitation                                    |
| `github-app-repositories`      | string | No       | `""`     | Comma-separated list of repository names for token scope (e.g., "repo1,template-repo")         |
| `base-branch`                  | string | No       | `main`   | Base branch where pull requests will be targeted                                               |
| `target-branch-name`           | string | No       | Auto     | Custom branch name (default: `chore/cookie-cutter-update-YYYYMMDD`)                            |
| `target-branch-heading`        | string | No       | Auto     | Pull request title (default: `chore(update): cruft update`)                                    |
| `target-branch-commit-message` | string | No       | Auto     | Git commit message (default: `chore(update): cruft update`)                                    |
| `target-branch-body`           | string | No       | Auto     | Pull request body text (default: `chore(update): cruft update`)                                |
| `target-branch-labels`         | string | No       | `""`     | Comma or newline-separated list of labels to apply to PR                                       |
| `target-branch-reviewers`      | string | No       | `""`     | Comma or newline-separated list of GitHub usernames to request reviews from                    |

---

## 🔐 Required Permissions

Your workflow must explicitly grant these permissions:

| Permission      | Level     | Purpose                                           |
| --------------- | --------- | ------------------------------------------------- |
| `contents`      | **write** | Repository checkout and commit changes            |
| `pull-requests` | **write** | Creating and updating pull requests               |
| `workflows`     | **write** | Required when using GitHub App for workflow files |

---

## ⚙️ Configuration

### Setting Up GitHub App for Private Templates

#### 1. Create or Use Existing GitHub App

You can either create a new GitHub App or use an existing one:

Option A: Organisation-Level GitHub App (Recommended)

1. Navigate to Organisation Settings → Developer settings → GitHub Apps
2. Click "New GitHub App"
3. Configure basic settings:
   - **Name**: "Cruft Template Sync Bot"
   - **Homepage URL**: Your organisation's URL
   - **Webhook**: Uncheck "Active" (not needed)

Option B: Repository-Level GitHub App

1. Navigate to Repository Settings → Developer settings → GitHub Apps
2. Follow same steps as above

#### 2. Configure Permissions

Set the following repository permissions:

| Permission    | Access     | Purpose                           |
| ------------- | ---------- | --------------------------------- |
| Contents      | Read/Write | Clone template and commit changes |
| Pull Requests | Read/Write | Create and manage pull requests   |
| Workflows     | Read/Write | Update workflow files in .github/ |

#### 3. Generate Private Key

1. Scroll to "Private keys" section
2. Click "Generate a private key"
3. Save the downloaded `.pem` file securely
4. **Important**: This key cannot be retrieved again

#### 4. Install GitHub App

1. Click "Install App" in the left sidebar
2. Select your organisation or account
3. Choose repositories:
   - **All repositories**, or
   - **Select repositories** (consumer repo + template repo)
4. Click "Install"

#### 5. Store in GitHub Secrets

Add these secrets to your repository:

1. **CRUFT_APP_ID**
   - Value: GitHub App ID (found on app's settings page)
   - Format: Numeric ID (e.g., `123456`)

2. **CRUFT_APP_PRIVATE_KEY**
   - Value: Contents of the `.pem` file (entire key including headers)
   - Format:

     ```bash
     -----BEGIN RSA PRIVATE KEY-----
     MIIEpAIB...
     -----END RSA PRIVATE KEY-----
     ```

### Alternative: Using Personal Access Token

For simpler setups without GitHub App:

1. Generate a Classic PAT with `repo` scope
2. Store as `GITHUB_TOKEN` secret
3. Use in workflow:

   ```yaml
   with:
     token: ${{ secrets.GITHUB_TOKEN }}
   ```

**Note**: PAT commits won't show verified badge unless using GPG signing.

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

#### Issue: GitHub App Authentication Failure

**Cause**: Invalid App ID or private key format

**Solution**:

1. Verify App ID is numeric (not App name)
2. Ensure private key includes complete PEM headers and footers
3. Check GitHub App is installed on both consumer and template repositories
4. Verify App has required permissions (contents, pull-requests, workflows)
5. Ensure secrets are named exactly: `CRUFT_APP_ID` and `CRUFT_APP_PRIVATE_KEY`

#### Issue: "Refusing to allow GitHub App to create workflow without workflows permission"

**Cause**: GitHub App lacks `workflows` permission or workflow doesn't grant it

**Solution**:

```yaml
permissions:
  contents: write
  pull-requests: write
  workflows: write # Required for workflow files
```

Also ensure GitHub App has `workflows: read/write` permission in its settings.

#### Issue: "Permission denied" when creating PR

**Cause**: Insufficient GitHub token or App permissions

**Solution**:

```yaml
permissions:
  contents: write # Required for commits
  pull-requests: write # Required for PR creation
  workflows: write # Required for workflow file changes
```

Also ensure GitHub App has appropriate permissions configured in its settings.

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
# ✅ Always use GitHub App for verified commits
github-app-id: ${{ secrets.CRUFT_APP_ID }}
github-app-private-key: ${{ secrets.CRUFT_APP_PRIVATE_KEY }}

# ✅ Use built-in token for public templates
token: ${{ secrets.GITHUB_TOKEN }}

# ❌ Never hardcode credentials
github-app-id: 123456 # NEVER DO THIS
token: ghp_abc123... # NEVER DO THIS

# ✅ Use organisation tokens for cross-repo operations
token: ${{ secrets.ORG_ACCESS_TOKEN }}
```

### GitHub App Management

- 🔐 **Rotate keys regularly**: Regenerate private keys every 90 days
- 🔐 **Review permissions**: Audit App permissions quarterly
- 🔐 **Monitor usage**: Review GitHub audit logs for App activity
- 🔐 **Limit installation**: Only install App on necessary repositories
- 🔐 **Document Apps**: Keep a record of which Apps are used where

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
