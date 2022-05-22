/**
 * 
 * @param {string} url 
 * @param {RequestInit} options
*/
export default async function makeRequest(url, options = {}) {
    try {
        const request = await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                'Content-type': 'application/json'
            }
        });

        const response = await request.json();
        return response; 
    } catch(err) {
        return { ok: false };
    }
}