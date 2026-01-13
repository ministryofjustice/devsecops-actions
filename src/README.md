# 🔧 Source Code Directory

TypeScript source code for the DevSecOps Actions CLI tool.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Directory Structure](#️-directory-structure)
- [Architecture](#️-architecture)
- [CLI Module](#️-cli-module)
- [Helper Functions](#-helper-functions)
- [Development](#️-development)
- [Testing](#-testing)
- [Building](#-building)

---

## 📖 Overview

This directory contains the TypeScript source code for the DevSecOps Actions CLI tool.
The CLI provides scanning functionality for various DevSecOps operations, including image scanning and security analysis.

The codebase follows a modular architecture with clear separation of concerns between command-line interface logic and helper utilities.

---

## 🗂️ Directory Structure

```bash
src/
├── cli/                    # Command-line interface modules
│   ├── scan.ts            # Main scan command implementation
│   ├── scan.test.ts       # Unit tests for scan command
│   └── index.ts           # CLI exports
├── helpers/               # Utility functions and helpers
│   ├── execute.ts         # Command execution logic
│   ├── execute.test.ts    # Unit tests for execute
│   ├── get-arguments.ts   # Command-line argument parser
│   ├── get-arguments.test.ts
│   ├── get-command.ts     # Command builder utility
│   ├── get-command.test.ts
│   ├── is-valid-json.ts   # JSON validation utility
│   ├── is-valid-json.test.ts
│   ├── valid-argument.ts  # Argument validation
│   ├── valid-argument.test.ts
│   └── index.ts           # Helper exports
├── index.ts               # Main entry point
└── tsconfig.json          # TypeScript configuration
```

---

## 🏗️ Architecture

### Key Design Principles

1. **Modular Design**: Separation between CLI logic (`cli/`) and utility functions (`helpers/`)
2. **Type Safety**: Full TypeScript implementation with strict type checking
3. **Testability**: Each module has corresponding unit tests
4. **Error Handling**: Comprehensive error handling with clear error messages
5. **Separation of Concerns**: Single responsibility principle applied throughout

### Module Dependencies

```bash
index.ts (entry point)
    ↓
cli/scan.ts
    ↓
helpers/
    ├── get-arguments.ts    # Parses command-line arguments
    ├── valid-argument.ts   # Validates argument structure
    ├── is-valid-json.ts    # Validates JSON input
    ├── get-command.ts      # Builds execution commands
    └── execute.ts          # Executes commands
```

---

## 🖥️ CLI Module

### Scan Command

The `scan` command is the primary CLI functionality that performs security scanning operations.

#### Usage

```bash
npm run scan -- --images source.json
```

#### Arguments

| Position | Argument   | Description                           | Required |
| -------- | ---------- | ------------------------------------- | -------- |
| 1        | `--images` | Scan type (currently supports images) | Yes      |
| 2        | `source`   | Path to JSON file containing sources  | Yes      |

#### Example

```bash
# Scan container images from a JSON source file
npm run scan -- --images /path/to/images.json
```

#### Error Handling

The scan command validates:

- Correct number of arguments
- Valid argument format
- Valid JSON structure in source file
- Successful command execution

Errors are logged with detailed messages and appropriate exit codes.

---

## 🔧 Helper Functions

### getArguments

Parses command-line arguments from `process.argv`.

**Returns**: `string[]` - Array of command-line arguments (excluding node and script path)

### validateArguments

Validates the structure and format of command-line arguments.

**Parameters**:

- `args: string[]` - Array of arguments to validate

**Returns**: `boolean` - `true` if arguments are valid, `false` otherwise

### isValidJson

Validates and parses JSON from a file path provided in arguments.

**Parameters**:

- `args: string[]` - Array containing the file path as the second element

**Returns**: Parsed JSON object

**Throws**: Error if JSON is invalid or file cannot be read

### getCommand

Builds shell commands for execution based on the scan type.

**Parameters**:

- `type: string` - Type of scan to perform (e.g., `--images`)
- `values: any` - Parsed values from JSON source

**Returns**: `string` - Shell command to execute

### execute

Executes the constructed command and handles the result.

**Parameters**:

- `type: string` - Type of scan being performed
- `values: any` - Scan configuration values

**Returns**: `Promise<void>`

**Throws**: Error if execution fails

---

## 🛠️ Development

### Prerequisites

- [Node.js](https://nodejs.org/en) (version 18 or higher)
- [NPM](https://www.npmjs.com/)
- [TypeScript](https://www.typescriptlang.org/)

### Local Setup

```bash
# Install dependencies from project root
npm install

# Run the CLI tool
npm run scan -- --images source.json
```

### TypeScript Configuration

The TypeScript compiler is configured via `tsconfig.json` with strict type checking enabled. Key settings include:

- Target: ES2020 or higher
- Module: CommonJS
- Strict mode enabled
- Source maps for debugging

---

## 🧪 Testing

### Running Tests

```bash
# Run all unit tests
npm run test:unit

# Run tests with coverage
npm run test:unit:coverage
```

### Test Structure

Each module has a corresponding test file following the naming convention `*.test.ts`. Tests are written using Jest and follow these principles:

- **Unit Testing**: Each function is tested in isolation
- **Edge Cases**: Tests cover both success and failure scenarios
- **Mocking**: External dependencies are mocked appropriately
- **Coverage**: Aim for high test coverage of critical paths

### Writing Tests

When adding new functionality:

1. Create a corresponding `*.test.ts` file
2. Test all public functions
3. Cover edge cases and error conditions
4. Ensure tests are deterministic and isolated

---

## 🔨 Building

The source code is executed using `ts-node` for development. For production use, the code should be compiled to JavaScript.

### TypeScript Compilation

```bash
# Compile TypeScript to JavaScript
npx tsc

# Type check without emitting files
npx tsc --noEmit
```

### Code Quality

```bash
# Run all validation checks
npm run validate:all

# Spell check
npm run spellcheck
```

---

## 📝 Code Style

- **Language**: TypeScript with strict typing
- **Documentation**: JSDoc comments for all exported functions
- **Error Handling**: Use try-catch blocks with meaningful error messages
- **Naming**: Use descriptive names following camelCase convention
- **Exports**: Use named exports (not default exports)

---

## 🤝 Contributing

When contributing to this directory:

1. Ensure all functions have proper TypeScript types
2. Add JSDoc comments for exported functions
3. Write unit tests for new functionality
4. Follow the existing code structure and style
5. Run validation checks before committing

---

## 📄 License

This project is licensed under the MIT Licence - see the [LICENSE](../LICENSE) file for details.

---

Made with ❤️ by the Ministry of Justice UK
