import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { ExpenseContext } from '../../context/ExpenseContext';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, CATEGORY_MAP } from '../../theme/colors';

const { width } = Dimensions.get('window');

const AnalyticsScreen = () => {
    const { expenses, summary } = useContext(ExpenseContext);

    const renderCategoryItem = (item) => {
        const catData = CATEGORY_MAP[item._id] || CATEGORY_MAP['Other'];
        const totalAll = summary.reduce((acc, curr) => acc + curr.total, 0);
        const percentage = totalAll > 0 ? ((item.total / totalAll) * 100).toFixed(0) : 0;

        return (
            <View style={styles.categoryRow} key={item._id}>
                <View style={[styles.iconBox, { backgroundColor: catData.bg }]}>
                    <Ionicons name={catData.icon} size={20} color={catData.color} />
                </View>
                <View style={styles.categoryInfo}>
                    <Text style={styles.categoryName}>{item._id}</Text>
                    <View style={styles.barBackground}>
                        <View style={[styles.barFill, { width: `${percentage}%`, backgroundColor: catData.color }]} />
                    </View>
                </View>
                <View style={styles.categoryValues}>
                    <Text style={[styles.categoryAmount, { color: catData.color }]}>₹{item.total.toFixed(0)}</Text>
                    <Text style={styles.categoryPercent}>{percentage}%</Text>
                </View>
            </View>
        );
    };

    // Calculate chart data based on expenses fetched from backend
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return {
            label: d.toLocaleDateString('en-US', { weekday: 'short' }),
            dateString: d.toISOString().split('T')[0],
            total: 0
        };
    });

    expenses.forEach(expense => {
        const d = new Date(expense.date);
        const expenseDateStr = d.toISOString().split('T')[0];
        const dayMatch = last7Days.find(day => day.dateString === expenseDateStr);
        if (dayMatch) {
            dayMatch.total += expense.amount;
        }
    });

    const maxTotal = Math.max(...last7Days.map(d => d.total), 1);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                <View style={styles.header}>
                    <Text style={styles.title}>Analytics</Text>
                    <Text style={styles.subtitle}>Spending insights</Text>
                </View>

                {/* Weekly Spending Placeholder Chart Card */}
                <View style={styles.chartCard}>
                    <Text style={styles.chartTitle}>Weekly Spending</Text>
                    <Text style={styles.chartSubtitle}>Last 7 days</Text>
                    
                    <View style={styles.chartArea}>
                        {/* Dynamic Bars derived from backend expenses */}
                        {last7Days.map((day, idx) => {
                            const barHeight = Math.max(10, (day.total / maxTotal) * 100);
                            
                            return (
                                <View key={day.dateString} style={styles.barCol}>
                                    <View 
                                        style={[
                                            styles.bar, 
                                            { 
                                                height: barHeight, 
                                                backgroundColor: day.total > 0 ? COLORS.primary : COLORS.border 
                                            }
                                        ]} 
                                    />
                                    <Text style={styles.dayLabel}>{day.label}</Text>
                                </View>
                            );
                        })}
                    </View>
                </View>

                {/* Categories List */}
                <View style={styles.listSection}>
                    <Text style={styles.sectionTitle}>By Category</Text>
                    <View style={styles.listContainer}>
                        {summary.map(renderCategoryItem)}
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
    scrollContent: {
        padding: 20,
        paddingBottom: 100,
    },
    header: { 
        marginBottom: 30,
        paddingTop: 10,
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
    chartCard: {
        backgroundColor: '#1E1F29',
        borderRadius: 24,
        padding: 24,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    chartTitle: {
        color: COLORS.text,
        fontSize: 20,
        fontWeight: '700',
    },
    chartSubtitle: {
        color: COLORS.textSecondary,
        fontSize: 14,
        marginTop: 4,
        marginBottom: 30,
    },
    chartArea: {
        height: 120,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingTop: 20,
    },
    barCol: {
        alignItems: 'center',
    },
    bar: {
        width: 12,
        backgroundColor: COLORS.primary,
        borderRadius: 6,
        marginBottom: 16,
    },
    dayLabel: {
        color: COLORS.textSecondary,
        fontSize: 12,
    },
    listSection: {
        marginTop: 10,
    },
    sectionTitle: {
        color: COLORS.text,
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 20,
    },
    listContainer: {
        gap: 16,
    },
    categoryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E1F29',
        padding: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    categoryInfo: {
        flex: 1,
        marginRight: 16,
    },
    categoryName: {
        color: COLORS.text,
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 10,
    },
    barBackground: {
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 3,
        width: '100%',
    },
    barFill: {
        height: 6,
        borderRadius: 3,
    },
    categoryValues: {
        alignItems: 'flex-end',
    },
    categoryAmount: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
    },
    categoryPercent: {
        color: COLORS.textSecondary,
        fontSize: 12,
    }
});

export default AnalyticsScreen;
