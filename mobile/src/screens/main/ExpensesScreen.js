import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { ExpenseContext } from '../../context/ExpenseContext';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, CATEGORY_MAP } from '../../theme/colors';

const ExpensesScreen = () => {
    const { expenses, isLoading, fetchExpenses, deleteExpense } = useContext(ExpenseContext);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const renderExpenseItem = ({ item }) => {
        const catData = CATEGORY_MAP[item.category] || CATEGORY_MAP['Other'];
        
        return (
            <View style={styles.expenseItem}>
                <View style={[styles.iconContainer, { backgroundColor: catData.bg }]}>
                    <Ionicons name={catData.icon} size={24} color={catData.color} />
                </View>
                <View style={styles.expenseInfo}>
                    <Text style={styles.expenseTitle}>{item.category}</Text>
                    {item.note ? <Text style={styles.expenseNote} numberOfLines={1}>{item.note}</Text> : null}
                    <Text style={styles.expenseDate}>{new Date(item.date).toLocaleDateString()}</Text>
                </View>
                <View style={styles.expenseRight}>
                    <Text style={styles.expenseAmount}>₹{item.amount.toFixed(0)}</Text>
                    <TouchableOpacity 
                        style={styles.deleteBtn}
                        onPress={() => deleteExpense(item._id)}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Ionicons name="trash-outline" size={16} color={COLORS.error} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    if (isLoading && expenses.length === 0) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
            
            <View style={styles.header}>
                <Text style={styles.title}>Transactions</Text>
                <Text style={styles.subtitle}>All your expenses</Text>
            </View>

            <FlatList
                data={expenses}
                keyExtractor={(item) => item._id}
                renderItem={renderExpenseItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="receipt-outline" size={48} color={COLORS.textSecondary} />
                        <Text style={styles.emptyText}>No recent expenses.</Text>
                    </View>
                }
                onRefresh={fetchExpenses}
                refreshing={isLoading}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: COLORS.background 
    },
    center: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: COLORS.background 
    },
    header: { 
        paddingHorizontal: 20, 
        paddingTop: 20,
        paddingBottom: 20 
    },
    title: { 
        fontSize: 28, 
        fontWeight: '800', 
        color: COLORS.text 
    },
    subtitle: { 
        fontSize: 14, 
        color: COLORS.textSecondary,
        marginTop: 4 
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    expenseItem: { 
        backgroundColor: '#1E1F29', 
        padding: 16, 
        marginBottom: 12, 
        borderRadius: 20, 
        flexDirection: 'row', 
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    expenseInfo: { 
        flex: 1,
    },
    expenseTitle: { 
        fontSize: 16, 
        fontWeight: '700', 
        color: COLORS.text,
        marginBottom: 4,
    },
    expenseNote: {
        fontSize: 13,
        color: COLORS.textSecondary,
        marginBottom: 4,
    },
    expenseDate: { 
        fontSize: 12, 
        color: COLORS.textSecondary, 
        fontWeight: '500' 
    },
    expenseRight: { 
        alignItems: 'flex-end',
    },
    expenseAmount: {
        fontSize: 18,
        fontWeight: '700',
        color: '#F43F5E',
        marginBottom: 8,
    },
    deleteBtn: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        padding: 6,
        borderRadius: 8,
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 40,
    },
    emptyText: { 
        textAlign: 'center', 
        marginTop: 12, 
        fontSize: 16,
        color: COLORS.textSecondary,
        fontWeight: '500' 
    }
});

export default ExpensesScreen;
