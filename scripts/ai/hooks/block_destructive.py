#!/usr/bin/env python3

import json
import re
import sys


BLOCKED_PATTERNS = [
    (
        re.compile(r"(^|\s)sudo\s+rm\s+-rf\b"),
        "Blocked a recursive sudo rm command.",
    ),
    (
        re.compile(r"(^|\s)rm\s+-rf\s+/(?:\s|$)"),
        "Blocked `rm -rf /`.",
    ),
    (
        re.compile(r"\bmkfs(?:\.[A-Za-z0-9_+-]+)?\b"),
        "Blocked a filesystem formatting command.",
    ),
    (
        re.compile(r"\bdd\s+if=.*\bof=/dev/(?:r?disk|sd|nvme)\w*", re.IGNORECASE),
        "Blocked a raw disk write command.",
    ),
    (
        re.compile(r"(^|\s)git\s+reset\s+--hard(?:\s|$)"),
        "Blocked `git reset --hard`.",
    ),
]


def main() -> int:
    try:
        payload = json.load(sys.stdin)
    except json.JSONDecodeError:
        return 0

    command = payload.get("tool_input", {}).get("command", "")
    for pattern, reason in BLOCKED_PATTERNS:
        if pattern.search(command):
            print(
                json.dumps(
                    {
                        "hookSpecificOutput": {
                            "hookEventName": "PreToolUse",
                            "permissionDecision": "deny",
                            "permissionDecisionReason": (
                                f"{reason} Use a safer alternative or handle it outside Codex."
                            ),
                        }
                    }
                )
            )
            return 0
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
