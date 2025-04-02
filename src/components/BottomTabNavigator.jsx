import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/profile/Profile';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel:false,
        tabBarStyle:{
            backgroundColor:'#101828'
        }
      })}>
      <Tab.Screen
        name="Chats"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size || 24} /> // Increased size
          ),
          tabBarBadge: 3,
          tabBarBadgeStyle: {backgroundColor: 'purple'},
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="person" color={color} size={size || 24} /> // Increased size
          ),
        }}
      />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
