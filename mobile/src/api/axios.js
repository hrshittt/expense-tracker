import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const getBaseUrl = () => {
    // Connected to Live Production Backend
    return 'https://expense-tracker-fuzp.onrender.com/api';
};

const instance = axios.create({
    baseURL: getBaseUrl(),
});

// Request interceptor to add the auth token header to requests
instance.interceptors.request.use(
    async (config) => {
        // Bypass localtunnel warning page
        config.headers['Bypass-Tunnel-Reminder'] = 'true';
        
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
