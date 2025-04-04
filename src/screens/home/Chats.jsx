import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const Chats = ({route}) => {
    const navigation = useNavigation();
  console.log(route);
  const messagesArr = [
    {
      id: '1',
      name: 'John Doe',
      sentBy: 'John',
      receivedBy: 'Jane',
      text: 'Hey, how are you?',
      sendTime: '10:00 AM',
    },
    {
      id: '2',
      name: 'Jane Smith',
      sentBy: 'Jane',
      receivedBy: 'John',
      text: 'I am good, what about you?',
      sendTime: '10:01 AM',
    },
    {
      id: '3',
      name: 'John Doe',
      sentBy: 'John',
      receivedBy: 'Jane',
      text: 'Doing great, thanks!',
      sendTime: '10:02 AM',
    },
    {
      id: '4',
      name: 'Jane Smith',
      sentBy: 'Jane',
      receivedBy: 'John',
      text: 'What are you up to?',
      sendTime: '10:03 AM',
    },
    {
      id: '5',
      name: 'John Doe',
      sentBy: 'John',
      receivedBy: 'Jane',
      text: 'Just working on a project.',
      sendTime: '10:04 AM',
    },
    {
      id: '6',
      name: 'Jane Smith',
      sentBy: 'Jane',
      receivedBy: 'John',
      text: 'That sounds interesting!',
      sendTime: '10:05 AM',
    },
    {
      id: '7',
      name: 'John Doe',
      sentBy: 'John',
      receivedBy: 'Jane',
      text: 'Yeah, it’s been fun so far.',
      sendTime: '10:06 AM',
    },
    {
      id: '8',
      name: 'Jane Smith',
      sentBy: 'Jane',
      receivedBy: 'John',
      text: 'Let me know if you need help.',
      sendTime: '10:07 AM',
    },
    {
      id: '9',
      name: 'John Doe',
      sentBy: 'John',
      receivedBy: 'Jane',
      text: 'Sure, thanks!',
      sendTime: '10:08 AM',
    },
    {
      id: '10',
      name: 'Jane Smith',
      sentBy: 'Jane',
      receivedBy: 'John',
      text: 'What’s the project about?',
      sendTime: '10:09 AM',
    },
    {
      id: '11',
      name: 'John Doe',
      sentBy: 'John',
      receivedBy: 'Jane',
      text: 'It’s a chat application.',
      sendTime: '10:10 AM',
    },
    {
      id: '12',
      name: 'Jane Smith',
      sentBy: 'Jane',
      receivedBy: 'John',
      text: 'Oh, that’s cool!',
      sendTime: '10:11 AM',
    },
    {
      id: '13',
      name: 'John Doe',
      sentBy: 'John',
      receivedBy: 'Jane',
      text: 'Thanks! It’s almost done.',
      sendTime: '10:12 AM',
    },
    {
      id: '14',
      name: 'Jane Smith',
      sentBy: 'Jane',
      receivedBy: 'John',
      text: 'Can’t wait to see it.',
      sendTime: '10:13 AM',
    },
    {
      id: '15',
      name: 'John Doe',
      sentBy: 'John',
      receivedBy: 'Jane',
      text: 'I’ll send you the link soon.',
      sendTime: '10:14 AM',
    },
    {
      id: '16',
      name: 'Jane Smith',
      sentBy: 'Jane',
      receivedBy: 'John',
      text: 'Great! Looking forward to it.',
      sendTime: '10:15 AM',
    },
    {
      id: '17',
      name: 'John Doe',
      sentBy: 'John',
      receivedBy: 'Jane',
      text: 'What about you? What are you working on?',
      sendTime: '10:16 AM',
    },
    {
      id: '18',
      name: 'Jane Smith',
      sentBy: 'Jane',
      receivedBy: 'John',
      text: 'Just some design work.',
      sendTime: '10:17 AM',
    },
    {
      id: '19',
      name: 'John Doe',
      sentBy: 'John',
      receivedBy: 'Jane',
      text: 'Nice! Let me know if you need feedback.',
      sendTime: '10:18 AM',
    },
    {
      id: '20',
      name: 'Jane Smith',
      sentBy: 'Jane',
      receivedBy: 'John',
      text: 'Will do, thanks!',
      sendTime: '10:19 AM',
    },
  ];
  const [textValue, setTextValue] = useState('');
  const [messages, setMessages] = useState(messagesArr);
  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({animated: true});
    }
  }, [messages]);

  const handleOnSend = () => {
    if (textValue.trim()) {
      const newMessage = {
        id: (messages.length + 1).toString(),
        name: 'John Doe',
        sentBy: 'John',
        receivedBy: 'Jane',
        text: textValue,
        sendTime: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      // messages.push(newMessage);
      setTextValue('');
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-800`}>
      <View style={tw`bg-gray-900 p-2 flex-row justify-between items-center`}>
        <View style={tw`flex-row items-center gap-4`}>
          <Image
            source={{
              uri:
                route.params?.item?.profile_pic ||
                'https://www.das-macht-schule.net/wp-content/uploads/2018/04/dummy-profile-pic.png',
            }}
            style={tw`w-12 h-12 rounded-full`}
          />
          <View>
            <Text style={tw`text-white font-bold text-lg`}>
              {route.params?.item.name || 'Dummy'}
            </Text>
            <Text style={tw`text-green-500 text-xs -mt-1 font-bold`}>
              Typing...
            </Text>
          </View>
        </View>
        <View style={tw`flex-row gap-3`}>
          <Pressable onPress={() => navigation.navigate('VoiceChat')}>
            <Icon name="phone" size={24} color="white" />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('VideoChat')}>
            <Icon name="videocam" size={24} color="white" />
          </Pressable>
          <Pressable onPress={() => navigation.navigate('voiceCall')}>
            <Icon name="more-vert" size={24} color="white" />
          </Pressable>
        </View>
      </View>

      {/* Chat + Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={tw`flex-1`}
        keyboardVerticalOffset={10}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          contentContainerStyle={tw`p-2 pb-20`}
          renderItem={({item}) => (
            <View
              style={tw`mb-2 rounded-lg p-2 max-w-[80%] ${
                item.sentBy === 'John'
                  ? 'bg-blue-500 self-end'
                  : 'bg-gray-700 self-start'
              }`}>
              <Text style={tw`text-white`}>{item.text}</Text>
            </View>
          )}
        />

        {/* Bottom input bar */}
        <View
          style={tw`absolute bottom-0 left-0 right-0 bg-gray-900 p-3 flex-row items-center`}>
          <Icon name="attach-file" size={24} color="white" style={tw`mr-2`} />
          <TextInput
            placeholder="Type a message"
            onChangeText={setTextValue}
            value={textValue}
            placeholderTextColor={'#ccc'}
            style={tw`flex-1 bg-gray-800 text-white px-4 py-3 rounded-full`}
          />
          <TouchableOpacity
            onPress={handleOnSend}
            style={tw`ml-2 bg-blue-500 p-2 rounded-full`}>
            <Icon name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chats;
