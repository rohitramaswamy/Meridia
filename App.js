import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

// Import screens
import InspireMeScreen from './src/screens/InspireMeScreen';
import CurateScreen from './src/screens/CurateScreen';
import MyTripsScreen from './src/screens/MyTripsScreen';
import MapScreen from './src/screens/MapScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Inspire Me') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Curate') {
              iconName = focused ? 'filter' : 'filter-outline';
            } else if (route.name === 'My Trips') {
              iconName = focused ? 'briefcase' : 'briefcase-outline';
            } else if (route.name === 'Map') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Inspire Me" component={InspireMeScreen} />
        <Tab.Screen name="Curate" component={CurateScreen} />
        <Tab.Screen name="My Trips" component={MyTripsScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
