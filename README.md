# 🔐 DevSecOps Actions

Ministry of Justice reusable GitHub Actions

[![Ministry of Justice Repository Compliance Badge](https://github-community.service.justice.gov.uk/repository-standards/api/devsecops-actions/badge)](https://github-community.service.justice.gov.uk/repository-standards/devsecops-actions)

---

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[![GitHub release](https://img.shields.io/github/v/release/ministryofjustice/devsecops-actions)](https://github.com/ministryofjustice/devsecops-actions/releases)
[![GitHub issues](https://img.shields.io/github/issues/ministryofjustice/devsecops-actions)](https://github.com/ministryofjustice/devsecops-actions/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/ministryofjustice/devsecops-actions)](https://github.com/ministryofjustice/devsecops-actions/pulls)

A collection of reusable GitHub Actions that standardise DevSecOps security scanning including SCA (Software Composition Analysis),
SAST (Static Application Security Testing), DAST (Dynamic Application Security Testing), secrets scanning, Infrastructure as Code (IaC) security
and container security.

---

## 📋 Table of Contents

- [Architecture](#️-architecture)
- [Available Workflows](#-available-workflows)
  - [SCA Workflow](#-sca-workflow-_scayml)
- [Usage Examples](#-usage-examples)
- [Development](#️-development)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

---

## 🏗️ Architecture

### Key Architecture Concepts

1. **Reusable Workflow Pattern**: Workflows prefixed with `_` (e.g., `_sca.yml`) are designed to be called by other workflows
2. **Explicit Permissions**: Caller workflows must explicitly declare all required permissions
3. **Version Pinning**: Use `@vx.x.x` for latest updates or `@<commit-sha>` for stability
4. **Centralised Maintenance**: Developed and managed by PandA team, with future updates triggered automatically.

---

## 🚀 Available Workflows

### 🔍 SCA Workflow (`_sca.yml`)

**Reusable workflow** for comprehensive dependency management and security review.

#### Features

- 🛡️ Scans dependencies for security vulnerabilities in pull requests
- 🔄 Automatically discovers and updates outdated dependencies using Renovate Bot
- 🌐 Supports organisation-wide repository discovery (with appropriate token permissions)
- 💬 Provides PR comments with detailed SCA summaries
- 📊 Uses GitHub's SCA Action for vulnerability scanning

#### 🧩 Workflow

![Dependency Workflow Architecture](docs/sca.svg)

#### Inputs

| Input                           | Type   | Required | Default   | Description                                                                   |
| ------------------------------- | ------ | -------- | --------- | ----------------------------------------------------------------------------- |
| `renovate-version`              | string | No       | `42.64.1` | Renovate CLI version to use                                                   |
| `dependency-review-config-file` | string | No       | `""`      | Path to dependency review configuration file relative to your repository root |

#### Required Secrets

| Secret  | Description                                                                                                                                                                                                                                                 |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `token` | GitHub token with the following permissions:<br>• `contents: write` (for committing updates)<br>• `pull-requests: write` (for creating/updating PRs)<br>• `issues: write` (for creating issues)<br>• `security-events: read` (for scanning vulnerabilities) |

#### Environment Variables

| Variable       | Required | Description                                      |
| -------------- | -------- | ------------------------------------------------ |
| `TIMEZONE`     | No       | Timezone configuration from repository variables |
| `NODE_VERSION` | Yes      | Node.js version from repository variables        |

#### Concurrency

- Uses `moj-actions-dependencies` group to prevent parallel runs
- Does not cancel in-progress jobs

---

## 📖 Usage Examples

### Dependency Workflow

To use the reusable `_sca.yml` workflow in your repository:

#### Basic Usage

```yaml
name: SCA
run-name: SCA ⚡️

on:
  schedule:
    - cron: "0 0 * * *" # Run daily at midnight UTC

  pull_request:
    branches: ["main"]

permissions: {}

jobs:
  dependencies:
    permissions:
      contents: write
      pull-requests: write
      issues: write
      security-events: read

    uses: ministryofjustice/devsecops-actions/.github/workflows/_sca.yml@v1.0.0
    secrets:
      token: ${{ secrets.GITHUB_TOKEN }}
```

#### Advanced Usage with Custom Configuration

```yaml
name: SCA
run-name: SCA ⚡️

on:
  schedule:
    - cron: "0 2 * * *" # Run daily at 2 AM UTC

  pull_request:
    branches: ["main", "develop"]

permissions: {}

jobs:
  dependencies:
    permissions:
      contents: write
      pull-requests: write
      issues: write
      security-events: read

    uses: ministryofjustice/devsecops-actions/.github/workflows/_sca.yml@v1.0.0
    secrets:
      token: ${{ secrets.GITHUB_TOKEN }}
    with:
      renovate-version: "42.64.1" # Specify custom Renovate version
      dependency-review-config-file: ".github/dependency-review-config.yml" # Custom dependency review config
```

---

## 🛠️ Development

### Prerequisites

- [Node.js](https://nodejs.org/en)
- [NPM](https://www.npmjs.com/)

### Local Development

```bash
# Install dependencies
npm install

# Run validation checks
npm run validate:all

# Run spell check
npm run spellcheck

# Run individual checks
npm run validate:yml
npm run validate:md
```

### Housekeeping

```bash
# Update dependencies and run validation
npm run housekeeping
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Guidelines

1. Ensure you have activated [pre-commit hook](https://github.com/ministryofjustice/devsecops-hooks) by running `prek install` locally.
2. Follow conventional commit messages for automatic changelog generation
3. Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/ministryofjustice/devsecops-actions/issues)
- **Pull Requests**: [GitHub Pull Requests](https://github.com/ministryofjustice/devsecops-actions/pulls)

---

Made with ❤️ by the Ministry of Justice UK
