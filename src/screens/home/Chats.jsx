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
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import tw from 'twrnc';
import ImagePicker from 'react-native-image-crop-picker';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import BackendUrl from '../../components/BackendUrl';
import {refreshContacts} from '../../redux/user/userData/action';
// import Sound from 'react-native-sound';
var Sound = require('react-native-sound');

const Chats = ({route}) => {
  // Sound.setCategory('Playback', true);
  let dispatch = useDispatch();
  const typingSession = useRef(null);
  const userData = useSelector(state => state.userDetail);
  const cliendId = userData.id;
  const navigation = useNavigation();
  // const notification = require('../../assets/audio/notification.mp3');
  // console.log(route.params?.socket);

  const messagesArr = [
   {
      __v: 0,
      _id: '681cbbe68ccda579cd52e24b',
      content: 'https://images.unsplash.com/photo-1750429431308-96eb0e8b6f6f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D',
      read: true,
      content_type: 'image',
      receiver: '6803b7b294c2aa419430d500',
      sender: '681cbb518ccda579cd52e227',
      timestamp: '2025-05-08T14:12:54.269Z',
    },
    {
      __v: 0,
      _id: '681cbc028ccda579cd52e25d',
      content: 'hello',
      read: true,
      content_type: 'text',
      receiver: '681cbb518ccda579cd52e227',
      sender: '6803b7b294c2aa419430d500',
      timestamp: '2025-05-08T14:13:22.968Z',
    },
    {
      __v: 0,
      _id: '681cbc358ccda579cd52e26b',
      content: 'wassup?',
      read: true,
      content_type: 'text',
      receiver: '6803b7b294c2aa419430d500',
      sender: '681cbb518ccda579cd52e227',
      timestamp: '2025-05-08T14:14:13.168Z',
    },
    {
      __v: 0,
      _id: '681cbc6b8ccda579cd52e279',
      content: 'https://plus.unsplash.com/premium_photo-1749668819550-43e7a3712a31?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8',
      read: true,
      content_type: 'image',
      receiver: '681cbb518ccda579cd52e227',
      sender: '6803b7b294c2aa419430d500',
      timestamp: '2025-05-08T14:15:07.468Z',
    },
    {
      __v: 0,
      _id: '681cbccb8ccda579cd52e28a',
      content: '??',
      read: true,
      content_type: 'text',
      receiver: '681cbb518ccda579cd52e227',
      sender: '6803b7b294c2aa419430d500',
      timestamp: '2025-05-08T14:16:43.608Z',
    },
    {
      __v: 0,
      _id: '681cbcdc8ccda579cd52e299',
      content: 'https://images.unsplash.com/photo-1750692115876-828f4f1b69e4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D',
      read: true,
      content_type: 'image',
      receiver: '681cbb518ccda579cd52e227',
      sender: '6803b7b294c2aa419430d500',
      timestamp: '2025-05-08T14:17:00.617Z',
    }
  ];
  const [textValue, setTextValue] = useState('');
  const [typingStatus, setTypingStatus] = useState('');
  const [messages, setMessages] = useState(messagesArr);
  const [loading, setLoading] = useState(false);
  const [selectImage, setSelectImage] = useState(null);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [typing, setTyping] = useState(false);
  const flatListRef = useRef(null);
  let socket = route.params?.socket;

  var whoosh = new Sound('notification.mp3', Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // loaded successfully
    console.log(
      'duration in seconds: ' +
        whoosh.getDuration() +
        'number of channels: ' +
        whoosh.getNumberOfChannels(),
    );

    // Play the sound with an onEnd callback
  });

  //play notification sound
  const playSound = () => {
    whoosh.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };

  //select file
  const selectfiles = async () => {
    try {
      await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: false,
      }).then(image => {
        console.log(image);
        navigation.navigate('selectfile', {
          imageUri: image,
          sender: userData.id,
          receiver: route.params?.userData,
          // socket: route.params?.socket,
        });
      });
    } catch (error) {
      console.log('error : ', error);
    }
  };

  useEffect(() => {
    if (socket) {
      const handleNewMessage = message => {
        console.log('New message:', message);
        setMessages(prevMessages => [message, ...prevMessages]);
        playSound();
      };

      // Register the 'new-message' listener
      socket.on('new-message', handleNewMessage);

      // Cleanup the listener when the component unmounts or re-renders
      return () => {
        socket.off('new-message', handleNewMessage);
      };
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on('leave', data => {
        if (data.userId === route.params?.userId?._id) {
          setTypingStatus('offline');
        }
      });
      socket.on('frnd-typing', data => {
        console.log('typing data : ', data);
        if (data.isTyping) {
          setTypingStatus('typing...');
        } else {
          setTypingStatus('online');
        }
      });
    }
  }, []);
  useEffect(() => {
    if (textValue.length > 0) {
      if (!typing) {
        setTyping(true);
      }
      clearTimeout(typingSession.current);
      typingSession.current = setTimeout(() => {
        setTyping(false);
      }, 1500);
    }
  }, [textValue]);
  useEffect(() => {
    if (socket) {
      console.log('typing : ', typing);
      socket.emit('typing', {
        senderId: userData.id,
        receiverId: route.params?.userData._id,
        isTyping: typing,
      });
    }
  }, [typing]);
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const fullUrl = `${BackendUrl}/get-messages`;
      console.log('API URL:', fullUrl);
      const response = await axios.post(fullUrl, {
        senderId: userData.id,
        receiverId: route.params?.userData._id,
      });
      setLoading(false);
      if (response.status === 200 && response.data) {
        console.log('Messages fetched successfully:', response.data);
        setMessages(response.data.reverse());
      } else {
        console.log('No messages found');
        setMessages([]);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error fetching messages:', error.message);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
    }
  };
  useEffect(() => {
    setTypingStatus(route.params?.userData?.isOnline ? 'online' : 'offline');
    // fetchMessages();
  }, []);
  // useEffect(() => {
  //   if (flatListRef.current && messages.length > 0) {
  //     flatListRef.current.scrollToEnd({animated: true});
  //   }
  // }, [messages, isKeyboardVisible]);

  const getcontacts = async () => {
    console.log('get contacts called');
    try {
      let response = await axios.post(`${BackendUrl}/get-contacts`, {
        userId: cliendId,
      });
      if (response.status === 200) {
        dispatch(refreshContacts(response.data.contacts));
      }
    } catch (error) {
      console.log('error : ', error);
    }
  };

  const handleOnSend = () => {
    if (socket) {
      setTextValue('');
      setMessages(prevMessages => [
        {
          sender: userData.id,
          receiver: route.params?.userData._id,
          content: textValue,
          timeStamp: new Date().toISOString(),
          _id: Math.random().toString(36).substring(7), // Generate a random ID for the message
        },
        ...prevMessages,
      ]);
      socket.emit('client-message', {
        senderId: userData.id,
        receiverId: route.params?.userData._id,
        content: textValue,
        content_type: 'text',
      });
      getcontacts();
    }
  };

  useEffect(() => {
    // const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
    //   flatListRef.current?.scrollToEnd({animated: true});
    // })
    // const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
    //   flatListRef.current?.scrollToEnd({animated: false});
    // })
    // setIsKeyboardVisible(!isKeyboardVisible);
    // return () => {
    //   showSubscription.remove();
    //   hideSubscription.remove();
    // }
  }, []);
  let temMessage = [
    
    
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-800`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`flex-1`}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        // behavior="height"
      >
        <View style={tw`bg-gray-900 p-2 flex-row justify-between items-center`}>
          <View style={tw`flex-row items-center gap-4`}>
            <Image
              source={{
                uri:
                  route.params?.userData?.profile_pic ||
                  'https://www.das-macht-schule.net/wp-content/uploads/2018/04/dummy-profile-pic.png',
              }}
              style={tw`w-12 h-12 rounded-full`}
            />
            <View>
              <Text style={tw`text-white font-bold text-lg`}>
                {route.params?.userData?.name || 'Dummy'}
              </Text>
              <Text
                style={tw`${
                  typingStatus === 'online' ? 'text-orange-400' : 'text-white'
                } text-xs -mt-1`}>
                {typingStatus}
              </Text>
            </View>
          </View>
          <View style={tw`flex-row gap-3`}>
            <Pressable
              onPress={() =>
                navigation.navigate('VoiceChat', {
                  userData: route.params?.userData,
                })
              }>
              <Icon name="phone" size={24} color="white" />
            </Pressable>
            <Pressable onPress={() => navigation.navigate('VideoChat')}>
              <Icon name="videocam" size={24} color="white" />
            </Pressable>
            <Pressable
              onPress={() =>
                navigation.navigate('Info', {userData: route.params?.userData})
              }>
              <Icon name="info" size={24} color="white" />
            </Pressable>
          </View>
        </View>

        {/* Chat + Input */}
        {loading ? (
          <View style={tw`flex-1 p-2`}>
            <View style={tw`flex-1 justify-center items-center`}>
              <ActivityIndicator size={40} color="orange" />
              <Text style={tw`text-white text-lg font-bold`}>
                Getting Messages...
              </Text>
            </View>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            // onContentSizeChange={() => {
            //   flatListRef.current?.scrollToEnd({animated: true});
            // }}
            // onLayout={() => {
            //   flatListRef.current?.scrollToEnd({animated: true});
            // }}
            inverted={true}
            onEndReachedThreshold={0.1}
            onEndReached={() => {
              console.log('End reached');
            }}
            ListEmptyComponent={
              <Text style={tw`text-white text-lg text-center`}>
                No messages yet
              </Text>
            }
            keyExtractor={item =>
              item?._id || item.id || Math.random().toString(36).substring(7)
            }
            contentContainerStyle={tw`p-2 pb-20`}
            renderItem={({item}) => (
              <View
                style={tw`mb-2 p-2  max-w-[80%] ${
                  item.sender === userData.id
                    ? 'bg-orange-500 self-end rounded-bl-lg rounded-t-lg'
                    : 'bg-gray-700 self-start rounded-b-lg rounded-tr-lg'
                }`}>
                {item?.content_type === 'text' ? (
                  <Text style={tw`text-white`}>{item.content}</Text>
                ) : (
                  <Image source={{uri: item.content}} style={tw`w-60 h-60`} />
                )}
                {/* <Text style={tw`text-white`}>{item.content}</Text> */}
                {/* <Text>{item.timeStamp}</Text> */}
              </View>
            )}
            // style={tw`h-20`}
          />
        )}

        {/* Bottom input bar */}
        <View
          style={tw`bottom-0 left-0 right-0 bg-gray-800 p-3 flex-row items-center justify-around gap-2`}>
          <TouchableOpacity
            style={tw` border-2 border-white p-2 rounded-full`}
            onPress={selectfiles}>
            <Icon name="attach-file" size={20} color="white" style={tw``} />
          </TouchableOpacity>
          <TextInput
            
            placeholder="Type a message"
            onChangeText={setTextValue}
            value={textValue}
            placeholderTextColor={'#ccc'}
            style={tw`flex-1 max-h-12 bg-gray-800 text-white px-4 py-3 rounded-full border-2 border-white`}
          />
          <TouchableOpacity
            onPress={handleOnSend}
            style={tw`border-2 border-white p-2 rounded-full`}>
            <Icon name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chats;
