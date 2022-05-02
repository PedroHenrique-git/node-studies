/**
 * 
 * @param {string} url 
 * @param {RequestInit} options
*/
export default async function makeRequest(url, options = {}) {
    try {
        const request = await fetch(url, options);
        const response = await request.json();
        return response; 
    } catch(err) {  
        console.log('Error --> ', err);
    }
}