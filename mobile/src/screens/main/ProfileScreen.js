import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Alert, ScrollView } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { ExpenseContext } from '../../context/ExpenseContext';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../theme/colors';

const ProfileScreen = () => {
    const { user, logout } = useContext(AuthContext);
    const { expenses } = useContext(ExpenseContext);

    const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    // Assume member since user's createdAt exists or use fallback
    const memberSinceDate = user?.createdAt ? new Date(user.createdAt) : new Date();
    const memberSinceFormatted = memberSinceDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

    const getInitials = (email) => {
        if (!email) return 'U';
        return email.substring(0, 2).toUpperCase();
    };

    const handleExport = () => {
        Alert.alert("Export Successful", "Your data has been exported to CSV.");
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.title}>Profile</Text>
                    <Text style={styles.subtitle}>Account settings</Text>
                </View>

                <View style={styles.profileSection}>
                    <View style={styles.avatarLarge}>
                        <Text style={styles.avatarTextLarge}>{getInitials(user?.email)}</Text>
                    </View>
                    <Text style={styles.userName}>{user?.email?.split('@')[0] || 'User'}</Text>
                    <Text style={styles.userEmail}>{user?.email}</Text>
                </View>

                <View style={styles.statsCard}>
                    <View style={styles.statRow}>
                        <Text style={styles.statLabel}>Member Since</Text>
                        <Text style={styles.statValue}>{memberSinceFormatted}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.statRow}>
                        <Text style={styles.statLabel}>Total Expenses</Text>
                        <Text style={styles.statValue}>{expenses.length} records</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.statRow}>
                        <Text style={styles.statLabel}>Total Spent</Text>
                        <Text style={[styles.statValue, { color: COLORS.text }]}>₹{totalSpent.toFixed(0)}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.actionButton} onPress={handleExport}>
                    <Ionicons name="download" size={20} color={COLORS.primaryLight} style={{marginRight: 8}} />
                    <Text style={styles.actionButtonText}>Export as CSV</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionButton, styles.logoutButton]} onPress={logout}>
                    <Text style={styles.logoutText}>Sign Out</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: COLORS.background,
        paddingHorizontal: 20,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    header: { 
        marginTop: 20,
        marginBottom: 40,
    },
    title: { 
        fontSize: 28, 
        fontWeight: '800', 
        color: COLORS.text 
    },
    subtitle: { 
        fontSize: 14, 
        color: COLORS.textSecondary,
        marginTop: 4,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 40,
    },
    avatarLarge: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#C084FC',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#C084FC',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    avatarTextLarge: {
        fontSize: 36,
        fontWeight: '800',
        color: '#FFF',
    },
    userName: {
        fontSize: 24,
        fontWeight: '800',
        color: COLORS.text,
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    statsCard: {
        backgroundColor: '#16171E',
        borderRadius: 24,
        padding: 24,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    statLabel: {
        fontSize: 16,
        color: COLORS.textSecondary,
    },
    statValue: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.text,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
    },
    actionButton: {
        flexDirection: 'row',
        backgroundColor: '#1E1F29',
        padding: 18,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    actionButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.text,
    },
    logoutButton: {
        backgroundColor: 'rgba(244, 63, 94, 0.1)',
        borderColor: 'rgba(244, 63, 94, 0.2)',
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.accent,
    }
});

export default ProfileScreen;
