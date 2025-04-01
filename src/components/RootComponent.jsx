import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signin from '../screens/Signin';
import Home from '../screens/Home';
import ConnectedContact from '../screens/ConnectedContact';
import Signup from '../screens/Signup';
import CreateProfile from '../screens/CreateProfile';


const RootComponent = () => {
    const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex:1}}>
        <Stack.Navigator>
          <Stack.Screen name="Signin" component={Signin} options={{headerShown:false}}/>
          <Stack.Screen name="CreateProfile" component={CreateProfile} options={{headerShown:false}}/>
          <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}}/>
          <Stack.Screen name="Home" component={Home} options={{title:"home",headerShown:false}}/>
          <Stack.Screen name="connectedContact" component={ConnectedContact} options={{headerShown:false}} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default RootComponent;
