// utils/authStorage.js
//utility manages subdomain-based access tokens in localStorage, which is especially 
// useful in multi-tenant applications where each tenant (company/user) is accessed via a subdomain
// #generates a unique token key for each subdomain.
export const getTokenKey = () => {
    const subdomain = window.location.hostname.split(".")[0];
    return `${subdomain}_access_token`;
};
//retrieves the access token for the current subdomain.
export const getAccessToken = () => {
    const key = getTokenKey();
    return localStorage.getItem(key);
};
// stores a token for the current subdomai
export const setAccessToken = (token) => {
    const key = getTokenKey();
    localStorage.setItem(key, token);
};
//removes the token for the current subdomain.
export const removeAccessToken = () => {
    const key = getTokenKey();
    localStorage.removeItem(key);
};
