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
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import BackendUrl from '../../components/BackendUrl';
import {refreshContacts} from '../../redux/user/userData/action';
// import Sound from 'react-native-sound';

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
  const [typingStatus, setTypingStatus] = useState('');
  const [messages, setMessages] = useState(messagesArr);
  const [loading, setLoading] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [typing, setTyping] = useState(false);
  const flatListRef = useRef(null);
  let socket = route.params?.socket;


  // play sound on new message
  // const playSound = ()=> {
  //   const sound = new Sound("notification", Sound.MAIN_BUNDLE , (error) => {
  //     if (error) {
  //       console.log('Failed to load sound', error);
  //     } else {
  //       sound.play(success => {
  //         if (success) {
  //           console.log('Sound played successfully');
  //         } else {
  //           console.log('Sound playback failed');
  //         }
  //       });
  //     }
  //   })
  // }
  // useEffect(() => {
  //   playSound();
  // }, []);

  //receiving messages from socket
  useEffect(() => {
    if (socket) {
      const handleNewMessage = message => {
        console.log('New message:', message);
        setMessages(prevMessages => [ message,...prevMessages]);
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
        if(data.userId === route.params?.userId?._id){
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
    fetchMessages();
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
        },...prevMessages
      ]);
      socket.emit('client-message', {
        senderId: userData.id,
        receiverId: route.params?.userData._id,
        content: textValue,
      });
      getcontacts();
    }
  };

  useEffect(()=> {
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

  },[])

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
            keyExtractor={item => item?._id || item.id || Math.random().toString(36).substring(7)}
            contentContainerStyle={tw`p-2 pb-20`}
            renderItem={({item}) => (
              <View
                style={tw`mb-2 p-2  max-w-[80%] ${
                  item.sender === userData.id
                    ? 'bg-orange-500 self-end rounded-bl-lg rounded-t-lg'
                    : 'bg-gray-700 self-start rounded-b-lg rounded-tr-lg'
                }`}>
                <Text style={tw`text-white`}>{item.content}</Text>
                {/* <Text>{item.timeStamp}</Text> */}
              </View>
            )}
            // style={tw`h-20`}
          />
        )}

        {/* Bottom input bar */}
        <View
          style={tw`bottom-0 left-0 right-0 bg-gray-800 p-3 flex-row items-center justify-around gap-2`}>
          <TouchableOpacity style={tw` border-2 border-white p-2 rounded-full`}>
            <Icon name="attach-file" size={20} color="white" style={tw``} />
          </TouchableOpacity>
          <TextInput
            autoFocus
            placeholder="Type a message"
            onChangeText={setTextValue}
            value={textValue}
            placeholderTextColor={'#ccc'}
            style={tw`flex-1 max-h-12 bg-gray-800 text-white px-4 py-3 rounded-full border-2 border-white`}
          />
          <TouchableOpacity
            onPress={handleOnSend}
            style={tw`border-2 border-white p-2 rounded-full`}>
            <Icon name="send" size={20} color="white"  />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chats;
