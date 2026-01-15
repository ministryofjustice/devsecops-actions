# 🔐 DevSecOps Actions

Enterprise-Grade Reusable GitHub Actions for Security Automation

Ministry of Justice UK

[![Ministry of Justice Repository Compliance Badge](https://github-community.service.justice.gov.uk/repository-standards/api/devsecops-actions/badge)](https://github-community.service.justice.gov.uk/repository-standards/devsecops-actions)

---

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/ministryofjustice/devsecops-actions/badge)](https://scorecard.dev/viewer/?uri=github.com/ministryofjustice/devsecops-actions)

[![GitHub release](https://img.shields.io/github/v/release/ministryofjustice/devsecops-actions)](https://github.com/ministryofjustice/devsecops-actions/releases)
[![GitHub issues](https://img.shields.io/github/issues/ministryofjustice/devsecops-actions)](https://github.com/ministryofjustice/devsecops-actions/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/ministryofjustice/devsecops-actions)](https://github.com/ministryofjustice/devsecops-actions/pulls)

## Overview

A comprehensive collection of production-ready, enterprise-grade GitHub Actions that standardise and automate DevSecOps security practices
across the software development lifecycle. This suite provides best-in-class security scanning capabilities including:

- **SCA** (Software Composition Analysis) - Dependency vulnerability detection and management
- **Secret Scanning** - Credential and sensitive data exposure prevention
- **IaC Security** - Infrastructure as Code security validation
- **Container Security** - Docker image vulnerability scanning
- **SBOM Generation** - Software Bill of Materials for supply chain transparency
- **Compliance Reporting** - Security posture assessment and audit trails

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

**Enterprise-grade composite action** for comprehensive software composition analysis, dependency management, and security
review across the entire software supply chain.

#### What It Does

The SCA action orchestrates 9 specialized security tools to provide complete visibility into your application's dependencies,
vulnerabilities, and supply chain risks:

1. **📦 Repository Checkout** - Secure code retrieval with token authentication
2. **📊 Dependency Review** - GitHub-native vulnerability scanning for pull requests
3. **🔎 OWASP Dependency-Check** - CVE detection with CVSS threshold enforcement (fails on ≥7.0)
4. **🔁 Renovate** - Automated dependency updates with intelligent grouping
5. **🔑 MOJ Secret Scanner** - Custom secret detection using MoJ security rules
6. **🐷 TruffleHog** - Entropy-based secret scanning with 700+ detectors
7. **⚙️ CodeQL** - Semantic code analysis for security vulnerabilities (SAST)
8. **🛡️ OpenSSF Scorecard** - Security posture assessment (18+ checks)
9. **⛓️‍💥 SBOM Generator** - CycloneDX-compliant bill of materials for compliance

#### Key Benefits

- ✅ **Zero Configuration**: Works out-of-the-box with sensible defaults
- ✅ **Pull Request Integration**: Automated security checks on every PR
- ✅ **GitHub Security Integration**: Results appear in Security tab and Code Scanning
- ✅ **Compliance Ready**: NTIA SBOM compliant, meets Executive Order 14028
- ✅ **Customizable**: Override defaults with configuration files
- ✅ **Multi-Language**: Supports JavaScript, Python, Java, .NET, Go, Ruby, and more

#### 🧩 Flowchart

![SCA flowchat](docs/sca.svg)

#### Inputs

All inputs are optional except `token`. The action is designed to work with minimal configuration.

| Input                           | Type   | Required | Default   | Description                                                                                                                         |
| ------------------------------- | ------ | -------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `token`                         | string | **Yes**  | N/A       | GitHub token with required permissions (contents: read/write, pull-requests: read/write, issues: read/write, security-events: read) |
| `renovate`                      | string | No       | `true`    | Enable or disable Renovate bot for automated dependency updates                                                                     |
| `renovate-version`              | string | No       | `42.64.1` | Renovate CLI version to use (specify without 'v' prefix)                                                                            |
| `node_version`                  | string | No       | `24.11.1` | Node.js version to use for SBOM generation with Syft                                                                                |
| `dependency-review-config-file` | string | No       | `""`      | Path to custom dependency review config (e.g., `.github/dependency-review-config.yml`)                                              |
| `trufflehog-config-file`        | string | No       | `""`      | Path to custom TruffleHog secret scanning configuration                                                                             |
| `codeql-config-file`            | string | No       | `""`      | Path to custom CodeQL query configuration for SAST                                                                                  |
| `codeql-upload-findings`        | string | No       | `always`  | Control SARIF upload to Code Scanning. Set to `never` if using GitHub's default CodeQL setup                                        |
| `docker-images-file`            | string | No       | `""`      | Path to JSON file with Docker image URIs for container SBOM generation                                                              |

#### Required Permissions

Your workflow must explicitly grant these permissions for the action to function correctly:

| Permission        | Level     | Purpose                                              |
| ----------------- | --------- | ---------------------------------------------------- |
| `contents`        | **write** | Repository checkout, file access, and update commits |
| `pull-requests`   | **write** | Creating and updating pull requests (Renovate)       |
| `issues`          | **write** | Creating issues for security findings                |
| `security-events` | **read**  | Accessing and uploading security scan results        |

#### Docker Images Configuration

Enable container vulnerability scanning and SBOM generation by providing a JSON file listing your Docker images.

**File Structure:**

Create a JSON file (e.g., `docker-images.json` or `sources.json`) in your repository root:

```json
{
  "images": [
    "ghcr.io/ministryofjustice/devsecops-hooks:latest",
    "ghcr.io/ministryofjustice/devsecops-hooks:v1.0.0",
    "docker.io/library/nginx:1.25-alpine",
    "mcr.microsoft.com/dotnet/aspnet:8.0"
  ]
}
```

**Key Requirements:**

- ✅ Must contain an `images` property as an array
- ✅ Each element should be a fully qualified image URI with registry
- ✅ Include version tags (avoid `latest` in production)
- ✅ Supports all OCI-compliant registries (Docker Hub, GHCR, ACR, ECR, etc.)
- ✅ Multiple images can be scanned in a single workflow run

**Usage in Workflow:**

```yaml
- uses: ministryofjustice/devsecops-actions/sca@v1.0.0
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    docker-images-file: "docker-images.json"
```

**Generated Artifacts:**

The action generates CycloneDX 1.5 compliant SBOMs:

- `sca-sbom-repository.cdx.json` - Repository dependencies
- `sca-sbom-<sanitized-image-name>.cdx.json` - Per-image SBOMs

All artifacts are uploaded to the workflow run and available for download for 90 days.

---

## 📖 Usage Examples

### Quick Start - SCA Action

The simplest way to get started with comprehensive security scanning:

#### Minimal Configuration

```yaml
name: SCA
run-name: SCA ⚡️

on:
  schedule:
    - cron: "0 0 * * *" # Daily at midnight UTC
  pull_request:
    branches: ["main"]

permissions: {} # Top-level permissions set to none (explicit security)

jobs:
  sca:
    name: Software Composition Analysis
    runs-on: ubuntu-latest
    timeout-minutes: 30

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

This minimal setup provides:
✅ Dependency vulnerability scanning  
✅ Secret detection (2 tools)  
✅ CodeQL analysis  
✅ OWASP security checks  
✅ OpenSSF Scorecard  
✅ SBOM generation  
✅ Automated dependency updates

#### Production Configuration with Custom Settings

```yaml
name: SCA
run-name: SCA ⚡️

on:
  schedule:
    - cron: "0 2 * * *" # Daily at 2 AM UTC

  pull_request:
    branches: ["main", "develop", "release/*"]
    types: [opened, synchronize, reopened]

  push:
    branches: ["main"]

  workflow_dispatch: # Manual trigger

permissions: {}

jobs:
  sca:
    name: Software Composition Analysis
    runs-on: ubuntu-latest
    timeout-minutes: 45

    permissions:
      contents: write
      pull-requests: write
      issues: write
      security-events: read

    steps:
      - name: Run SCA with Custom Configuration
        uses: ministryofjustice/devsecops-actions/sca@v1.0.0
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

          # Dependency Management
          renovate: "true"
          renovate-version: "42.64.1"
          node_version: "24.11.1"

          # Custom Configurations
          dependency-review-config-file: ".github/config/dependency-review.yml"
          trufflehog-config-file: ".github/config/trufflehog.yml"
          codeql-config-file: ".github/config/codeql-config.yml"
          codeql-upload-findings: "always"

          # Container Scanning
          docker-images-file: "docker-images.json"
```

#### Enterprise Configuration with Matrix Strategy

For large organizations scanning multiple configurations:

```yaml
name: SCA Matrix
run-name: SCA Matrix ⚡️

on:
  schedule:
    - cron: "0 3 * * *"
  workflow_dispatch:

permissions: {}

jobs:
  sca:
    name: SCA (${{ matrix.config-name }})
    runs-on: ubuntu-latest
    timeout-minutes: 60

    strategy:
      fail-fast: false
      matrix:
        include:
          - config-name: "Strict"
            codeql-config: ".github/codeql-strict.yml"
            renovate: "true"
          - config-name: "Standard"
            codeql-config: ".github/codeql-standard.yml"
            renovate: "true"

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
          renovate: ${{ matrix.renovate }}
          codeql-config-file: ${{ matrix.codeql-config }}
          docker-images-file: "docker-images.json"
```

#### Disable Renovate Bot

For repositories where dependency updates are managed externally:

```yaml
steps:
  - name: Run SCA without Renovate
    uses: ministryofjustice/devsecops-actions/sca@v1.0.0
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      renovate: "false" # Disable automated dependency updates
```

#### Pull Request Only (No Scheduled Scans)

Lightweight configuration for PR checks only:

```yaml
name: SCA - PR Check
run-name: SCA PR Check ⚡️

on:
  pull_request:
    branches: ["main"]
    types: [opened, synchronize]

permissions: {}

jobs:
  sca-pr:
    name: SCA Pull Request Check
    runs-on: ubuntu-latest
    timeout-minutes: 30

    permissions:
      contents: read # Read-only for PR checks
      pull-requests: write
      security-events: read

    steps:
      - name: Run SCA
        uses: ministryofjustice/devsecops-actions/sca@v1.0.0
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          renovate: "false" # No updates on PRs
          codeql-upload-findings: "always"
```

### Best Practices

#### Versioning Strategy

```yaml
# ✅ Recommended: Use specific version tags
uses: ministryofjustice/devsecops-actions/sca@v1.0.0

# ✅ Alternative: Use commit SHA for maximum stability
uses: ministryofjustice/devsecops-actions/sca@c210b12f1bd77564cee5c5f5c7306cd63dc89867

# ⚠️ Not recommended: Using branch names (unpredictable)
uses: ministryofjustice/devsecops-actions/sca@main
```

#### Token Security

```yaml
# ✅ Always use GitHub's built-in token
token: ${{ secrets.GITHUB_TOKEN }}

# ❌ Never hardcode tokens
token: ghp_abc123... # NEVER DO THIS

# ⚠️ Use custom tokens only if required
token: ${{ secrets.CUSTOM_GITHUB_TOKEN }} # Only if GITHUB_TOKEN lacks permissions
```

---

## 🛠️ Development

### Prerequisites

| Tool    | Version | Purpose                           |
| ------- | ------- | --------------------------------- |
| Node.js | 24.x    | Runtime for validation scripts    |
| npm     | 10.x    | Package management                |
| Docker  | 24.x+   | Container-based security scanning |
| Git     | 2.40+   | Version control                   |

### Local Development Setup

```bash
# Clone the repository
git clone https://github.com/ministryofjustice/devsecops-actions.git
cd devsecops-actions

# Install dependencies
npm install

# Run all validation checks
npm run validate:all

# Run individual validations
npm run validate:yml    # YAML linting
npm run validate:md     # Markdown linting
npm run spellcheck      # Spell checking

# Format code
npm run format
```

### Project Structure

```txt
devsecops-actions/
├── .github/              # GitHub workflows and templates
│   └── workflows/        # CI/CD automation
├── docs/                 # Documentation and diagrams
├── sca/                  # Software Composition Analysis actions
│   ├── action.yml        # Main composite action
│   ├── codeql/           # CodeQL SAST integration
│   ├── dependencies/     # Dependency review
│   ├── moj/              # MOJ custom secret scanner
│   ├── ossf/             # OpenSSF Scorecard
│   ├── owasp/            # OWASP Dependency-Check
│   ├── renovate/         # Renovate Bot integration
│   ├── repository/       # Repository checkout
│   ├── sbom/             # SBOM generation
│   └── trufflehog/       # TruffleHog secret scanner
├── src/                  # Source code (if applicable)
├── package.json          # Node.js dependencies
└── README.md             # This file
```

### Quality Assurance

```bash
# Run comprehensive housekeeping
npm run housekeeping

# Update all dependencies and validate
npm update && npm run validate:all

# Run security audit
npm audit

# Check for outdated packages
npm outdated
```

### Testing Actions Locally

```bash
# Test individual SCA components
cd sca/<component-name>

# Validate YAML syntax
yamllint action.yml

# Test with act (GitHub Actions local runner)
act -j sca -s GITHUB_TOKEN=<your-token>
```

---

## 🤝 Contributing

We welcome contributions from the community! Whether it's bug fixes, feature additions, documentation improvements, or security enhancements, your input is valuable.

### Contribution Guidelines

1. **Fork and Clone**: Fork the repository and clone it locally
2. **Branch**: Create a feature branch (`git checkout -b feature/amazing-feature`)
3. **Pre-commit Hooks**: Install pre-commit hooks for automatic validation

   ```bash
   # Install MOJ DevSecOps Hooks
   npm install -g @ministryofjustice/prek
   prek install
   ```

4. **Conventional Commits**: Follow [Conventional Commits](https://www.conventionalcommits.org/) for automatic changelog generation

   ```bash
   git commit -m "feat: add new secret detection pattern"
   git commit -m "fix: resolve CodeQL configuration issue"
   git commit -m "docs: update SBOM usage examples"
   ```

5. **Test**: Ensure all validation checks pass

   ```bash
   npm run validate:all
   npm run spellcheck
   ```

6. **Pull Request**: Submit a PR with a clear description of changes
7. **Review**: Wait for maintainer review and address feedback

### Commit Message Format

```bash
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

**Examples:**

```bash
feat(sca): add support for custom SBOM formats
fix(codeql): resolve timeout issue for large repositories
docs(readme): add enterprise configuration examples
chore(deps): update renovate to v42.64.1
```

### Development Workflow

1. **Open an Issue**: For major changes, open an issue first to discuss
2. **Get Feedback**: Wait for maintainer feedback before significant work
3. **Implement**: Make your changes following our coding standards
4. **Document**: Update documentation for any user-facing changes
5. **Test**: Ensure all checks pass
6. **Submit**: Create a pull request with detailed description

### Code Review Process

- All PRs require approval from at least one maintainer
- Automated checks must pass (YAML validation, linting, spell check)
- Security scans must pass without introducing new vulnerabilities
- Documentation must be updated for feature changes

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for full details.

### License Summary

```txt
Copyright (c) 2024-2026 Ministry of Justice UK

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 📞 Support

### Getting Help

- **📖 Documentation**: Check this README and inline action documentation
- **💬 Discussions**: [GitHub Discussions](https://github.com/ministryofjustice/devsecops-actions/discussions)
- **🐛 Bug Reports**: [GitHub Issues](https://github.com/ministryofjustice/devsecops-actions/issues)
- **✨ Feature Requests**: [GitHub Issues](https://github.com/ministryofjustice/devsecops-actions/issues)
- **🔒 Security Issues**: See [SECURITY.md](SECURITY.md) for responsible disclosure

### Issue Templates

When reporting issues, please use the appropriate template:

- 🐛 **Bug Report**: For reproducible issues with the actions
- 💡 **Feature Request**: For new capabilities or enhancements
- 📖 **Documentation**: For documentation improvements or corrections
- 🔒 **Security**: For security vulnerabilities (use private reporting)

### Response Times

- **Critical Security Issues**: Within 24 hours
- **Bugs**: Within 3-5 business days
- **Feature Requests**: Within 1-2 weeks
- **Documentation**: Within 1 week

### Community

- **Maintainer**: Ministry of Justice Platform & Architecture Team
- **Active Development**: ✅ Actively maintained
- **Production Ready**: ✅ Used in UK Government production services
- **Support**: Community-driven with MoJ maintainer oversight

---

## 🏆 Acknowledgments

This project leverages and integrates several industry-leading open-source security tools:

- **GitHub CodeQL** - Semantic code analysis engine
- **OWASP Dependency-Check** - Dependency vulnerability scanning
- **Renovate Bot** - Automated dependency management
- **TruffleHog** - Secret scanning and detection
- **OpenSSF Scorecard** - Security posture assessment
- **Syft** - SBOM generation
- **GitHub Actions** - CI/CD platform

Special thanks to the open-source security community and all contributors who help make this project better.

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/ministryofjustice/devsecops-actions?style=social)
![GitHub forks](https://img.shields.io/github/forks/ministryofjustice/devsecops-actions?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/ministryofjustice/devsecops-actions?style=social)

![GitHub last commit](https://img.shields.io/github/last-commit/ministryofjustice/devsecops-actions)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/ministryofjustice/devsecops-actions)
![GitHub contributors](https://img.shields.io/github/contributors/ministryofjustice/devsecops-actions)

---

Made with ❤️ by the Ministry of Justice UK - PandA Team
