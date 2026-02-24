import { create } from "zustand";
import { useAuthApi } from "../api/useAuthApi.js";

export const useAuthStore = create((set, get) => ({
	user: null,
	accessToken: null,
	loading: true,
	isAuntificated: false,

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
				const user = await useAuthApi.getInfoAboutMe(accessToken);
				set({
					user,
					accessToken,
					isAuntificated: true,
					loading: false,
				});
				return;
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
				const { accessToken, user } = await res.json();
				get().setAccessToken(accessToken);
				set({
					user,
					accessToken,
					isAuntificated: true,
					loading: false,
				});
			} else {
				get().logout();
			}
		} catch (err) {
			get().logout();
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
