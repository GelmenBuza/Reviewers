const BASE_URL = "/api/items";
import apiRequest from ".";

const getBaseHead = () => {
	return {
		"Content-Type": "application/json",
	};
};

export const useItemsApi = {
	getItems: async () => {
		const res = await fetch(`${BASE_URL}`, {
			method: "GET",
			headers: getBaseHead(),
		});
		if (!res.ok) {
			const error = await res.json();
			throw new Error(`Get items Error: ${error.message}`);
		}
		return res.json();
	},
	getItemById: async (id) => {
		try {
			const res = await fetch(`${BASE_URL}/${id}`, {
				headers: getBaseHead(),
			});
			if (res.ok) {
				return res.json();
			}
		} catch (e) {
			console.log(e);
		}
	},

	getSimilarItem: async (searchText) => {
		try {
			const res = await fetch(`${BASE_URL}/search`, {
				headers: getBaseHead(),
				body: JSON.stringify({ searchText }),
			});
			if (res.ok) {
				return res.json();
			}
		} catch (e) {
			console.log(e);
		}
	},
};
