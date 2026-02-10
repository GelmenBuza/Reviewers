const { error } = require("console");
const prisma = require("../prismaClient.js");

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

module.exports = { getItems, getItemById };
