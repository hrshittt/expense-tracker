import React, { createContext, useState, useContext } from 'react';
import api from '../api/axios';
import { AuthContext } from './AuthContext';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
    const { token } = useContext(AuthContext);
    const [expenses, setExpenses] = useState([]);
    const [summary, setSummary] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchExpenses = async () => {
        if (!token) return;
        setIsLoading(true);
        setError(null);
        try {
            const res = await api.get('/expenses');
            setExpenses(res.data);
            await fetchSummary();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load expenses');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchSummary = async () => {
        try {
            const res = await api.get('/expenses/summary');
            setSummary(res.data);
        } catch (err) {
            console.error('Failed to load summary', err);
        }
    };

    const addExpense = async (expenseData) => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await api.post('/expenses', expenseData);
            setExpenses([res.data, ...expenses]);
            await fetchSummary();
            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add expense');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const updateExpense = async (id, expenseData) => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await api.put(`/expenses/${id}`, expenseData);
            setExpenses(expenses.map(e => (e._id === id ? res.data : e)));
            await fetchSummary();
            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update expense');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const deleteExpense = async (id) => {
        setIsLoading(true);
        setError(null);
        try {
            await api.delete(`/expenses/${id}`);
            setExpenses(expenses.filter(e => e._id !== id));
            await fetchSummary();
            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete expense');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ExpenseContext.Provider value={{ expenses, summary, isLoading, error, fetchExpenses, addExpense, updateExpense, deleteExpense }}>
            {children}
        </ExpenseContext.Provider>
    );
};
