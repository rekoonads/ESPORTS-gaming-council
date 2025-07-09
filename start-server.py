#!/usr/bin/env python3
"""
GameHub Local Server
Simple script to run the GameHub website locally
"""

import http.server
import socketserver
import webbrowser
import threading
import time
import os
import sys

PORT = 8000

class GameHubHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def log_message(self, format, *args):
        # Custom log format
        print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] {format % args}")

def open_browser():
    """Open the website in the default browser after a short delay"""
    time.sleep(1.5)
    webbrowser.open(f'http://localhost:{PORT}')

def main():
    """Main function to start the server"""
    print("🎮 GameHub - Starting Local Server")
    print("=" * 50)
    
    # Check if index.html exists
    if not os.path.exists('index.html'):
        print("❌ Error: index.html not found!")
        print("Please make sure you're running this script from the GameHub directory.")
        sys.exit(1)
    
    try:
        # Create server
        with socketserver.TCPServer(("", PORT), GameHubHandler) as httpd:
            print(f"🌐 Server running at: http://localhost:{PORT}")
            print(f"📁 Serving files from: {os.getcwd()}")
            print("\n🚀 Features available:")
            print("   • Homepage with hero section and latest content")
            print("   • Reviews page with filtering and sorting")
            print("   • Responsive design for all devices")
            print("   • Interactive search and navigation")
            print("   • Dark mode support")
            print("\n💡 Tips:")
            print("   • Use Ctrl+C to stop the server")
            print("   • Open generate-placeholders.html to create images")
            print("   • Try resizing your browser to test responsiveness")
            print("\n" + "=" * 50)
            
            # Open browser in a separate thread
            browser_thread = threading.Thread(target=open_browser, daemon=True)
            browser_thread.start()
            
            # Start serving
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n\n👋 Shutting down GameHub server...")
        print("Thanks for using GameHub!")
        
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Error: Port {PORT} is already in use!")
            print("Try closing other applications or use a different port.")
        else:
            print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()