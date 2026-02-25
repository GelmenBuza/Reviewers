import { create } from "zustand";
import { useUserApi } from "../api/useAuthApi.js";

export const useAuthStore = create((set, get) => ({
	user: null,
	accessToken: null,
	loading: true,
	isAuthenticated: false,

	getAccessToken: () => sessionStorage.getItem("accessToken"),

	setAccessToken: (token) => {
		if (token) {
			sessionStorage.setItem("accessToken", token);
		} else {
			sessionStorage.removeItem("accessToken");
		}
	},

	checkAuth: async () => {
		const accessToken = get().getAccessToken();
		if (accessToken) {
			try {
				const res = await fetch("/api/me", {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});
				if (res.ok) {
					const user = await res.json();

					set({
						user,
						accessToken,
						isAuthenticated: true,
						loading: false,
					});
					return;
				}
			} catch (err) {
				console.error("Access token invalid:", err);
			}
		}

		try {
			const res = await fetch("api/auth/refreshToken", {
				method: "POST",
				credentials: "include",
			});
			if (res.ok) {
				const { AccessToken, user } = await res.json();
				get().setAccessToken(AccessToken);
				set({
					user,
					accessToken: AccessToken,
					isAuntificated: true,
					loading: false,
				});
			} else {
				get().logout();
			}
		} catch (err) {
			console.error("Refresh token failed", err);
			get().logout();
		}
	},
	login: async (email, password) => {
		try {
			const { user } = await useUserApi.login(email, password);
			set({
				user,
				isAuntificated: true,
				loading: false,
			});
			return { success: true };
		} catch (err) {
			set({ loading: false });
			return { success: false, message: "Ошибка входа" };
		}
	},
	logout: async () => {
		await useUserApi.logout();

		get().setAccessToken(null);
		set({
			user: null,
			accessToken: null,
			isAuntificated: false,
			loading: false,
		});
	},
	refreshAccessToken: async () => {
		try {
			const res = await fetch("api/auth/refreshToken", {
				method: "POST",
				credentials: "include",
			});
			if (res.ok) {
				const { accessToken } = await res.json();
				get().setAccessToken(accessToken);
				set({ accessToken });
				return true;
			} else {
				get().logout();
				return false;
			}
		} catch {
			return false;
		}
	},
}));

// Страое =>
// export const useUser = create((set) => ({
// 	reviews: [],
// 	user: {},
// 	setUser: (newUser) => set({ user: newUser }),
// 	setReviews: (newReviews) => set({ reviews: newReviews }),
// }));
