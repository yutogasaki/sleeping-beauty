#!/usr/bin/env python3

from pathlib import Path
import runpy


SCRIPT_PATH = Path(__file__).resolve().parents[2] / "scripts" / "ai" / "hooks" / "session_start.py"

runpy.run_path(str(SCRIPT_PATH), run_name="__main__")
