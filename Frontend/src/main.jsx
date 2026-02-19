import { createRoot } from "react-dom/client";
import "./App.css";
import "./index.css";
import Index from "./pages/login/index.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import CatalogPage from "./pages/catalog";
import RegisterPage from "./pages/register";
import ReviewsPage from "./pages/reviews";
import SearchPage from "./pages/search/index.jsx";

createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<CatalogPage />} />
			<Route path="/login" element={<Index />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="/reviews/:itemId?" element={<ReviewsPage />} />
			<Route path="/search/:params" element={<SearchPage />} />
		</Routes>
	</BrowserRouter>,
);
