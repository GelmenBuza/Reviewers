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
};
