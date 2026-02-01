const bcrypt = require("bcryptjs");
const prisma = require("../prismaClient.js");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const {email, username, password} = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({error: "Email and password are required"});
        }

        const existingUser = await prisma.user.findUnique({
            where: {email},
        });

        if (existingUser) {
            return res
                .status(409)
                .json({error: "User with this email already exists"});
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const user = await prisma.user.create({
            data: {
                email,
                username: username || null,
                role: "user",
                password: hashedPassword,
            },
            select: {
                id: true,
                email: true,
                username: true,
                createdAt: true,
            },
        });
        res.status(201).json({message: "User successfully created", user});
    } catch (err) {
        console.log("Registration error", err);
        res.status(500).json({error: "Internal server error"});
    }
};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({error: "Email and password are required"});
        }

        const user = await prisma.user.findUnique({
            where: {email},
        });

        if (!user) {
            return res.status(401).json({error: "invalid email or password"});
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({error: "Invalid email or password"});
        }

        if (user.token !== null) {

        } else {
            const token = jwt.sign({
                userId: user.id,
                device: req.headers["sec-ch-ua-platform"]
            }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN || "7d",
            });

            await prisma.user.update({
                where: {email: user.email},
                data: {
                    token: token,
                }
            })

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
        }


        res.json({
            message: "Login successful",
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
            },
            code: 200,
        });
    } catch (err) {
        console.log("Login error", err);
        res.status(500).json({error: "Internal server error"});
    }
};

const changeUserName = async (req, res) => {
    try {
        const {newName} = req.body;
        const userId = req.userId;

        if (!newName) {
            return res.status(400).json({error: "New name is required"});
        }

        const updatedUser = await prisma.user.update({
            where: {id: userId},
            data: {username: newName},
            select: {
                id: true,
                email: true,
                username: true,
                role: true,
                createdAt: true,
            },
        });

        res.json({
            message: "User name changed successfully",
            user: updatedUser,
        });
    } catch (err) {
        console.log("User name change error", err);
        res.status(500).json({error: "Internal server error"});
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.userId;

        await prisma.user.delete({
            where: {id: userId},
        });

        res.json({
            message: "User deleted successfully",
        });
    } catch (err) {
        console.log("Delete user error", err);
        res.status(500).json({error: "Internal server error"});
    }
};

const refreshToken = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await prisma.user.findUnique({
            where: {id: userId},
        });

        res.json({
            message: "Token refreshed successfully",
            user: user,
        });
    } catch (err) {
        console.log("Refresh token error", err);
        res.status(500).json({error: "Internal server error"});
    }
};

const getUserById = async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                username: true,
            },
        });
        res.json({
            massage: "Users got successfully",
            user: user,
        });
    } catch (err) {
        console.log("Users get error", err);
        res.status(500).json({error: "Internal server error"});
    }
};

module.exports = {
    register,
    login,
    changeUserName,
    deleteUser,
    refreshToken,
    getUserById,
};
