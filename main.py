import webview
import os

current_dir = os.path.dirname(os.path.abspath(__file__))
html_path = os.path.join(current_dir, "index.html")

webview.create_window(
    "Love",
    html_path,
    width=900,
    height=700,
    resizable=False
)

webview.start()
