import LoginPage from "./pages/login/index.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import CatalogPage from "./pages/catalog";
import RegisterPage from "./pages/register";
import ReviewsPage from "./pages/reviews";
import SearchPage from "./pages/search/index.jsx";
import { useAuthStore } from "./stores/userStore.jsx";
import { useEffect } from "react";

function App() {
	const { loading, isAuntificated, checkAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<CatalogPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/reviews/:itemId?" element={<ReviewsPage />} />
				<Route path="/search/:params" element={<SearchPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
