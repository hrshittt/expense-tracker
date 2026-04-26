import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import { ExpenseProvider } from './src/context/ExpenseContext';
import AppNavigator from './src/navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';

export default function App() {
    return (
        <AuthProvider>
            <ExpenseProvider>
                <StatusBar style="auto" />
                <AppNavigator />
            </ExpenseProvider>
        </AuthProvider>
    );
}
