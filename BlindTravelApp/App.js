import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import RegisterUserScreen from './src/screens/RegisterUserScreen';
import DriverRegisterScreen from './src/screens/DriverRegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import SubscriptionScreen from './src/screens/SubscriptionScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import RouteScreen from './src/screens/RouteScreen';
import TripHistoryScreen from './src/screens/TripHistoryScreen';
import HelpScreen from './src/screens/HelpScreen';

import DriverHomeScreen from './src/screens/DriverHomeScreen';
import DriverSettingsScreen from './src/screens/DriverSettingsScreen';
import DriverTripScreen from './src/screens/DriverTripScreen';
import DriverGoalsScreen from './src/screens/DriverGoalsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterUser" component={RegisterUserScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DriverRegister" component={DriverRegisterScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Subscription" component={SubscriptionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Route" component={RouteScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TripHistory" component={TripHistoryScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Help" component={HelpScreen} options={{ headerShown: false }} />

        <Stack.Screen name="DriverHome" component={DriverHomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DriverSettings" component={DriverSettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DriverTrip" component={DriverTripScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DriverGoals" component={DriverGoalsScreen} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}