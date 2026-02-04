import {createRoot} from "react-dom/client";
import "./App.css";
import "./index.css";
import Index from "./pages/login/index.jsx";
import {BrowserRouter, Routes, Route} from "react-router";
import {AuthProvider} from "./context/userStore.jsx";
import CatalogPage from "./pages/catalog";
import RegisterPage from "./pages/register";

createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RegisterPage/>}/>
                <Route path="/login" element={<Index/>}/>
                <Route path="/catalog" element={<CatalogPage/>}/>
            </Routes>
        </BrowserRouter>
    </AuthProvider>,
);
