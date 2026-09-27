"""Serve the portfolio locally with Flask.

Run from this folder with:
    ../venv/Scripts/python.exe app.py
"""

from pathlib import Path

from flask import Flask, send_from_directory

PORTFOLIO_DIR = Path(__file__).resolve().parent
app = Flask(__name__, static_folder=None)


@app.get("/")
def home():
    return send_from_directory(PORTFOLIO_DIR, "index.html")


@app.get("/<path:filename>")
def portfolio_file(filename: str):
    return send_from_directory(PORTFOLIO_DIR, filename)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=False)