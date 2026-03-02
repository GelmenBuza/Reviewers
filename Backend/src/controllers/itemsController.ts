import { Request, Response } from "express";
import prisma from "../prismaClient";
import { Item } from "@prisma/client";

declare global {
	namespace Express {
		interface Request {
			userId?: string;
		}
	}
}

const getItems = async (req: Request, res: Response): Promise<void> => {
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
		res.status(500).json({ error: "Failed to fetch items" });
	}
};

const getItemById = async (req: Request, res: Response): Promise<void> => {
	try {
		const itemId = req.params.id;
		const item = await prisma.item.findUnique({
			select: {
				id: true,
				title: true,
			},
			where: {
				id: itemId,
			},
		});
		res.json(item);
	} catch (err) {
		console.error("Error fetching item by id:", err);
		res.status(500).json({ error: "Failed to fetch item by id" });
	}
};

const getSimilarItem = async (req: Request, res: Response): Promise<void> => {
	try {
		const searchText = req.params.searchText as String;
		if (!searchText) {
			return res.status(400).json({ error: "Search text is required" });
		}
		const normalizedText = searchText.split("+").join(" ");

		const items = await prisma.item.findMany({
			select: {
				id: true,
				title: true,
			},
			where: {
				title: {
					contains: normalizedText,
					mode: "insensitive",
				},
			},
		});
		res.status(200).json({ items });
	} catch (err) {
		console.error("Error fetching similar item:", err);
		res.status(500).json({ error: "Failed to fetch similar item" });
	}
};

export { getItems, getItemById, getSimilarItem };
