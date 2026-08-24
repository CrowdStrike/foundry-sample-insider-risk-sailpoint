#!/usr/bin/env bash

# Configure git to use the committed .githooks/ directory for hooks.
# Run this once after cloning the repository.

REPO_ROOT="$(git rev-parse --show-toplevel)"
git config core.hooksPath "$REPO_ROOT/.githooks"
echo "✅ Git hooks configured. Using .githooks/ directory."

if command -v betterleaks &>/dev/null; then
    echo "✅ betterleaks is installed. Secrets will be scanned on commit."
else
    echo ""
    echo "❌ betterleaks is required. Commits will be blocked without it."
    echo ""
    echo "Install betterleaks:"
    echo ""
    echo "  brew install betterleaks"
    echo ""
    exit 1
fi
