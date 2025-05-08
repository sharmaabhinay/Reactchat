import React, { useLayoutEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../../screens/Home';
import Chats from '../../screens/home/Chats';
import VoiceCallScreen from '../../screens/home/client/Voice';
import VideoChat from '../../screens/home/client/VideoChat';
import FriendDetails from '../../screens/home/client/Info';
const Stack = createNativeStackNavigator();

const ChatStack = ({navigation, route}) => {
    
  return (
    <Stack.Navigator>
        <Stack.Screen name="chat" component={Chats} options={{headerShown:false}} initialParams={{ userData: route.params?.item , socket: route.params.socket}}/>
        <Stack.Screen name="VoiceChat" component={VoiceCallScreen} options={{headerShown:false}}/>
        <Stack.Screen name="VideoChat" component={VideoChat} options={{headerShown:false}}/>
        <Stack.Screen name="Info" component={FriendDetails} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}

export default ChatStack