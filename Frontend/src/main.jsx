import {createRoot} from 'react-dom/client'
import './index.css'
import Login from './Login.jsx'
import {BrowserRouter, Routes, Route} from "react-router";
import {AuthProvider} from "./context/userStore.jsx";
import Index from "./components/ReviewsCatalog/index.jsx";

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/catalog" element={<Index/>}/>
            </Routes>
        </BrowserRouter>
    </AuthProvider>
)
