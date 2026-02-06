# 🔧 DevSecOps Actions - Source Code

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![Jest](https://img.shields.io/badge/Jest-30.2.0-red)](https://jestjs.io/)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](../LICENSE)

TypeScript source code for the DevSecOps Actions CLI tool.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Quick Start](#-quick-start)
- [Directory Structure](#️-directory-structure)
- [Architecture](#️-architecture)
- [API Documentation](#-api-documentation)
  - [CLI Module](#️-cli-module)
- [Development](#️-development)
  - [Prerequisites](#prerequisites)
  - [Local Setup](#local-setup)
  - [Running Locally](#running-locally)
- [Testing](#-testing)
  - [Running Tests](#running-tests)
  - [Test Coverage](#test-coverage)
  - [Writing Tests](#writing-tests)
- [Building](#-building)
- [Code Quality](#-code-quality)
- [Troubleshooting](#-troubleshooting)
- [Performance](#-performance)
- [Security](#-security)
- [Contributing](#-contributing)
- [Changelog](#-changelog)
- [License](#-license)
- [Support](#-support)

---

## 📖 Overview

This directory contains the TypeScript source code for the **DevSecOps Actions CLI tool**, a command-line interface designed to
perform security scanning operations for container images and other DevSecOps workflows.

**Key Features:**

- 🔍 **Container Image Scanning** - SBOM generation for Docker images
- 🛡️ **Security Analysis** - Comprehensive vulnerability detection
- 🎯 **Type-Safe** - Full TypeScript implementation with strict typing
- ✅ **Tested** - Comprehensive unit test coverage
- 📦 **Modular** - Clean separation of concerns and reusable components

The codebase follows industry best practices with modular architecture, comprehensive error handling, and extensive test coverage.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run the CLI tool
npm run scan -- --images sources.json

# Run tests
npm run test:unit

# Run all validations
npm run validate:all

# Run individual validations
npm run lint:ts           # ESLint checks
npm run validate:ts       # TypeScript type checking
npm run validate:yml      # YAML linting
npm run validate:md       # Markdown linting
npm run validate:renovate # Renovate config validation
npm run spellcheck        # Spell checking
```

---

## 🗂️ Directory Structure

```bash
src/
├── cli/                     # Command-line interface modules
│   ├── scan.ts             # Main scan command implementation
│   ├── scan.test.ts        # Unit tests for scan command
│   └── index.ts            # CLI exports
├── helpers/                # Utility functions and helpers
│   ├── execute.ts          # Command execution logic
│   ├── execute.test.ts     # Unit tests for execute
│   ├── get-arguments.ts    # Command-line argument parser
│   ├── get-arguments.test.ts
│   ├── get-array-from-json.ts  # JSON array extractor
│   ├── get-array-from-json.test.ts
│   ├── get-command.ts      # Command builder utility
│   ├── get-command.test.ts
│   ├── valid-argument.ts   # Argument validation
│   ├── valid-argument.test.ts
│   └── index.ts            # Helper exports
├── scripts/                # Build and installation scripts
│   └── syft.sh            # Syft SBOM tool installer
├── index.ts                # Main entry point
├── tsconfig.json           # TypeScript configuration
└── unit.jest.config.ts     # Jest test configuration
```

---

## 🏗️ Architecture

### Design Principles

The codebase adheres to industry-standard software engineering principles:

1. **🎯 Modular Design** - Clear separation between CLI logic (`cli/`) and utility functions (`helpers/`)
2. **🔒 Type Safety** - Full TypeScript implementation with strict type checking enabled
3. **✅ Testability** - Each module has comprehensive unit tests with high coverage
4. **⚠️ Error Handling** - Robust error handling with descriptive error messages
5. **📦 Single Responsibility** - Each module has a single, well-defined purpose
6. **🔄 Dependency Injection** - Loose coupling between components for better maintainability

### Data Flow

```bash
index.ts (entry point)
    ↓
cli/scan.ts (command orchestrator)
    ↓
    ├── helpers/get-arguments.ts    # Parse CLI arguments
    ├── helpers/valid-argument.ts   # Validate argument format
    ├── helpers/get-array-from-json.ts  # Extract data from JSON
    ├── helpers/get-command.ts      # Build execution command
    └── helpers/execute.ts          # Execute shell command
```

### Technology Stack

| Technology | Version | Purpose                              |
| ---------- | ------- | ------------------------------------ |
| TypeScript | 5.9.3   | Primary language for type safety     |
| Node.js    | 18+     | Runtime environment                  |
| Jest       | 30.2.0  | Testing framework                    |
| ts-node    | 10.9.2  | TypeScript execution for development |
| ts-jest    | 29.4.6  | TypeScript transformer for Jest      |

---

## 📚 API Documentation

### 🖥️ CLI Module

### Scan Command

The `scan` command performs security scanning operations on container images and generates SBOMs (Software Bill of Materials).

#### Usage

```bash
npm run scan -- --images <json-file>
```

#### Arguments

| Position | Argument      | Type   | Description                              | Required |
| -------- | ------------- | ------ | ---------------------------------------- | -------- |
| 1        | `--images`    | flag   | Scan type indicator for container images | ✅ Yes   |
| 2        | `<json-file>` | string | Path to JSON file containing image URIs  | ✅ Yes   |

#### JSON File Format

```json
{
  "images": ["ghcr.io/org/image:tag1", "ghcr.io/org/image:tag2"]
}
```

#### Examples

```bash
# Scan container images from sources.json
npm run scan -- --images sources.json

# Scan with custom path
npm run scan -- --images /path/to/docker-images.json
```

#### Exit Codes

| Code | Description                                    |
| ---- | ---------------------------------------------- |
| 0    | Success - All scans completed successfully     |
| 1    | Failure - Invalid arguments or execution error |

#### Error Handling

The scan command validates:

- ✅ Correct number of arguments (exactly 2)
- ✅ Valid argument format (`--images` flag)
- ✅ Valid JSON structure with `images` array
- ✅ Successful command execution
- ✅ Readable file paths

All errors are logged with descriptive messages to help diagnose issues quickly.

---

## 🛠️ Development

### Prerequisites

Ensure you have the following installed:

| Tool                                          | Minimum Version | Purpose               |
| --------------------------------------------- | --------------- | --------------------- |
| [Node.js](https://nodejs.org/)                | 18.x            | JavaScript runtime    |
| [npm](https://www.npmjs.com/)                 | 9.x             | Package manager       |
| [TypeScript](https://www.typescriptlang.org/) | 5.9.x           | Type-safe development |
| [Git](https://git-scm.com/)                   | 2.x             | Version control       |

### Local Setup

```bash
# Clone the repository (if not already done)
git clone https://github.com/ministryofjustice/devsecops-actions.git
cd devsecops-actions

# Install all dependencies
npm install

# Verify installation
npm run validate:ts
```

### Running Locally

```bash
# Run the CLI tool
npm run scan -- --images sources.json

# Run with custom file path
npm run scan -- --images /absolute/path/to/images.json
```

#### Building the Project

The `npm run build` command compiles TypeScript source files to JavaScript and prepares the project for distribution:

```bash
# Build the project
npm run build
```

This command performs the following operations:

- 🔨 **TypeScript Compilation** - Compiles all `.ts` files in `src/` to JavaScript
- 📦 **Output Generation** - Creates compiled files in the `src/dist/` directory
- 🗺️ **Source Maps** - Generates source map files for debugging
- 📝 **Type Declarations** - Creates `.d.ts` files for TypeScript consumers

**When to Build:**

- ✅ Before committing changes to ensure code compiles successfully
- ✅ When preparing for production deployment
- ✅ After major refactoring to verify no compilation errors

### Project Structure Conventions

- **File Naming**: Use kebab-case for files (e.g., `get-arguments.ts`)
- **Test Files**: Place tests next to source files with `.test.ts` suffix
- **Exports**: Use named exports (avoid default exports)
- **Imports**: Use absolute paths from `src/` root where applicable

### TypeScript Configuration

The project uses strict TypeScript configuration (`tsconfig.json`):

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  }
}
```

**Key Settings:**

- ✅ Strict null checks enabled
- ✅ No implicit any types
- ✅ Strict function types
- ✅ JSON module resolution

### Environment Variables

Currently, the CLI does not require environment variables. All configuration is passed via command-line arguments or JSON files.

---

## 🧪 Testing

### Running Tests

```bash
# Run all unit tests
npm run test:unit

# Run tests with coverage report
npm run test:unit:coverage

# Run tests in watch mode (for development)
npx jest --watch --config=src/unit.jest.config.ts

# Run specific test file
npx jest src/cli/scan.test.ts
```

### Test Coverage

The project maintains high test coverage standards:

| Metric     | Target | Current                                 |
| ---------- | ------ | --------------------------------------- |
| Statements | ≥ 80%  | Check with `npm run test:unit:coverage` |
| Branches   | ≥ 80%  | Check with `npm run test:unit:coverage` |
| Functions  | ≥ 80%  | Check with `npm run test:unit:coverage` |
| Lines      | ≥ 80%  | Check with `npm run test:unit:coverage` |

**View Coverage Report:**

```bash
npm run test:unit:coverage
# Open coverage/lcov-report/index.html in browser
```

### Test Structure

Tests follow a consistent pattern using Jest:

```typescript
describe("Module Name", () => {
  describe("function name", () => {
    it("should handle success case", () => {
      // Arrange
      const input = "test";

      // Act
      const result = functionUnderTest(input);

      // Assert
      expect(result).toBe(expected);
    });

    it("should handle error case", () => {
      expect(() => functionUnderTest(null)).toThrow();
    });
  });
});
```

**Testing Principles:**

- ✅ **Unit Testing** - Each function tested in isolation
- ✅ **Edge Cases** - Cover success, failure, and boundary conditions
- ✅ **Mocking** - External dependencies properly mocked
- ✅ **Deterministic** - Tests produce consistent results
- ✅ **Fast** - Tests complete in under 10 seconds

### Writing Tests

When adding new functionality, follow these guidelines:

1. **Create Test File** - Add `*.test.ts` file alongside source file
2. **Test Public API** - Test all exported functions
3. **Cover Edge Cases** - Include success, failure, and boundary scenarios
4. **Mock Dependencies** - Use Jest mocks for external dependencies
5. **Descriptive Names** - Use clear test descriptions
6. **Arrange-Act-Assert** - Follow AAA pattern for clarity

**Example Test:**

```typescript
import { areImageArgumentsValid } from "./valid-image-arguments";

describe("areImageArgumentsValid", () => {
  it("should return true for valid arguments", () => {
    const result = areImageArgumentsValid(["--images", "sources.json"]);
    expect(result).toBe(true);
  });

  it("should return false when missing arguments", () => {
    const result = areImageArgumentsValid(["--images"]);
    expect(result).toBe(false);
  });
});
```

---

## 🔨 Building

### TypeScript Compilation

```bash
# Type check without emitting files (fast validation)
npm run validate:ts

# Compile TypeScript to JavaScript
npx tsc --project src/tsconfig.json

# Watch mode for continuous compilation
npx tsc --project src/tsconfig.json --watch
```

**Build Output:**

- Compiled JavaScript files follow the same directory structure as source
- Source maps generated for debugging
- Type declaration files (`.d.ts`) created for library usage

### Development Workflow

The project uses `ts-node` for direct TypeScript execution during development:

```bash
# Development (uses ts-node)
npm run scan -- --images sources.json

# Production (compile first, then run)
npx tsc && node dist/index.js --images sources.json
```

---

## ✨ Code Quality

### Linting & Formatting

```bash
# Validate all code
npm run validate:all

# ESLint checks
npm run lint:ts

# TypeScript type checking
npm run validate:ts

# YAML linting
npm run validate:yml

# Markdown linting
npm run validate:md

# Renovate config validation
npm run validate:renovate

# Spell checking
npm run spellcheck
```

### Code Style Guidelines

**TypeScript:**

- Use `const` and `let` (never `var`)
- Prefer arrow functions for callbacks
- Use explicit types for function parameters and returns
- Avoid `any` type unless absolutely necessary
- Use meaningful variable names (avoid single-letter names except loop counters)

**Documentation:**

- Add JSDoc comments for all exported functions
- Include `@param`, `@returns`, `@throws` tags
- Document complex logic with inline comments
- Keep comments up-to-date with code changes

**Error Handling:**

- Use specific error types
- Include context in error messages
- Log errors with appropriate severity levels
- Clean up resources in `finally` blocks

**Example:**

```typescript
/**
 * Validates command-line arguments for the scan command.
 * @param args - Array of command-line arguments
 * @returns True if arguments are valid, false otherwise
 */
export function areImageArgumentsValid(args: string[]): boolean {
  if (args.length !== 2) {
    return false;
  }
  return args[0].startsWith("--") && args[1].length > 0;
}
```

### Pre-commit Hooks

Install pre-commit hooks for automated checks:

```bash
# Install MoJ DevSecOps hooks
prek install
```

Hooks run automatically on commit:

- ✅ TypeScript type checking
- ✅ Secret scanning
- ✅ Markdown linting
- ✅ Spell checking

---

## 🔍 Troubleshooting

### Common Issues

Issue: Module not found errors

```bash
# Solution: Clean install dependencies
rm -rf node_modules package-lock.json
npm install
```

Issue: TypeScript compilation errors

```bash
# Solution: Check TypeScript version
npx tsc --version

# Reinstall TypeScript
npm install --save-dev typescript@latest
```

Issue: Test failures

```bash
# Solution: Clear Jest cache
npx jest --clearCache

# Run tests with verbose output
npm run test:unit -- --verbose
```

Issue: Permission denied when running scan

```bash
# Solution: Check file permissions
chmod +x src/scripts/syft.sh

# Install Syft manually
npm run install:syft
```

---

## ⚡ Performance

### Optimization Tips

**For Large JSON Files:**

- Stream large files instead of loading entirely into memory
- Process images in batches
- Use async/await properly to avoid blocking

**For Multiple Scans:**

- Run scans in parallel where possible
- Cache intermediate results
- Reuse connections and resources

### Benchmarks

Typical performance metrics:

| Operation        | Duration | Notes               |
| ---------------- | -------- | ------------------- |
| Argument parsing | < 1ms    | Near instant        |
| JSON validation  | < 10ms   | For files < 1MB     |
| SBOM generation  | 10-60s   | Per container image |
| Test suite       | < 10s    | Full test run       |

---

## 🔐 Security

### Security Best Practices

This project follows security best practices:

- ✅ **No Secrets in Code** - Never commit credentials or tokens
- ✅ **Input Validation** - All user inputs are validated and sanitized
- ✅ **Dependency Scanning** - Regular automated dependency vulnerability scans
- ✅ **Least Privilege** - Minimal permissions requested
- ✅ **Secret Scanning** - Pre-commit hooks detect exposed secrets

### Vulnerability Reporting

If you discover a security vulnerability:

1. **DO NOT** create a public GitHub issue
2. Email the security team privately
3. Include detailed reproduction steps
4. Allow time for assessment and patch development

### Security Updates

- Dependencies updated automatically via Renovate bot
- Security patches applied with high priority
- SBOM generated for supply chain transparency

---

## 🤝 Contributing

We welcome contributions! To contribute to this codebase:

### Contribution Workflow

1. **Fork & Clone**

   ```bash
   git clone https://github.com/your-username/devsecops-actions.git
   cd devsecops-actions
   ```

2. **Create Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**

   - Write clean, tested code
   - Follow existing code style
   - Add tests for new functionality
   - Update documentation

4. **Run Validations**

   ```bash
   npm run validate:all
   npm run test:unit:coverage
   ```

5. **Commit Changes**

   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

   Follow [Conventional Commits](https://www.conventionalcommits.org/) format

6. **Push & Create PR**

Ensure you have installed MoJ [pre-commit](https://github.com/ministryofjustice/devsecops-hooks) hook.

```bash
git push origin feature/your-feature-name
```

Create pull request on GitHub

### Contribution Guidelines

**Code Requirements:**

- ✅ All functions must have TypeScript types
- ✅ Add JSDoc comments for exported functions
- ✅ Write unit tests (aim for 80%+ coverage)
- ✅ Follow existing code structure
- ✅ Pass all validation checks
- ✅ No linting errors

**Commit Message Format:**

```bash
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Example:**

```bash
feat(cli): add support for SBOM format selection

Added --format flag to allow users to choose between
CycloneDX and SPDX SBOM formats.

Closes #123
```

### Pull Request Process

1. Ensure all tests pass
2. Update documentation if needed
3. Request review from maintainers (PandA team)
4. Address review feedback
5. Await approval and merge

### Code Review Checklist

Reviewers will check:

- [ ] Code follows project conventions
- [ ] Tests are comprehensive
- [ ] Documentation is updated
- [ ] No security vulnerabilities introduced
- [ ] Performance impact considered
- [ ] Backward compatibility maintained

---

## 📜 Changelog

See [CHANGELOG.md](../CHANGELOG.md) for detailed version history and release notes.

**Recent Updates:**

- Release management via Release Please
- Automated changelog generation
- Semantic versioning (SemVer)

---

## 📄 License

This project is licensed under the **MIT License**.

```txt
MIT License

Copyright (c) 2026 Ministry of Justice

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

See [LICENSE](../LICENSE) for full license text.

---

## 📞 Support

### Getting Help

- 📖 **Documentation**: Read this README and parent [README](../README.md)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/ministryofjustice/devsecops-actions/issues)
- 🔧 **Feature Requests**: [GitHub Issues](https://github.com/ministryofjustice/devsecops-actions/issues)

### Maintainers

This project is maintained by the **Ministry of Justice PandA Team**.

**Author:** Abhi Markan

### Links

- 🏠 [Homepage](https://github.com/ministryofjustice/devsecops-actions)
- 📦 [Releases](https://github.com/ministryofjustice/devsecops-actions/releases)
- 📊 [OpenSSF Scorecard](https://scorecard.dev/viewer/?uri=github.com/ministryofjustice/devsecops-actions)

---

<div align="center">

**⭐ Star us on GitHub — it helps!**

Made with ❤️ by the Ministry of Justice UK

[Report Bug](https://github.com/ministryofjustice/devsecops-actions/issues)
[Request Feature](https://github.com/ministryofjustice/devsecops-actions/issues)
[View Changelog](../CHANGELOG.md)

</div>
