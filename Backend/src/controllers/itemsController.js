const { error } = require("console");
const prisma = require("../prismaClient.js");
const { normalize } = require("path");

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
		res.status(500).json({ error: "Failed to fetch items" });
	}
};

const getItemById = async (req, res) => {
	try {
		const itemId = parseInt(req.params.id);
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

const getSimilarItem = async (req, res) => {
	try {
		const searchText = req.params.searchText;
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

module.exports = { getItems, getItemById, getSimilarItem };
