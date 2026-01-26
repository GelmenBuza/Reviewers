import { createRoot } from "react-dom/client";
import "./index.css";
import Login from "./Login.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from "./context/userStore.jsx";
import CatalogPage from "./pages/catalog";
import RegisterPage from "./pages/register";

createRoot(document.getElementById("root")).render(
	<AuthProvider>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<RegisterPage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/catalog" element={<CatalogPage />} />
			</Routes>
		</BrowserRouter>
	</AuthProvider>,
);
