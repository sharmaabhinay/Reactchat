import {View, Text, SafeAreaView, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Signin from '../screens/Signin';
import Signup from '../screens/Signup';
import CreateProfile from '../screens/CreateProfile';
import BottomTabNavigator from './BottomTabNavigator';
import ConnectedContact from '../screens/home/ConnectedContact';
import { TransitionPresets } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { set_state } from '../redux/user/userData/action';

const RootComponent = () => {
  const Stack = createNativeStackNavigator();
  const Auth = useSelector((state)=> state.userDetail);
  const dispatch = useDispatch()
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading, false = not authenticated, true = authenticated

  // Check for auth token in AsyncStorage
  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsAuthenticated(!!token);
        console.log(token) 
        // dispatch(set_state({user:{_id:token}, message:'from root'}))
        // Set true if token exists, false otherwise
      } catch (error) {
        console.error('Error checking auth token:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuthToken();
  }, [Auth.isLoggedIn]);

  // Show a loading indicator while checking for the token
  if (isAuthenticated === null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <Stack.Navigator
          screenOptions={{
            ...TransitionPresets.FadeFromBottomAndroid,
            gestureEnabled: true,
          }}>
          {isAuthenticated ? (
            // If authenticated, show Home and other screens
            <>
              <Stack.Screen name="Home" component={BottomTabNavigator} options={{title: "home", headerShown: false}} />
              <Stack.Screen name="ConnectedContact" component={ConnectedContact} options={{title: "home", headerShown: false}} />
            </>
          ) : (
            // If not authenticated, show Signin and Signup screens
            <>
              <Stack.Screen name="Signin" component={Signin} options={{headerShown: false}} />
              <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}} />
              <Stack.Screen name="CreateProfile" component={CreateProfile} options={{headerShown: false}} />
            </>
          )}
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default RootComponent;
