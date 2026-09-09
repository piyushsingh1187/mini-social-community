import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check current user when app starts
    const getCurrentUser = async () => {
        try {
            const response = await api.get("/auth/me");

            setUser(response.data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Login
    const login = async (email, password) => {
        const response = await api.post("/auth/login", {
            email,
            password
        });

        setUser(response.data.user);

        return response.data;
    };

    // Logout
    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setUser(null);
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};