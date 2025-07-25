from flask import Flask, render_template, jsonify, send_from_directory
import os

app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key")

# Serve static files from public directory
@app.route('/')
def index():
    return send_from_directory('public', 'login.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('public', filename)

# API Routes for development - matching the Express server functionality
@app.route('/api/users')
def get_users():
    users = [
        {
            'id': 1,
            'username': 'admin',
            'name': '시스템 관리자',
            'role': '최고관리자',
            'email': 'admin@simpleeye.com',
            'joinDate': '2024-01-15'
        },
        {
            'id': 2,
            'username': 'manager',
            'name': '김관리',
            'role': '관리자',
            'email': 'manager@simpleeye.com',
            'joinDate': '2024-02-20'
        },
        {
            'id': 3,
            'username': 'operator',
            'name': '이운영',
            'role': '운영자',
            'email': 'operator@simpleeye.com',
            'joinDate': '2024-03-10'
        }
    ]
    return jsonify(users)

@app.route('/api/port-usage')
def get_port_usage():
    port_usage = {
        'labels': ['1월', '2월', '3월', '4월', '5월', '6월'],
        'datasets': [
            {
                'label': '사용 중인 포트',
                'data': [65, 75, 80, 85, 78, 82],
                'backgroundColor': 'rgba(3, 52, 149, 0.7)',
                'borderColor': 'rgba(3, 52, 149, 1)',
                'borderWidth': 2
            },
            {
                'label': '사용 가능한 포트',
                'data': [35, 25, 20, 15, 22, 18],
                'backgroundColor': 'rgba(174, 228, 255, 0.7)',
                'borderColor': 'rgba(174, 228, 255, 1)',
                'borderWidth': 2
            }
        ]
    }
    return jsonify(port_usage)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)