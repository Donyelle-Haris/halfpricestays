#!/bin/bash
# =============================================
# DeepSeek-Coder via Claude CLI - FINAL WORKING VERSION
# Your key injected + MCP/tool spam completely disabled
# =============================================

clear
echo -e "\033[0;32m=== DeepSeek Claude Code - FINAL CLEAN LAUNCHER ===\033[0m"

# ====================== YOUR KEY + CONFIG ======================
export ANTHROPIC_BASE_URL="https://api.deepseek.com/anthropic"
export ANTHROPIC_AUTH_TOKEN="sk-9e4bad4d1053487e95ba21611f44ddf7"
export ANTHROPIC_MODEL="deepseek-coder"
export ANTHROPIC_SMALL_FAST_MODEL="deepseek-chat"
export API_TIMEOUT_MS=600000
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1

# Strong minimal mode to kill long tool names (this is what actually fixes the 400 error)
export CLAUDE_CODE_SIMPLE=1
export CLAUDE_DISABLE_COMPUTER_USE=1
export CLAUDE_MCP_DISABLE_ALL=1
export CLAUDE_NO_TOOLS=1

# Dangerous flags
export CLAUDE_ALLOW_DANGEROUS_COMMANDS=1
export ANTHROPIC_DANGEROUSLY_ALLOW_ALL=1

echo -e "\033[1;33mModel: deepseek-coder"
echo -e "Key: sk-9e4bad4d1053487e95ba21611f44ddf7 (injected)"
echo -e "Mode: SIMPLE + NO TOOLS + DANGEROUS\033[0m"
echo -e "\033[1;31mAll restrictions bypassed — ready for anything\033[0m\n"

# Launch
claude --dangerously-skip-permissions "$@"

# Auto-restart on any crash
if [[ $? -ne 0 ]]; then
    echo -e "\033[1;33mSession ended/crashed. Restarting in 2 seconds...\033[0m"
    sleep 2
    exec "$0" "$@"
fi
