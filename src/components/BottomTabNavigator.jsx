import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/profile/Profile';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeStack from './homeStack/HomeStack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();


const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#101828',
          display: hideBar(route), // Dynamically hide the tab bar
        },
      })}>
      <Tab.Screen
        name="Chats"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size || 24} />
          ),
          // tabBarBadge: 3,
          // tabBarBadgeStyle: {backgroundColor: 'purple'},
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={({route}) => ({
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="person" color={color} size={size || 24} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const hideBar = route => {
  const routeName = getFocusedRouteNameFromRoute(route);
  // Hide the tab bar for specific screens
  if (
    routeName === 'singleChat' || // Chats.jsx
    routeName === 'VoiceChat' ||
    routeName === 'VideoChat' ||
    routeName === 'Info'
  ) {
    return 'none';
  }
  return 'flex';
};

export default BottomTabNavigator;
