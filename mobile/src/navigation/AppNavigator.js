import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AuthContext } from '../context/AuthContext';
import { COLORS } from '../theme/colors';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import DashboardScreen from '../screens/main/DashboardScreen';
import ManageExpenseScreen from '../screens/main/ManageExpenseScreen';
import ExpensesScreen from '../screens/main/ExpensesScreen';
import AnalyticsScreen from '../screens/main/AnalyticsScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
);

// Custom Floating Add Button
const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
        style={{
            top: -20,
            justifyContent: 'center',
            alignItems: 'center',
        }}
        onPress={onPress}
        activeOpacity={0.8}
    >
        <View style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.primary,
            shadowColor: COLORS.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 8,
            elevation: 8,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {children}
        </View>
    </TouchableOpacity>
);

const MainTabs = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Dashboard') {
                    iconName = focused ? 'grid' : 'grid-outline';
                } else if (route.name === 'Expenses') {
                    iconName = focused ? 'receipt' : 'receipt-outline';
                } else if (route.name === 'Analytics') {
                    iconName = focused ? 'trending-up' : 'trending-up-outline';
                } else if (route.name === 'Profile') {
                    iconName = focused ? 'person' : 'person-outline';
                }
                return <Ionicons name={iconName} size={size + 2} color={color} />;
            },
            tabBarActiveTintColor: COLORS.primaryLight,
            tabBarInactiveTintColor: COLORS.textSecondary,
            tabBarShowLabel: true,
            tabBarLabelStyle: { fontSize: 10, fontWeight: '500', marginBottom: 5 },
            tabBarStyle: { 
                height: 70, 
                backgroundColor: COLORS.surface,
                borderTopWidth: 0,
                elevation: 0,
            }
        })}
    >
        <Tab.Screen 
            name="Dashboard" 
            component={DashboardScreen} 
        />
        <Tab.Screen 
            name="Expenses" 
            component={ExpensesScreen} 
        />
        <Tab.Screen 
            name="Add"
            component={ManageExpenseScreen} 
            options={{
                tabBarButton: (props) => (
                    <CustomTabBarButton {...props}>
                        <Ionicons name="add" size={32} color="#fff" />
                    </CustomTabBarButton>
                ),
            }}
            initialParams={{ mode: 'add' }}
            listeners={({ navigation }) => ({
                tabPress: e => {
                    e.preventDefault();
                    navigation.navigate('AddModal');
                }
            })}
        />
        <Tab.Screen 
            name="Analytics" 
            component={AnalyticsScreen} 
        />
        <Tab.Screen 
            name="Profile" 
            component={ProfileScreen} 
        />
    </Tab.Navigator>
);

const RootStack = createNativeStackNavigator();

const AppNavigator = () => {
    const { token, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#8B5CF6" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {token ? (
                <RootStack.Navigator screenOptions={{ headerShown: false, presentation: 'modal' }}>
                    <RootStack.Screen name="MainTabs" component={MainTabs} />
                    <RootStack.Screen name="AddModal" component={ManageExpenseScreen} initialParams={{ mode: 'add' }} />
                </RootStack.Navigator>
            ) : (
                <AuthStack />
            )}
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    loadingContainer: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: COLORS.background 
    }
});

export default AppNavigator;
