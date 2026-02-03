const BASE_URL = "api/auth/refreshToken";

async function refreshToken() {
	const res = await fetch(`${BASE_URL}`, {
		method: "POST",
		credentials: "include",
	});
	return await res.json();
}

export default async function apiRequest(accessToken, url, req, attemps = 2) {
	try {
		let resp = await fetch(url, {
			...req,
			credentials: "include",
			headers: {
				...req.headers,
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`,
			},
		});
		if (resp.status > 300) {
			const error = new Error(`Request failed: ${resp.status}`);
			error.status = resp.status;
			throw error;
		}

		return await resp.json();
	} catch (e) {
		if (attemps == 0) return e;
		if (e.status == 401 && attemps > 0) {
			let newToken = await refreshToken();
			window.sessionStorage.setItem("accessToken", newToken.AccessToken);
			return await apiRequest(
				newToken.AccessToken,
				url,
				req,
				attemps - 1,
			);
		}
		return await apiRequest(accessToken, url, req, attemps - 1);
	}
}
