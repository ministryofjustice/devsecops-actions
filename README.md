# 🔐 DevSecOps Actions

Enterprise-Grade Reusable GitHub Actions for Security Automation

[![Ministry of Justice Repository Compliance Badge](https://github-community.service.justice.gov.uk/repository-standards/api/devsecops-actions/badge)](https://github-community.service.justice.gov.uk/repository-standards/devsecops-actions)

---

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/ministryofjustice/devsecops-actions/badge)](https://scorecard.dev/viewer/?uri=github.com/ministryofjustice/devsecops-actions)

[![GitHub release](https://img.shields.io/github/v/release/ministryofjustice/devsecops-actions)](https://github.com/ministryofjustice/devsecops-actions/releases)
[![GitHub issues](https://img.shields.io/github/issues/ministryofjustice/devsecops-actions)](https://github.com/ministryofjustice/devsecops-actions/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/ministryofjustice/devsecops-actions)](https://github.com/ministryofjustice/devsecops-actions/pulls)

## Overview

A comprehensive collection of production-ready, enterprise-grade GitHub Actions that standardise and automate
DevSecOps security practices across the software development lifecycle. This suite provides best-in-class security
scanning, dependency management, template synchronisation, and compliance reporting capabilities.

**Core Capabilities:**

- **Software Composition Analysis** - Multi-tool dependency vulnerability detection
- **Secret Scanning** - Dual-engine credential exposure prevention
- **SAST & Code Analysis** - Semantic security vulnerability detection
- **Template Synchronization** - Automated Cookiecutter/Cruft updates
- **SBOM Generation** - Software Bill of Materials for supply chain transparency
- **Compliance Reporting** - Security posture assessment and audit trails

---

## 📋 Table of Contents

- [Architecture](#️-architecture)
- [Available Actions](#-available-actions)
- [Quick Start](#-quick-start)
- [Development](#️-development)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

---

## 🏗️ Architecture

### Key Architecture Concepts

1. **Composite Actions**: Reusable composite actions in dedicated directories provide modular functionality
2. **Explicit Permissions**: Workflows must explicitly declare all required permissions following least-privilege principle
3. **Version Pinning**: Use `@vx.x.x` for latest updates or `@<commit-sha>` for maximum stability
4. **Centralized Maintenance**: Developed and managed by Ministry of Justice PandA team
5. **Zero Configuration**: Sensible defaults with optional customisation via configuration files

---

## 🚀 Available Actions

### 🔍 SCA - Software Composition Analysis

**Path**: `ministryofjustice/devsecops-actions/sca`

Enterprise-grade composite action for comprehensive software composition analysis, dependency management
and security review across the entire software supply chain.

#### Introduction

Orchestrates 9 specialized security tools:

1. **📦 Repository Checkout** - Secure code retrieval
2. **📊 Dependency Review** - PR vulnerability scanning
3. **🔎 OWASP Dependency-Check** - CVE detection (CVSS ≥7.0 fails)
4. **🔁 Renovate** - Automated dependency updates
5. **🔑 MOJ Secret Scanner** - Custom secret patterns
6. **🐷 TruffleHog** - Entropy-based secret detection (700+ detectors)
7. **⚙️ CodeQL** - SAST semantic analysis
8. **🛡️ OpenSSF Scorecard** - Security posture (18+ checks)
9. **📋 SBOM Generator** - CycloneDX-compliant bill of materials

#### Code

```yaml
- uses: ministryofjustice/devsecops-actions/sca@v1.3.0
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
```

#### Features

- ✅ **Zero Configuration** - Works out-of-the-box
- ✅ **Multi-Language** - JavaScript, Python, Java, .NET, Go, Ruby, Swift, Kotlin, C/C++
- ✅ **Container Scanning** - Docker image SBOM generation
- ✅ **GitHub Integration** - Results in Security tab
- ✅ **Compliance Ready** - NTIA SBOM & EO 14028 compliant

**[📖 Full SCA Documentation](sca/README.md)**

---

### 🚀 Cruft - Template Synchronization

**Path**: `ministryofjustice/devsecops-actions/cruft`

Automated template synchronisation action that maintains consistency between repositories created from Cookiecutter/Cruft templates and their upstream sources.

#### Introduction

Orchestrates 4 specialized components:

1. **⚒️ Install** - Python environment and Cruft setup
2. **🔑 Authenticate** - HTTPS token authentication for private templates
3. **🔎 Check** - Template update detection and availability checking
4. **✏️ Create** - Pull request creation with template updates

#### Code

**Public Template:**

```yaml
- uses: ministryofjustice/devsecops-actions/cruft@v1.3.0
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
```

**Private Template:**

```yaml
- uses: ministryofjustice/devsecops-actions/cruft@v1.3.0
  with:
    private: "true"
    github-app-id: ${{ secrets.CRUFT_APP_ID }}
    github-app-private-key: ${{ secrets.CRUFT_APP_PRIVATE_KEY }}
    github-app-owner: "${{ github.repository_owner }}"
    github-app-repositories: "${{ github.event.repository.name }},template-repository"
```

#### Features

- ✅ **Automatic Sync** - Detects upstream template changes
- ✅ **PR Automation** - Creates pull requests automatically
- ✅ **Private Support** - HTTPS token authentication for private repos
- ✅ **GitHub App Integration** - Verified commits via GitHub App
- ✅ **Smart Naming** - Date-based branch naming

**[📖 Full Cruft Documentation](cruft/README.md)**

---

### 🔎 GitHub - Repository Management

**Path**: `ministryofjustice/devsecops-actions/github`

Enterprise-grade repository health monitoring and lifecycle management actions that automate governance, compliance, and archival workflows.

#### Introduction

Orchestrates repository management capabilities:

1. **🔎 Archive Check** - Identifies dormant repositories eligible for archival
2. **📧 Notification System** - GOV.UK Notify email alerts
3. **📊 Activity Analysis** - Commit history scanning
4. **⚙️ Lifecycle Automation** - Proactive governance workflows

#### Code

**Basic Archive Check:**

```yaml
- uses: ministryofjustice/devsecops-actions/github/repository/archive@v1.3.0
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    notification-email: "team@example.gov.uk"
    gov-notify-key: ${{ secrets.GOV_NOTIFY_API_KEY }}
    gov-notify-template-id: ${{ secrets.GOV_NOTIFY_TEMPLATE_ID }}
```

**Custom Threshold:**

```yaml
- uses: ministryofjustice/devsecops-actions/github/repository/archive@v1.3.0
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    archival-days: "180"
    notification-email: "governance@example.gov.uk"
    gov-notify-key: ${{ secrets.GOV_NOTIFY_API_KEY }}
    gov-notify-template-id: ${{ secrets.GOV_NOTIFY_TEMPLATE_ID }}
```

#### Features

- ✅ **Configurable Thresholds** - Custom inactivity periods
- ✅ **Email Notifications** - GOV.UK Notify integration
- ✅ **Commit Analysis** - Deep repository activity scanning
- ✅ **Non-Destructive** - Analysis only, no auto-archival
- ✅ **Audit Trail** - Complete logging of checks

**[📖 Full GitHub Actions Documentation](github/README.md)**

---

## 🎯 Quick Start

### Prerequisites

| Component        | Requirement                                 |
| ---------------- | ------------------------------------------- |
| **GitHub Token** | Workflow token with appropriate permissions |
| **Repository**   | GitHub repository with Actions enabled      |
| **Permissions**  | Explicitly declared in workflow file        |

### Basic SCA Workflow

Create `.github/workflows/sca.yml`:

```yaml
name: SCA
run-name: Security Scanning ⚡️

on:
  schedule:
    - cron: "0 0 * * *"
  pull_request:
    branches: ["main"]

permissions: {}

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
      - uses: ministryofjustice/devsecops-actions/sca@v1.3.0
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
```

### Basic Cruft Workflow

Create `.github/workflows/cruft.yml`:

```yaml
name: Template Sync
run-name: Cruft Update 🚀

on:
  schedule:
    - cron: "0 2 * * 1" # Weekly
  workflow_dispatch:

permissions: {}

jobs:
  cruft:
    name: Synchronize Template
    runs-on: ubuntu-latest
    timeout-minutes: 15

    permissions:
      contents: write
      pull-requests: write

    steps:
      - uses: actions/checkout@v4.2.2

      - uses: ministryofjustice/devsecops-actions/cruft@v1.3.0
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
```

### Versioning Best Practices

```yaml
# ✅ Recommended: Specific version tags
uses: ministryofjustice/devsecops-actions/sca@v1.3.0

# ✅ Alternative: Commit SHA (maximum stability)
uses: ministryofjustice/devsecops-actions/sca@9babea875cafae0e3b05a5ec5aca76d6b560c42e

# ⚠️ Not recommended: Branch names
uses: ministryofjustice/devsecops-actions/sca@v1.3.0
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
npm run lint:ts           # ESLint checks
npm run validate:ts       # TypeScript type checking
npm run validate:yml      # YAML linting
npm run validate:md       # Markdown linting
npm run validate:renovate # Renovate config validation
npm run spellcheck        # Spell checking
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
npm run validate:yml

# Test with act (GitHub Actions local runner)
brew install act
act -W .github/workflows/sca.yml --container-architecture linux/amd64 -s GITHUB_TOKEN=<your-token>
```

---

## 🤝 Contributing

We welcome contributions from the community! Whether it's bug fixes, feature additions, documentation improvements, or security enhancements, your input is valuable.

### Contribution Guidelines

1. **Fork and Clone**: Fork the repository and clone it locally
2. **Branch**: Create a feature branch (`git checkout -b feature/amazing-feature`)
3. **Pre-commit Hooks**: Install MoJ [pre-commit hooks](https://github.com/ministryofjustice/devsecops-hooks) for automatic validation
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

---

## 📞 Support

### Getting Help

- **📖 Documentation**: Check this README and inline action documentation
- **🐛 Bug Reports**: [GitHub Issues](https://github.com/ministryofjustice/devsecops-actions/issues)
- **✨ Feature Requests**: [GitHub Issues](https://github.com/ministryofjustice/devsecops-actions/issues)
- **🔒 Security Issues**: See [Security](https://github.com/ministryofjustice/devsecops-actions?tab=security-ov-file) for responsible disclosure

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
- **Support**: Community-driven with MoJ maintainer oversight

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/ministryofjustice/devsecops-actions?style=social)
![GitHub forks](https://img.shields.io/github/forks/ministryofjustice/devsecops-actions?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/ministryofjustice/devsecops-actions?style=social)

![GitHub last commit](https://img.shields.io/github/last-commit/ministryofjustice/devsecops-actions)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/ministryofjustice/devsecops-actions)
![GitHub contributors](https://img.shields.io/github/contributors/ministryofjustice/devsecops-actions)

---

Made with ❤️ by the Ministry of Justice UK - 🐼 PandA Team
