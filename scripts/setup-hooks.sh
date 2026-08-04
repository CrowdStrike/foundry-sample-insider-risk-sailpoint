#!/usr/bin/env bash

# Configure git to use the committed .githooks/ directory for hooks.
# Run this once after cloning the repository.

REPO_ROOT="$(git rev-parse --show-toplevel)"
git config core.hooksPath "$REPO_ROOT/.githooks"
echo "✅ Git hooks configured. Using .githooks/ directory."

if command -v pre-commit &>/dev/null; then
    echo "✅ pre-commit is installed."
else
    echo ""
    echo "⚠️  pre-commit is not installed. Install it for local secret scanning:"
    echo ""
    echo "  pip install pre-commit   # OR: brew install pre-commit"
    echo ""
fi
