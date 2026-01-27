const prisma = require("../prismaClient.js");

// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken');

const create = async (req, res) => {
	try {
		const { itemTitle, title, content, rating, images } = req.body;
		const authorId = req.userId;
		console.log("----------------------");
		console.log("Cookies:", req.cookies);
		console.log("Header:", req.headers);
		console.log("Cookies header:", req.headers.cookies);
		// Валидация
		if (!title || !content || !rating) {
			return res
				.status(400)
				.json({ error: "Title, content and rating are required" });
		}

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
					title: itemTitle,
				},
			});
			itemId = newItem.id;
		}

		// Создание отзыва
		const review = await prisma.review.create({
			data: {
				title,
				content,
				rating,
				images: images || [],
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

const updateReview = async (req, res) => {
	try {
		const { newTitle, newContent, newRating, newImages } = req.body;
		const reviewId = parseInt(req.params.id);

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
				rating: newRating,
				images: newImages,
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

const deleteReview = async (req, res) => {
	try {
		const reviewId = parseInt(req.params.id);

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

const getItems = async (req, res) => {
	try {
		const items = await prisma.item.findMany({
			select: {
				id: true,
				title: true,
			},
		});
		res.json(items);
	} catch (err) {
		console.error("Error fetching items:", err);
		res.status(500).json({ error: "Failed to fetch reviews" });
	}
};

const getReviews = async (req, res) => {
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

module.exports = { create, updateReview, deleteReview, getItems, getReviews };
