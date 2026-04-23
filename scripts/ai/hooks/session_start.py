#!/usr/bin/env python3

import json
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[3]
TASKS_PATH = REPO_ROOT / ".agents" / "tasks" / "TASKS.md"


def collect_queue() -> list[str]:
    if not TASKS_PATH.exists():
        return []

    lines: list[str] = []
    for raw_line in TASKS_PATH.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line.startswith("- "):
            continue
        if "No shared queue entries" in line:
            continue
        lines.append(" ".join(line.split()))
    return lines[:5]


queue_summary = "; ".join(collect_queue()) or "No active task is recorded in .agents/tasks/TASKS.md."
context = (
    "sleeping-beauty quick context: shared AI repo standard lives in "
    "/Users/yutogasaki/Projects/_common-ai/PROJECTS_COMMON_AI_GUIDE.md. "
    "Read AGENTS.md, docs/index.md, docs/03_operating_system.md, and "
    ".agents/agent-guide.md early. Use docs/04_quality_and_verification.md "
    "for verify expectations, keep durable project knowledge in docs/, and keep "
    "shared operational state in .agents/. For frontend polish, pair "
    ".agents/skills/sleeping-beauty-ui-taste/SKILL.md with local gpt-tasteskill "
    "or taste-skill when available. Current queue: "
    f"{queue_summary}"
)

print(
    json.dumps(
        {
            "hookSpecificOutput": {
                "hookEventName": "SessionStart",
                "additionalContext": context,
            }
        }
    )
)
