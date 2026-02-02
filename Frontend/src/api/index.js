const BASE_URL = "/api/auth";

async function refreshToken() {
    const res = await fetch(`${BASE_URL}/refreshToken`, {
        method: "POST",
        credentials: "include"
    })
    return await res.json()
}

export default async function apiRequest(accessToken, url, req, attemps = 2) {
    try {
        let resp = await fetch(url, {
            ...req,
            credentials: "include",
            headers: {
                ...req.headers,
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
        })

        if (resp.status > 300) throw new Error({
            error: await resp.json(),
            status: resp.status
        })

        return await resp.json()

    } catch (e) {
        if (attemps == 0) return e
        if (e.status == 401 && attemps > 0) {
            let newToken = await refreshToken()
            window.sessionStorage.setItem("accessToken", newToken.AccessToken)
            return await apiRequest(newToken.AccessToken, url, req, attemps - 1)
        }
        return await apiRequest(accessToken, url, req, attemps - 1)
    }
}