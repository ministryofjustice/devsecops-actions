# GitHub Copilot Instructions

## Language and Spelling

- Use British English spelling and grammar in all code comments, documentation, and string literals
- Examples: "colour" not "color", "behaviour" not "behavior", "initialise" not "initialize", "organise" not "organize"

## Project Context

- This is a DevSecOps GitHub Actions repository for the Ministry of Justice UK
- Primary purpose: Enterprise-grade reusable security scanning actions (SCA, SAST, secret scanning, SBOM generation)
- Target audience: Government and enterprise teams requiring security compliance

## Code Style and Standards

### TypeScript

- Use TypeScript with strict type checking
- Follow module pattern with explicit exports
- Include JSDoc comments for all functions with `@fileoverview`, `@module`, `@param`, `@returns`, `@throws`, and `@example` tags
- Use `.ts` file extensions (not `.js`)
- Prefer descriptive function and variable names

### GitHub Actions

- All action definitions use `action.yml` (not `action.yaml`)
- Include comprehensive header comments with copyright, description, features, usage, prerequisites, and version information
- Pin all action dependencies to specific commit SHAs (not tags or branches) for security
- Follow Ministry of Justice UK naming convention in action metadata
- Structure composite actions with clear step names using emoji prefixes (e.g., 📦, 🔍, 🔑)

### YAML Files

- Use 2-space indentation
- Include descriptive comments for configuration sections
- Follow the existing patterns for renovate.json, pre-commit hooks, and workflow files

## Security Practices

- Never hardcode tokens or secrets
- Always use SHA-pinned versions for GitHub Actions (e.g., `@9babea875cafae0e3b05a5ec5aca76d6b560c42e`)
- Include explicit permissions in workflow examples (principle of least privilege)
- Validate all inputs and provide clear error messages

## Documentation

- Keep line length under 160 characters for markdown files
- Use emoji consistently in headings and action names (e.g., 🔐, ⚡️, 📦)
- Include practical examples with both minimal and production configurations
- Follow the existing README structure: Overview, Architecture, Available Actions, Usage Examples, Development, Contributing

## Commit Messages

- Follow Conventional Commits specification
- Use semantic commit types: `feat`, `fix`, `docs`, `refactor`, `perf`, `test`, `chore`, `ci`
- Format: `<type>(<scope>): <subject>` (e.g., `feat(sca): add support for custom SBOM formats`)

## Testing and Validation

- Ensure all code passes existing validation scripts: `validate:ts`, `validate:yml`, `validate:md`, `spellcheck`
- Add new technical terms to `cspell.json` words array when necessary
- Follow existing test patterns using Jest for TypeScript files
