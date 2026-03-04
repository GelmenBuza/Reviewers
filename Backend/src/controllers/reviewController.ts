import { Request, Response } from "express";
import {prisma} from "../prismaClient";

// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken');

// declare global {
// 	namespace Express {
// 		interface Request {
// 			reviewId?: string;
// 		}
// 	}
// }

interface CreateBody {
	itemTitle?: string;
	title?: string;
	content?: string;
	rating?: string;
	images?: string;
}

interface CreateRequest {
	body: CreateBody;
	userId?: number;
}

interface UpdateBody {
	newTitle?: string;
	newContent?: string;
	newRating?: string;
	newImages?: string;
}

interface UpdateRequest extends Request {
	body: UpdateBody;
}

const create = async (req: CreateRequest, res: Response) => {
	try {
		const { itemTitle, title, content, rating, images } = req.body;

		// Валидация
		if (!title || !content || !rating) {
			return res
				.status(400)
				.json({ error: "Title, content and rating are required" });
		}
		const intRating = parseInt(rating);
		const authorId = req.userId;

		// Логика предмета
		let itemId;
		const existingItem = await prisma.item.findUnique({
			where: { title: itemTitle },
		});
		if (existingItem) {
			itemId = existingItem.id;
		} else {
			const newItem = await prisma.item.create({
				data: {
					title: itemTitle as string,
				},
			});
			itemId = newItem.id;
		}
        if (!authorId) return res.status(500).json({error: 'Author fetch error'})
        const imagesArray = Array.isArray(images) ? images : images ? [images] : [];

		// Создание отзыва
		const review = await prisma.review.create({
			data: {
				title,
				content,
				rating: intRating,
				images: imagesArray,
				authorId,
				ItemId: itemId,
			},
			select: {
				id: true,
				title: true,
				content: true,
				rating: true,
				images: true,
				authorId: true,
				createdAt: true,
			},
		});

		res.status(201).json({
			message: "Review successfully created",
			review,
		});
	} catch (err) {
		console.log("Review create error", err);
		res.status(500).json({ error: "Internal server error" });
	}
};

const updateReview = async (
	req: UpdateRequest,
	res: Response,
) => {
	try {
		const { newTitle, newContent, newRating, newImages } = req.body;
		const reviewId = parseInt(req.params.id as string);
        const imagesArray = Array.isArray(newImages) ? newImages : newImages ? [newImages] : [];
        const intRating = parseInt(newRating as string);

		if (!newTitle || !newContent || !newRating) {
			return res
				.status(400)
				.json({ error: "Title, content and rating are required" });
		}

		const updatedReview = await prisma.review.update({
			where: {
				id: reviewId,
				authorId: req.userId,
			},
			data: {
				title: newTitle,
				content: newContent,
				rating: intRating,
				images: imagesArray,
			},
			select: {
				id: true,
				title: true,
				content: true,
				rating: true,
				images: true,
				createdAt: true,
			},
		});

		res.json({
			message: "Review updated successfully",
			user: updatedReview,
		});
	} catch (err) {
		console.log("Review update error", err);
		res.status(500).json({ error: "Internal server error" });
	}
};

const deleteReview = async (req: Request, res: Response) => {
	try {
		const reviewId = parseInt(req.params.id as string);

		await prisma.review.delete({
			where: {
				id: reviewId,
				authorId: req.userId,
			},
		});

		res.json({
			message: "Review deleted successfully",
		});
	} catch (err) {
		console.log("Delete review error", err);
		res.status(500).json({ error: "Internal server error" });
	}
};

const getReviews = async (req: Request, res: Response) => {
	try {
		const reviews = await prisma.review.findMany({
			select: {
				id: true,
				title: true,
				content: true,
				rating: true,
				images: true,
				authorId: true,
				createdAt: true,
				ItemId: true,
			},
		});
		res.json(reviews);
	} catch (err) {
		console.error("Error fetching reviews:", err);
		res.status(500).json({ error: "Failed to fetch reviews" });
	}
};

const getReviewsByItemID = async (req: Request, res: Response) => {
	try {
		const itemId = parseInt(req.params.id as string);
		const review = await prisma.review.findMany({
			select: {
				id: true,
				title: true,
				content: true,
				rating: true,
				images: true,
				authorId: true,
				createdAt: true,
				ItemId: true,
			},
			where: {
				ItemId: itemId,
			},
		});
		res.status(200).json(review);
	} catch (err) {
		console.log("Error fetching reviews by item id:", err);
		res.status(500).json({ error: "Failed to fetch reviews" });
	}
};

export { create, updateReview, deleteReview, getReviews, getReviewsByItemID };
