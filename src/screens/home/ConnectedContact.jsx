import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import tw from 'twrnc';

const ConnectedContact = ({item}) => {
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
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1 p-4`}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={tw`pb-4`}
        />
      </View>
      <View style={tw`flex-row items-center p-4 border-t border-gray-200`}>
        <TextInput
          style={tw`flex-1 bg-gray-100 p-3 rounded-lg`}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={tw`ml-3 bg-blue-500 p-3 rounded-full`} onPress={()=> console.log(item)}>
          <Text style={tw`text-white font-bold`}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConnectedContact;