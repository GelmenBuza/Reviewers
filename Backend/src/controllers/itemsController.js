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
        res.status(500).json({error: "Failed to fetch reviews"});
    }
};

module.exports = {getItems};
