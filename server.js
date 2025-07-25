const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// API Routes for development
app.get('/api/users', (req, res) => {
    // Mock data for development - replace with actual Spring Boot API calls
    const users = [
        {
            id: 1,
            username: 'admin',
            name: '시스템 관리자',
            role: '최고관리자',
            email: 'admin@simpleeye.com',
            joinDate: '2024-01-15'
        },
        {
            id: 2,
            username: 'manager',
            name: '김관리',
            role: '관리자',
            email: 'manager@simpleeye.com',
            joinDate: '2024-02-20'
        },
        {
            id: 3,
            username: 'operator',
            name: '이운영',
            role: '운영자',
            email: 'operator@simpleeye.com',
            joinDate: '2024-03-10'
        }
    ];
    res.json(users);
});

app.post('/api/users', (req, res) => {
    const newUser = req.body;
    // In production, this would save to database via Spring Boot
    console.log('Creating new user:', newUser);
    res.json({ success: true, message: '사용자가 성공적으로 등록되었습니다.' });
});

app.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    // In production, this would update in database via Spring Boot
    console.log('Updating user:', userId, updatedUser);
    res.json({ success: true, message: '사용자 정보가 성공적으로 수정되었습니다.' });
});

app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    // In production, this would delete from database via Spring Boot
    console.log('Deleting user:', userId);
    res.json({ success: true, message: '사용자가 성공적으로 삭제되었습니다.' });
});

app.get('/api/port-usage', (req, res) => {
    // Mock port usage data for charts
    const portUsage = {
        labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
        datasets: [
            {
                label: '사용 중인 포트',
                data: [65, 75, 80, 85, 78, 82],
                backgroundColor: 'rgba(3, 52, 149, 0.7)',
                borderColor: 'rgba(3, 52, 149, 1)',
                borderWidth: 2
            },
            {
                label: '사용 가능한 포트',
                data: [35, 25, 20, 15, 22, 18],
                backgroundColor: 'rgba(174, 228, 255, 0.7)',
                borderColor: 'rgba(174, 228, 255, 1)',
                borderWidth: 2
            }
        ]
    };
    res.json(portUsage);
});

// Default route - redirect to login
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('페이지를 찾을 수 없습니다.');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 DCIM Admin Server running on http://0.0.0.0:${PORT}`);
    console.log(`📱 Access the application at: http://localhost:${PORT}`);
});
