#!/usr/bin/env bash

# Configure git to use the committed .githooks/ directory for hooks.
# Run this once after cloning the repository.

REPO_ROOT="$(git rev-parse --show-toplevel)"
git config core.hooksPath "$REPO_ROOT/.githooks"
echo "✅ Git hooks configured. Using .githooks/ directory."

if command -v pre-commit &>/dev/null; then
    echo "✅ pre-commit is installed. Secrets will be scanned on commit."
else
    echo ""
    echo "❌ pre-commit is required. Commits will be blocked without it."
    echo ""
    echo "Install pre-commit:"
    echo ""
    echo "  pip install pre-commit"
    echo ""
    exit 1
fi
