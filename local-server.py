#!/usr/bin/env python3
"""
Dev-only live-reload server for the portfolio site.
Usage: python local-server.py [-p 8000] [--host 0.0.0.0] [path]
"""

import argparse
import os
import socket
import sys
from contextlib import closing
from livereload import Server

# Function to find the local IP address


def get_local_ip() -> str:
    with closing(socket.socket(socket.AF_INET, socket.SOCK_DGRAM)) as s:
        try:
            s.connect(("8.8.8.8", 80))
            return s.getsockname()[0]
        except OSError:
            return "127.0.0.1"


# Get the local IP address
ip_address = get_local_ip()
port = 8000
url = f"http://{ip_address}:{port}"

# Copy the URL to the clipboard


def copy_to_clipboard(text):
    """Try to copy *text* to the system clipboard.
    1. Use ``pyperclip`` if available.
    2. Native fall-backs: macOS ``pbcopy``, Windows ``clip``, Linux ``xclip``/``xsel``.
    Returns ``True`` on success, ``False`` otherwise.
    """
    try:
        import pyperclip  # noqa: WPS433 (runtime import)
        pyperclip.copy(text)
        return True
    except ImportError:
        # pyperclip not installed; try platform-specific fallbacks below
        pass
    except Exception:
        # pyperclip installed but failed (e.g. requires xclip on Linux)
        pass

    # macOS fallback using pbcopy
    if sys.platform == "darwin":
        try:
            import subprocess  # noqa: WPS433
            subprocess.run(["pbcopy"], input=text.encode("utf-8"), check=True)
            return True
        except Exception:
            pass

    # Windows fallback using clip command
    if sys.platform.startswith("win"):
        try:
            import subprocess  # noqa: WPS433
            subprocess.run(["clip"], input=text.encode("utf-8"), check=True)
            return True
        except Exception:
            pass

    # Linux/X11 fallback using xclip or xsel
    if sys.platform.startswith("linux"):
        try:
            import subprocess  # noqa: WPS433
            from shutil import which

            if which("xclip"):
                subprocess.run(["xclip", "-selection", "clipboard"], input=text.encode(), check=True)
                return True
            if which("xsel"):
                subprocess.run(["xsel", "--clipboard", "--input"], input=text.encode(), check=True)
                return True
        except Exception:
            pass

    return False


if copy_to_clipboard(url):
    print("(URL copied to clipboard)")
else:
    print("(Unable to copy URL to clipboard – install 'pyperclip' for full support)")

# Print the URL for the user and flush the output
print("\n" + "="*50)
print("Server started. Access your website at:")
print(url)  # Simple URL display
print("="*50 + "\n")
sys.stdout.flush()


# ----- Live‑reload server (replaces the old SimpleHTTP approach) -----
def start_live_reload_server(root_dir=".", port=8000):
    """Serve *root_dir* with automatic browser refresh on file changes."""
    server = Server()
    server.watch(root_dir)              # watch all files under root
    # Bind on all interfaces so phones/tablets on the same Wi‑Fi can reach it
    server.serve(host="0.0.0.0",
                 port=port,
                 root=root_dir,
                 restart_delay=0.3,
                 open_url_delay=None)   # don't auto‑open a browser tab
# --------------------------------------------------------------------


# Get the current working directory
cwd = os.getcwd()

# Change the directory to the project folder
os.chdir(cwd)
start_live_reload_server(root_dir=".", port=port)

def main() -> None:
    args = parse_cli()
    # start server …

if __name__ == "__main__":
    main()
