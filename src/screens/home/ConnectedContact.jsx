import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ConnectedContact = ({ navigation, route }) => {
  console.log(route)
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: route.name === 'SingleChat' ? { display: 'none' } : { display: 'flex' },
    });
  }, [navigation, route.name]);

  const messages = [
    { id: '1', text: 'Hello!', sender: 'other' },
    { id: '2', text: 'Hi, how are you?', sender: 'me' },
    { id: '3', text: 'I am good, thanks!', sender: 'other' },
  ];

  const renderMessage = ({ item }) => (
    <View
      style={tw`${
        item.sender === 'me' ? 'self-end bg-blue-500' : 'self-start bg-gray-300'
      } p-3 m-2 rounded-lg max-w-3/4`}
    >
      <Text style={tw`text-white`}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView>
    
    </SafeAreaView>
  );
};

export default ConnectedContact;