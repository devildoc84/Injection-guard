# Security Policy

## Reporting a vulnerability

Report bugs in the extension itself (for example, a way for a page to disable the scanner, hide findings, or run script in the popup) through GitHub's private vulnerability reporting on this repo: **Security** tab, then **Report a vulnerability**. Please do not open a public issue for these.

Missed injections and false positives are not vulnerabilities. Use the "Report a new prompt injection" issue template for those.

## Threat model for rule updates

- Rules are JSON data. The extension never downloads or runs remote code.
- Downloaded rules must pass schema validation, stay under 200 KB, compile as regular expressions, and carry a higher revision number.
- Anyone with write access to the repo's `main` branch controls the rules every installed copy receives. Protect `main` with branch protection and required reviews.
- A bad rule causes false positives or slow scanning, not code execution. CI rejects patterns that run slow on long input.
