import React, { useContext, useEffect } from 'react';
import { 
    View, Text, StyleSheet, ScrollView, ActivityIndicator, 
    SafeAreaView, StatusBar 
} from 'react-native';
import { ExpenseContext } from '../../context/ExpenseContext';
import { AuthContext } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, CATEGORY_MAP } from '../../theme/colors';

const DashboardScreen = () => {
    const { expenses, summary, isLoading, error, fetchExpenses } = useContext(ExpenseContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyExpenses = expenses.filter(e => {
        const d = new Date(e.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

    const totalSpentThisMonth = monthlyExpenses.reduce((acc, curr) => acc + curr.amount, 0);

    // Very simple past week calculation
    const weeklyExpenses = expenses.filter(e => {
        const d = new Date(e.date);
        const now = new Date();
        const diffTime = Math.abs(now - d);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays <= 7;
    });
    const totalSpentThisWeek = weeklyExpenses.reduce((acc, curr) => acc + curr.amount, 0);
    const avgPerDay = totalSpentThisMonth / (new Date().getDate() || 1);

    const renderCategoryCard = (item) => {
        const catData = CATEGORY_MAP[item._id] || CATEGORY_MAP['Other'];
        const percentage = totalSpentThisMonth > 0 ? ((item.total / totalSpentThisMonth) * 100).toFixed(0) : 0;

        return (
            <View style={styles.categoryCard} key={item._id}>
                <View style={[styles.iconBox, { backgroundColor: catData.bg }]}>
                    <Ionicons name={catData.icon} size={20} color={catData.color} />
                </View>
                
                <View style={styles.categoryTextInfo}>
                    <Text style={styles.categoryName}>{item._id}</Text>
                    <Text style={styles.categoryAmount}>₹{item.total.toFixed(0)}</Text>
                </View>

                {/* Inline Progress Bar */}
                <View style={styles.progressTrack}>
                    <View style={[styles.progressBar, { width: `${percentage}%`, backgroundColor: catData.color }]} />
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

    // Generate Avatar Initials
    const getInitials = (email) => {
        if (!email) return 'U';
        return email.substring(0, 2).toUpperCase();
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>
                            Good afternoon <Text style={{fontSize: 24}}>👋</Text>
                        </Text>
                        <Text style={styles.userName}>
                            {user?.email?.split('@')[0] || 'User'}
                        </Text>
                    </View>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{getInitials(user?.email)}</Text>
                    </View>
                </View>

                {/* Hero Card */}
                <View style={styles.heroCard}>
                    <Text style={styles.heroSubtitle}>TOTAL SPENT THIS MONTH</Text>
                    <Text style={styles.heroTitle}>₹{totalSpentThisMonth.toFixed(0)}</Text>

                    <View style={styles.heroStatsRow}>
                        <View style={styles.heroStatBox}>
                            <Text style={styles.heroStatSubtitle}>This Week</Text>
                            <Text style={[styles.heroStatValue, { color: COLORS.accent }]}>₹{totalSpentThisWeek.toFixed(0)}</Text>
                        </View>
                        <View style={styles.heroStatBox}>
                            <Text style={styles.heroStatSubtitle}>Avg / Day</Text>
                            <Text style={[styles.heroStatValue, { color: COLORS.secondary }]}>₹{avgPerDay.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>

                {/* Categories Grid */}
                <View style={styles.categoriesSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Categories</Text>
                        <Text style={styles.sectionCount}>{summary.length} entries</Text>
                    </View>
                    
                    <View style={styles.categoriesGrid}>
                        {summary.map(renderCategoryCard)}
                    </View>
                </View>

            </ScrollView>
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
    scrollContent: {
        padding: 20,
        paddingBottom: 100,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
        paddingTop: 10,
    },
    greeting: {
        color: COLORS.text,
        fontSize: 26,
        fontWeight: '800',
    },
    userName: {
        color: COLORS.textSecondary,
        fontSize: 14,
        marginTop: 4,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
    heroCard: {
        backgroundColor: '#1E293B', // Custom dark slate for hero
        borderRadius: 24,
        padding: 24,
        marginBottom: 30,
        position: 'relative',
        overflow: 'hidden',
    },
    heroSubtitle: {
        color: COLORS.textSecondary,
        fontSize: 12,
        fontWeight: '600',
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: 8,
    },
    heroTitle: {
        color: COLORS.text,
        fontSize: 40,
        fontWeight: '800',
        marginBottom: 24,
    },
    heroStatsRow: {
        flexDirection: 'row',
        gap: 16,
    },
    heroStatBox: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: 16,
        borderRadius: 16,
    },
    heroStatSubtitle: {
        color: COLORS.textSecondary,
        fontSize: 12,
        marginBottom: 6,
    },
    heroStatValue: {
        fontSize: 18,
        fontWeight: '700',
    },
    categoriesSection: {
        marginTop: 10,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 20,
    },
    sectionTitle: {
        color: COLORS.text,
        fontSize: 20,
        fontWeight: '700',
    },
    sectionCount: {
        color: COLORS.textSecondary,
        fontSize: 14,
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    categoryCard: {
        width: '48%',
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    categoryTextInfo: {
        marginBottom: 16,
    },
    categoryName: {
        color: COLORS.textSecondary,
        fontSize: 14,
        marginBottom: 4,
    },
    categoryAmount: {
        color: COLORS.text,
        fontSize: 18,
        fontWeight: '700',
    },
    progressTrack: {
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 2,
        width: '100%',
    },
    progressBar: {
        height: 4,
        borderRadius: 2,
    }
});

export default DashboardScreen;
