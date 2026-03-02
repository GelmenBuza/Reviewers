import {Request, Response} from "express";
import bcrypt from "bcryptjs";
import prisma from "../prismaClient";
import jwt from "jsonwebtoken";
import { User } from '@prisma/client';

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

interface RegisterBody {
    email?: string;
    username?: string;
    password?: string;
}

interface RegisterRequest extends Request {
    body: RegisterBody;
}

interface LoginBody {
    email?: string;
    password?: string;
}

interface LoginRequest extends Request {
    body: LoginBody;
}

interface ChangeNameBody {
    newName?: string;
}

interface ChangeNameRequest extends Request {
    body: ChangeNameBody;
}

interface JwtPayload {
    userId: string;
    device?: string;
    iat?: number;
    exp?: number;
}

const register = async (req: RegisterRequest, res: Response): Promise<void> => {
    try {
        const {email, username, password} = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({error: "Email and password are required"});
        }

        const existingUser : User = await prisma.user.findUnique({
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

const login = async (req: LoginRequest, res: Response): Promise<void> => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .json({error: "Email and password are required"});
        }

        const user : User = await prisma.user.findUnique({
            where: {email},
        });

        if (!user) {
            return res.status(401).json({error: "Invalid email or password"});
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({error: "Invalid email or password"});
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET is not defined");
        }

        const AccessToken = jwt.sign(
            {
                userId: user.id,
                device: req.headers["sec-ch-ua-platform"],
            },
            jwtSecret,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "15m",
            },
        );
        const RefreshToken = jwt.sign(
            {
                userId: user.id,
            },
            jwtSecret,
            {
                expiresIn: "7d",
            },
        );

        await prisma.user.update({
            where: {id: user.id},
            data: {
                refreshToken: RefreshToken,
            },
        });

        res.cookie("refreshToken", RefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/api/auth/refreshToken",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({
            message: "Login successful",
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
            },
            AccessToken: AccessToken,
            code: 200,
        });
    } catch (err) {
        console.log("Login error", err);
        res.status(500).json({error: "Internal server error"});
    }
};

const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/api/auth/refreshToken",
        });
        res.json({status: 200});
    } catch {
        console.log("Logout error");
        res.status(500).json({error: "Internal server error"});
    }
};

const changeUserName = async (req: ChangeNameRequest, res: Response) : Promise<void> => {
    try {
        const {newName} = req.body;
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({error: 'Unauthorized'})
        }

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

const deleteUser = async (req: Request, res: Response) : Promise<void> => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({error: 'Unauthorized'})
        }

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

const refreshToken = async (req: Request, res: Response) : Promise<void> => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({error: "Authentication required"});
        }

        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined');
        }

        const decoded = jwt.verify(refreshToken, jwtSecret) as JwtPayload;
        req.userId = decoded.userId;

        const user = await prisma.user.findUnique({
            where: {id: req.userId},
            select: {
                id: true,
                username: true,
                email: true,
            },
        });
        if (!user) {
            return res.status(401).json({error: "User not found"});
        }

        const AccessToken = jwt.sign(
            {
                userId: user.id,
                device: req.headers["sec-ch-ua-platform"],
            },
            jwtSecret,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "15m",
            },
        );

        res.json({
            message: "Token refreshed successful",
            AccessToken,
            user,
            code: 200,
        });
    } catch (err) {
        console.log("Refresh token error", err);
        res.status(500).json({error: "Internal server error"});
    }
};

const getUserById = async (req: Request, res: Response) : Promise<void> => {
    try {
        const userId = req.params.id;
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
            message: "Users got successfully",
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
    logout,
    changeUserName,
    deleteUser,
    refreshToken,
    getUserById,
};
