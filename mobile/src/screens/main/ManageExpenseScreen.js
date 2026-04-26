import React, { useState, useContext } from 'react';
import { 
    View, Text, TextInput, TouchableOpacity, StyleSheet, 
    ActivityIndicator, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, StatusBar
} from 'react-native';
import { ExpenseContext } from '../../context/ExpenseContext';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../theme/colors';

const CATEGORIES = [
    { name: 'Food', icon: 'fast-food', color: COLORS.warning },
    { name: 'Transport', icon: 'car', color: COLORS.info },
    { name: 'Utilities', icon: 'flash', color: COLORS.secondary },
    { name: 'Entertainment', icon: 'game-controller', color: COLORS.primaryLight },
    { name: 'Health', icon: 'medical', color: COLORS.secondary },
    { name: 'Shopping', icon: 'bag-handle', color: COLORS.accent },
    { name: 'Bills', icon: 'bulb', color: '#FCD34D' },
];

const ManageExpenseScreen = ({ navigation }) => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Food');
    const [note, setNote] = useState('');
    const { addExpense, isLoading, error } = useContext(ExpenseContext);

    const handleSave = async () => {
        if (!amount || isNaN(amount)) {
            alert('Please enter a valid amount');
            return;
        }

        const success = await addExpense({
            amount: parseFloat(amount),
            category,
            note,
            date: new Date().toISOString()
        });

        if (success) {
            setAmount('');
            setNote('');
            setCategory('Food');
            // Navigate back (or to specific tab)
            navigation.goBack();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
            <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="close" size={28} color={COLORS.text} />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView 
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.header}>
                        <Text style={styles.title}>Add Expense</Text>
                        <Text style={styles.subtitle}>Track a new transaction</Text>
                    </View>

                    {error ? (
                        <View style={styles.errorContainer}>
                            <Ionicons name="alert-circle" size={20} color={COLORS.error} />
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    ) : null}

                    <View style={styles.amountSection}>
                        <Text style={styles.currencySymbol}>₹</Text>
                        <TextInput
                            style={styles.amountInput}
                            placeholder="0"
                            placeholderTextColor={COLORS.textSecondary}
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={setAmount}
                            maxLength={8}
                        />
                    </View>

                    <View style={styles.formSection}>
                        <Text style={styles.sectionLabel}>Category</Text>
                        <View style={styles.categoryGrid}>
                            {CATEGORIES.map((cat) => {
                                const isActive = category === cat.name;
                                return (
                                    <TouchableOpacity
                                        key={cat.name}
                                        activeOpacity={0.7}
                                        style={[
                                            styles.categoryPill,
                                            isActive && { backgroundColor: cat.color, borderColor: cat.color }
                                        ]}
                                        onPress={() => setCategory(cat.name)}
                                    >
                                        <Ionicons 
                                            name={cat.icon} 
                                            size={18} 
                                            color={isActive ? '#000' : cat.color} 
                                            style={styles.categoryIcon}
                                        />
                                        <Text style={[
                                            styles.categoryText,
                                            isActive && { color: '#000' }
                                        ]}>
                                            {cat.name}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        <Text style={styles.sectionLabel}>Note (Optional)</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="document-text-outline" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="e.g. Lunch with team"
                                placeholderTextColor={COLORS.textSecondary}
                                value={note}
                                onChangeText={setNote}
                            />
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={handleSave}
                        disabled={isLoading}
                        activeOpacity={0.8}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.buttonText}>Save Expense</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: COLORS.background 
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 20,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    header: {
        marginBottom: 30,
    },
    title: { 
        fontSize: 32, 
        fontWeight: '800', 
        color: COLORS.text,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textSecondary,
        fontWeight: '500',
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        padding: 12,
        borderRadius: 12,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.2)'
    },
    errorText: { 
        color: COLORS.error, 
        marginLeft: 8,
        fontWeight: '500',
        flex: 1
    },
    amountSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: 24,
        padding: 30,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    currencySymbol: {
        fontSize: 48,
        fontWeight: '800',
        color: COLORS.primaryLight,
        marginRight: 8,
        transform: [{translateY: -5}]
    },
    amountInput: {
        fontSize: 64,
        fontWeight: '800',
        color: COLORS.text,
        minWidth: 150,
    },
    formSection: {
        marginBottom: 20,
    },
    sectionLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 12,
        marginTop: 5,
    },
    categoryGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    categoryPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 10,
        marginBottom: 12,
    },
    categoryIcon: {
        marginRight: 6,
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textSecondary,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 60,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: { 
        flex: 1,
        fontSize: 16,
        color: COLORS.text,
    },
    footer: {
        padding: 24,
        paddingBottom: Platform.OS === 'ios' ? 34 : 24,
        backgroundColor: COLORS.background,
    },
    button: { 
        backgroundColor: COLORS.primary, 
        height: 60,
        borderRadius: 16, 
        alignItems: 'center', 
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonText: { 
        color: '#fff', 
        fontSize: 18, 
        fontWeight: '700' 
    }
});

export default ManageExpenseScreen;
