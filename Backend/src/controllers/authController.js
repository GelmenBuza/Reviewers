const bcrypt = require('bcryptjs')
const prisma = require('../prismaClient.js')
const jwt = require('jsonwebtoken');

const register = async(req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({error: 'Email and password are required'});
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(409).json({error: 'User with this email already exists'});
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await prisma.user.create({
            data: {
                email,
                username: username || null,
                password: hashedPassword,
            },
            select: {
                id: true,
                email: true,
                username: true,
                createdAt: true,
            },
        });
        res.status(201).json({message: 'User successfully created', user});
    } catch (err) {
        console.log('Registration error', err);
        res.status(500).json({error: 'Internal server error'});
    }
}

const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({error: 'Email and password are required'});
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({error: 'invalid email or password'});
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({error: 'Invalid email or password'});
        }

        const token = jwt.sign(
            {userId: user.id},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN || '7d'},
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
            },
        });

    } catch (err) {
        console.log('Login error', err);
        res.status(500).json({error: 'Internal server error'});
    }
}

module.exports = {register, login};