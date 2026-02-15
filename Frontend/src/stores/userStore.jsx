import { create } from "zustand";

export const useUser = create((set) => ({
	reviews: [],
	user: {},
	setUser: (newUser) => set({ user: newUser }),
	setReviews: (newReviews) => set({ reviews: newReviews }),
}));
