#!/usr/bin/env bash

# Configure git to use the committed .githooks/ directory for hooks.
# Run this once after cloning the repository.

REPO_ROOT="$(git rev-parse --show-toplevel)"
git config core.hooksPath "$REPO_ROOT/.githooks"
echo "✅ Git hooks configured. Using .githooks/ directory."

if command -v gitleaks &>/dev/null; then
    echo "✅ gitleaks is installed. Secrets will be scanned on commit."
else
    echo ""
    echo "❌ gitleaks is required. Commits will be blocked without it."
    echo ""
    echo "Install gitleaks:"
    echo ""
    echo "  brew install gitleaks"
    echo ""
    exit 1
fi
