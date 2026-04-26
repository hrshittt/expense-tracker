import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadStoredAuth = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('userToken');
                if (storedToken) {
                    setToken(storedToken);
                    // Fetch user info
                    api.defaults.headers.Authorization = `Bearer ${storedToken}`;
                    const res = await api.get('/auth/me');
                    setUser(res.data);
                }
            } catch (err) {
                console.error('Failed to load local token', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadStoredAuth();
    }, []);

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await api.post('/auth/login', { email, password });
            const { token: receivedToken, ...userData } = res.data;
            
            setUser(userData);
            setToken(receivedToken);
            await AsyncStorage.setItem('userToken', receivedToken);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await api.post('/auth/register', { email, password });
            const { token: receivedToken, ...userData } = res.data;

            setUser(userData);
            setToken(receivedToken);
            await AsyncStorage.setItem('userToken', receivedToken);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await AsyncStorage.removeItem('userToken');
            setUser(null);
            setToken(null);
        } catch (err) {
            console.error('Logout failed', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, isLoading, error, login, register, logout, setError }}>
            {children}
        </AuthContext.Provider>
    );
};
