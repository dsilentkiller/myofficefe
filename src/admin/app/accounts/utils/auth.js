// src/utils/auth.js
// Use Helper to Check Token Expiry
import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token) => {
    try {
        const { exp } = jwtDecode(token);
        return Date.now() < exp * 1000;
    } catch (e) {
        return false;
    }
};
