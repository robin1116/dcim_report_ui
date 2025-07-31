from flask import Flask, render_template, jsonify, send_from_directory, request
import os
import json
from datetime import datetime, timedelta
import random

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
            'username': 'admin01',
            'name': '김관리',
            'role': '관리자',
            'notes': '시스템 총괄 관리자',
            'joinDate': '2024-01-15',
            'lastLogin': '2025-07-31 14:30'
        },
        {
            'id': 2,
            'username': 'manager02',
            'name': '이운영',
            'role': '관리자',
            'notes': 'DC 운영 담당',
            'joinDate': '2024-03-20',
            'lastLogin': '2025-07-31 13:15'
        },
        {
            'id': 3,
            'username': 'operator03',
            'name': '박모니터',
            'role': '운영자',
            'notes': '모니터링 전담',
            'joinDate': '2024-05-10',
            'lastLogin': '2025-07-31 12:45'
        },
        {
            'id': 4,
            'username': 'tech04',
            'name': '최기술',
            'role': '관리자',
            'notes': '기술 지원 담당',
            'joinDate': '2024-07-01',
            'lastLogin': '2025-07-30 18:20'
        },
        {
            'id': 5,
            'username': 'support05',
            'name': '정지원',
            'role': '운영자',
            'notes': '고객 지원팀',
            'joinDate': '2024-09-15',
            'lastLogin': '2025-07-29 16:10'
        }
    ]
    return jsonify(users)

@app.route('/api/users', methods=['POST'])
def create_user():
    user_data = request.get_json()
    # In production, this would save to database via Spring Boot
    print(f'Creating new user: {user_data}')
    return jsonify({'success': True, 'message': '사용자가 성공적으로 등록되었습니다.'})

@app.route('/api/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user_data = request.get_json()
    # In production, this would update in database via Spring Boot
    print(f'Updating user {user_id}: {user_data}')
    return jsonify({'success': True, 'message': '사용자 정보가 성공적으로 수정되었습니다.'})

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    # In production, this would delete from database via Spring Boot
    print(f'Deleting user: {user_id}')
    return jsonify({'success': True, 'message': '사용자가 성공적으로 삭제되었습니다.'})

# Power inquiry API
@app.route('/api/power-data')
def get_power_data():
    # Generate mock power data for the last 7 days
    start_date = datetime.now() - timedelta(days=7)
    data = []
    
    for i in range(168):  # 7 days * 24 hours
        timestamp = start_date + timedelta(hours=i)
        voltage = 220 + random.uniform(-10, 10)  # 210-230V
        current = 15 + random.uniform(-5, 10)    # 10-25A
        power = voltage * current / 1000         # Power = V*I/1000
        
        data.append({
            'timestamp': timestamp.isoformat(),
            'voltage': round(voltage, 1),
            'current': round(current, 2),
            'power': round(power, 3)
        })
    
    return jsonify(data)

# Fault inquiry API
@app.route('/api/fault-data')
def get_fault_data():
    fault_types = ['i_r', 'di1']
    levels = ['HH', 'H', '정상', '비정상']
    messages = [
        '임계값 HH : i_r, 현재값 95, 설정값 90',
        '임계값 H : i_r, 현재값 85, 설정값 80',
        '임계값 정상 : i_r, 현재값 95',
        '차단기 비정상',
        '차단기 정상'
    ]
    
    data = []
    base_timestamp = int(datetime.now().timestamp())
    
    for i in range(50):  # Generate 50 fault records
        timestamp = base_timestamp - (i * 3600)  # Every hour back
        data.append({
            'timestamp': str(timestamp),
            'dcu': random.randint(1, 10),
            'busway': random.randint(1, 5),
            'line': random.choice(['a', 'b', 'c']),
            'type': random.choice(fault_types),
            'level': random.choice(levels),
            'message': random.choice(messages)
        })
    
    return jsonify(data)

# Alarm threshold settings API
@app.route('/api/alarm-thresholds')
def get_alarm_thresholds():
    # Generate mock threshold data
    data = []
    
    for busway in range(1, 11):  # 10 busways
        for line in ['a', 'b', 'c']:
            # Current (I) thresholds
            data.append({
                'busway': busway,
                'line': line,
                'i_r_en': 'checked' if random.random() > 0.3 else 'unchecked',
                'i_r_hh': str(random.randint(90, 100)),
                'i_r_h': str(random.randint(80, 89)),
                'i_r_l': str(random.randint(10, 19)),
                'i_r_ll': str(random.randint(5, 9)),
                'i_s_en': 'checked' if random.random() > 0.3 else 'unchecked',
                'i_s_hh': str(random.randint(90, 100)),
                'i_s_h': str(random.randint(80, 89)),
                'i_s_l': str(random.randint(10, 19)),
                'i_s_ll': str(random.randint(5, 9)),
                'i_t_en': 'checked' if random.random() > 0.3 else 'unchecked',
                'i_t_hh': str(random.randint(90, 100)),
                'i_t_h': str(random.randint(80, 89)),
                'i_t_l': str(random.randint(10, 19)),
                'i_t_ll': str(random.randint(5, 9))
            })
    
    return jsonify(data)

@app.route('/api/voltage-thresholds')
def get_voltage_thresholds():
    # Generate mock voltage threshold data
    data = []
    
    for busway in range(1, 11):
        for line in ['a', 'b', 'c']:
            data.append({
                'busway': busway,
                'line': line,
                'v_r_en': 'checked' if random.random() > 0.3 else 'unchecked',
                'v_r_hh': str(random.randint(240, 250)),
                'v_r_h': str(random.randint(230, 239)),
                'v_r_l': str(random.randint(200, 209)),
                'v_r_ll': str(random.randint(190, 199)),
                'v_s_en': 'checked' if random.random() > 0.3 else 'unchecked',
                'v_s_hh': str(random.randint(240, 250)),
                'v_s_h': str(random.randint(230, 239)),
                'v_s_l': str(random.randint(200, 209)),
                'v_s_ll': str(random.randint(190, 199)),
                'v_t_en': 'checked' if random.random() > 0.3 else 'unchecked',
                'v_t_hh': str(random.randint(240, 250)),
                'v_t_h': str(random.randint(230, 239)),
                'v_t_l': str(random.randint(200, 209)),
                'v_t_ll': str(random.randint(190, 199))
            })
    
    return jsonify(data)

@app.route('/api/power-thresholds')
def get_power_thresholds():
    # Generate mock power threshold data
    data = []
    
    for busway in range(1, 11):
        for line in ['a', 'b', 'c']:
            data.append({
                'busway': busway,
                'line': line,
                'kw_r_en': 'checked' if random.random() > 0.3 else 'unchecked',
                'kw_r_hh': str(random.randint(180, 200)),
                'kw_r_h': str(random.randint(160, 179)),
                'kw_r_l': str(random.randint(20, 39)),
                'kw_r_ll': str(random.randint(10, 19)),
                'kw_s_en': 'checked' if random.random() > 0.3 else 'unchecked',
                'kw_s_hh': str(random.randint(180, 200)),
                'kw_s_h': str(random.randint(160, 179)),
                'kw_s_l': str(random.randint(20, 39)),
                'kw_s_ll': str(random.randint(10, 19)),
                'kw_t_en': 'checked' if random.random() > 0.3 else 'unchecked',
                'kw_t_hh': str(random.randint(180, 200)),
                'kw_t_h': str(random.randint(160, 179)),
                'kw_t_l': str(random.randint(20, 39)),
                'kw_t_ll': str(random.randint(10, 19))
            })
    
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)