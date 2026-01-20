const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const prisma = require('./prismaClient.js');
const authRoutes = require('./routes/authRoutes.js');
const reviewRoutes = require('./routes/reviewRoutes.js');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/review', reviewRoutes);

// Get
//      users
app.get('/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                username: true,
                role: true,
                createdAt: true,
            },
        });
        res.json(users);
    } catch (err) {
        console.error('Error fetching users:',err);
        res.status(500).json({error: 'Failed to fetch users'});
    }
});


// else
app.get('/', (req, res) => {
    res.json({status: 'ok'});
});



process.on('SIGINT', async () => {
    await prisma.$disconnect();
    console.log('Server shutdown');
    process.exit(0);
})

module.exports = app;