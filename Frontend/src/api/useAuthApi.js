const BASE_URL = "http://localhost:3000/api/auth";

const getAuthHead = () => {
	const token = localStorage.getItem("token");
	return {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	};
};

const getBaseHead = () => {
	return {
		"Content-Type": "application/json",
	};
};

export const useUserApi = {
	login: async (email, password) => {
		const res = await fetch(`${BASE_URL}/login`, {
			method: "POST",
			headers: getBaseHead(),
			body: JSON.stringify({ email, password }),
		});
		if (!res.ok) {
			const error = await res.json();
			throw new Error(`Login Error: ${error.message}`);
		}
		return res.json();
	},
	register: async (email, username, password) => {
		const res = await fetch(`${BASE_URL}/register`, {
			method: "POST",
			headers: getBaseHead(),
			body: JSON.stringify({
				email,
				username,
				password,
			}),
		});
		if (!res.ok) {
			const error = await res.json();
			throw new Error(`Registration Error: ${error.message}`);
		}
		return res.json();
	},
	changeUserName: async (newName) => {
		const res = await fetch(`${BASE_URL}/changeUsername`, {
			method: "PATCH",
			headers: getBaseHead(),
			body: JSON.stringify({
				newName,
			}),
		});
		if (!res.ok) {
			const error = await res.json();
			throw new Error(`Change user name Error: ${error.message}`);
		}
		return res.json();
	},
	deleteUser: async () => {
		const res = await fetch(`${BASE_URL}/deleteUser`, {
			method: "DELETE",
			headers: getBaseHead(),
		});
		if (!res.ok) {
			const error = await res.json();
			throw new Error(`Delete user Error: ${error.message}`);
		}
		return res.json();
	},
	getUsers: async (id) => {
		const res = await fetch(`${BASE_URL}`, {
			headers: getBaseHead(),
		});
		if (!res.ok) {
			const error = await res.json();
			throw new Error(`Get users Error: ${error.message}`);
		}
		return res.json();
	},
};
