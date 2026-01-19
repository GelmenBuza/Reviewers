const BASE_URL = 'http://localhost:3000/api/auth';

const getAuthHead = () => {
    const token = localStorage.getItem('token')
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}

const getBaseHead = () => {
    return {
        'Content-Type': 'application/json',
    }
}


export const useUserApi = {
    login: async (email, password) => {
        const res = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: getBaseHead(),
            body: JSON.stringify({email, password}),
        })
        if (!res.ok) {
            const error = await res.json();
            throw new Error(`Login Error: ${error.message}`);
        }
        return res.json();
    },
}