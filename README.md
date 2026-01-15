# 🔐 DevSecOps Actions

Ministry of Justice reusable GitHub Actions

[![Ministry of Justice Repository Compliance Badge](https://github-community.service.justice.gov.uk/repository-standards/api/devsecops-actions/badge)](https://github-community.service.justice.gov.uk/repository-standards/devsecops-actions)

---

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/ministryofjustice/devsecops-actions/badge)](https://scorecard.dev/viewer/?uri=github.com/ministryofjustice/devsecops-actions)

[![GitHub release](https://img.shields.io/github/v/release/ministryofjustice/devsecops-actions)](https://github.com/ministryofjustice/devsecops-actions/releases)
[![GitHub issues](https://img.shields.io/github/issues/ministryofjustice/devsecops-actions)](https://github.com/ministryofjustice/devsecops-actions/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/ministryofjustice/devsecops-actions)](https://github.com/ministryofjustice/devsecops-actions/pulls)

A collection of reusable GitHub Actions that standardise DevSecOps security scanning including SCA (Software Composition Analysis),
SAST (Static Application Security Testing), DAST (Dynamic Application Security Testing), secrets scanning, Infrastructure as Code (IaC) security
and container security.

---

## 📋 Table of Contents

- [Architecture](#️-architecture)
- [Available Actions](#-available-actions)
  - [SCA Action](#-sca-action)
- [Usage Examples](#-usage-examples)
- [Development](#️-development)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

---

## 🏗️ Architecture

### Key Architecture Concepts

1. **Composite Actions**: Reusable composite actions in dedicated directories (e.g., `sca/`) provide modular functionality
2. **Explicit Permissions**: Workflows must explicitly declare all required permissions
3. **Version Pinning**: Use `@vx.x.x` for latest updates or `@<commit-sha>` for stability
4. **Centralised Maintenance**: Developed and managed by PandA team, with future updates triggered automatically.

---

## 🚀 Available Actions

### 🔍 SCA Action

**Composite action** for comprehensive software composition analysis including dependency management and security review.

#### Features

- 🛡️ Scans dependencies for security vulnerabilities in pull requests
- 🔍 OWASP dependency checking for known CVEs with CVSS threshold enforcement
- 🔄 Automatically discovers and updates outdated dependencies using Renovate Bot
- 💬 Provides detailed dependency review analysis
- 📊 Uses GitHub's Dependency Review Action for vulnerability scanning
- 🤖 Optional Renovate bot integration for automated dependency updates
- 🔑 Secret scanning using MoJ DevSecOps hooks and Trufflehog to detect exposed credentials
- ⚙️ Code security analysis using CodeQL for vulnerability detection
- 🛡️ OpenSSF Scorecard security scoring for project health assessment
- ⛓️‍💥 Software Bill of Materials (SBOM) generation using Syft for dependencies and Docker images

#### 🧩 Flowchart

![SCA flowchat](docs/sca.svg)

#### Inputs

| Input                           | Type   | Required | Default   | Description                                                                                                                         |
| ------------------------------- | ------ | -------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `token`                         | string | Yes      | N/A       | GitHub token with required permissions (contents: read/write, pull-requests: read/write, issues: read/write, security-events: read) |
| `renovate`                      | string | No       | `true`    | Enable or disable Renovate bot execution                                                                                            |
| `renovate-version`              | string | No       | `42.64.1` | Renovate CLI version to use                                                                                                         |
| `node_version`                  | string | No       | `24.11.1` | Node.js version to use for SBOM generation                                                                                          |
| `dependency-review-config-file` | string | No       | `""`      | Path to dependency review configuration file relative to your repository root                                                       |
| `trufflehog-config-file`        | string | No       | `""`      | Path to Trufflehog configuration file for secret scanning                                                                           |
| `codeql-config-file`            | string | No       | `""`      | Path to CodeQL configuration file for code analysis                                                                                 |
| `codeql-upload-findings`        | string | No       | `always`  | Upload CodeQL findings as SARIF to Code Scanning. Set to "never" if default setup is enabled                                        |
| `docker-images-file`            | string | No       | `""`      | Path to JSON file containing Docker image URIs for SBOM generation (format: `{"images": ["ghcr.io/org/image:tag"]}`)                |

#### Required Permissions

| Permission        | Level | Purpose                      |
| ----------------- | ----- | ---------------------------- |
| `contents`        | write | For committing updates       |
| `pull-requests`   | write | For creating/updating PRs    |
| `issues`          | write | For creating issues          |
| `security-events` | read  | For scanning vulnerabilities |

#### Docker Images Configuration

To enable Docker image scanning for SBOM generation, create a JSON file containing the images you wish to scan.

**File Structure:**

Create a file (e.g., `sources.json`, `docker-images.json`) in your repository root with the following structure:

```json
{
  "images": [
    "ghcr.io/ministryofjustice/devsecops-hooks:latest",
    "ghcr.io/ministryofjustice/devsecops-hooks:v1.0.0",
    "ghcr.io/ministryofjustice/devsecops-hooks:v1.2.0",
    "ghcr.io/ministryofjustice/devsecops-hooks:v1.3.0"
  ]
}
```

**Key Points:**

- The file must contain an `images` property as an array
- Each array element should be a fully qualified Docker image URI
- Supports any valid image reference format (with tags please)
- Multiple images can be specified for batch scanning
- The SBOM action will generate separate SBOM files for each image

**Usage in Workflow:**

Reference the file using the `docker-images-file` input parameter:

```yaml
- uses: ministryofjustice/devsecops-actions/sca@v1.0.0
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    docker-images-file: ${{ github.workspace }}/sources.json
```

**Generated Artefacts:**

The action will generate:

- `sca-sbom-repository.cdx.json` - Repository dependencies SBOM
- `sca-sbom-<image-name>.cdx.json` - Individual SBOM for each Docker image

All SBOM files are in CycloneDX JSON format and uploaded as workflow artefacts.

---

## 📖 Usage Examples

### SCA Action

To use the SCA composite action in your repository workflow:

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
  sca:
    name: Software Composition Analysis
    runs-on: ["ubuntu-24.04"]

    permissions:
      contents: write
      pull-requests: write
      issues: write
      security-events: read

    steps:
      - name: Run SCA
        uses: ministryofjustice/devsecops-actions/sca@v1.0.0
        with:
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
  sca:
    name: Software Composition Analysis
    runs-on: ["ubuntu-24.04"]

    permissions:
      contents: write
      pull-requests: write
      issues: write
      security-events: read

    steps:
      - name: Run SCA
        uses: ministryofjustice/devsecops-actions/sca@v1.0.0
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          renovate: "true" # Enable Renovate bot
          renovate-version: "42.64.1" # Specify custom Renovate version
          node_version: "24.11.1" # Node.js version for SBOM
          dependency-review-config-file: ".github/dependency-review-config.yml" # Custom dependency review config
          trufflehog-config-file: ".github/trufflehog-config.yml" # Custom Trufflehog config
          codeql-config-file: ".github/codeql-config.yml" # Custom CodeQL config
          codeql-upload-findings: "always" # Upload CodeQL findings
          docker-images-file: "docker-images.json" # Docker images for SBOM generation
```

#### Disable Renovate Bot

```yaml
steps:
  - name: Run SCA without Renovate
    uses: ministryofjustice/devsecops-actions/sca@v1.0.0
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      renovate: "false" # Disable Renovate bot
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
