#!/usr/bin/env python3
"""
Simple HTTP server for Age Tracker web app
Run this script to serve the web version locally
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

# Configuration
PORT = 8000
DIRECTORY = Path(__file__).parent

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)
    
    def end_headers(self):
        # Add CORS headers for web app
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def main():
    # Change to the web directory
    os.chdir(DIRECTORY)
    
    # Create server
    with socketserver.TCPServer(("0.0.0.0", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"🚀 Age Tracker Web App Server")
        print(f"📁 Serving from: {DIRECTORY}")
        print(f"🌐 URL: http://localhost:{PORT}")
        print(f"📱 PWA ready - can be installed on mobile devices")
        print(f"⏹️  Press Ctrl+C to stop the server")
        print("-" * 50)
        
        # Open browser automatically
        try:
            webbrowser.open(f'http://localhost:{PORT}')
        except:
            pass
        
        # Start server
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Server stopped. Goodbye!")

if __name__ == "__main__":
    main() 