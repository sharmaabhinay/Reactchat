import { View, Text } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../../screens/Home';
import ConnectedContact from '../../screens/home/ConnectedContact';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Chats from '../../screens/home/Chats';
import ChatStack from '../chatStack/ChatStack';
import AddContact from '../../screens/home/AddContact';
const Stack = createNativeStackNavigator();

const HomeStack = ({navigation, route}) => {
    
  return (
    <Stack.Navigator>
        <Stack.Screen name="HomeChats" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="AddContact" component={AddContact} options={{headerShown:false}}/>
        <Stack.Screen name="singleChat" component={ChatStack} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

export default HomeStack