import {
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {io} from 'socket.io-client';
import logo from '../assets/images/logo.png';
import BackendUrl from '../components/BackendUrl';
import {connectSocket} from '../redux/socket/action';
import socketConnection from '../components/Socket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {refreshContacts, set_state, user_auth} from '../redux/user/userData/action';

// Declare socket outside the component to reuse it

const Home = () => {
  const dispatch = useDispatch();
  const [contacts, setContacts] = useState([]);
  const [reusableSocket, setReUsableSocket] = useState(null);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const result = useSelector(state => state.userDetail);
  const userId = result.id;
  const navigation = useNavigation();

  const getUser = async () => {
    try {
      let response = await axios.post(`${BackendUrl}/auth`, {userId: userId});
      if (response.status === 200) {
        console.log('user data : ', response.data);
        dispatch(set_state({user: response.data, message: 'from home'}));
      }
    } catch (error) {
      console.log('error : ', error);
    }
  };
  useEffect(() => {
    // getUser();
    console.log('result : ', result);
  }, []);
  const getcontacts =async  ()=> {
    try {
      let response = await axios.post(`${BackendUrl}/get-contacts`, {
        userId: userId
      })
      if (response.status === 200) {
        console.log('user data : ', response.data);
        dispatch(refreshContacts(response.data.contacts));
      }
    } catch (error) {
      console.log('error : ', error);
      
    }
  }

  useEffect(() => {
    let userId = result.id;
    let socket = socketConnection();
    setReUsableSocket(socket);
    socket.on('connected', data => {
      if (data) {
        console.log('connected to socket server');
      }

      socket.emit('joined', userId);
      socket.on('welcome', data => {
        console.log(data);
      });
      socket.on("frndOnline", (data) => {
        getcontacts();
        console.log('friend online : ', data);
        // if (
        //   singleChat._id === data.frndId ||
        //   userData.currentFriend.id == data.frndId
        // ) {
        //   dispatch(set_frnd_online(true));
        // } else {
        //   dispatch(set_frnd_online(false));
        // }
      });
      socket.on("new-message", (data) => {
        getcontacts();
      });

      socket.on('leave', data => {
        console.log(data);
        // setSingleChat({ isOnline: false });
        getcontacts();
      });
    });
  }, [0]);

  const handleOnAddContact = () => {
    navigation.navigate('AddContact');
    // console.log(contacts);
  };
  const fetchContacts = async () => {
    // let res = await  axios.post(`${BackendUrl}/get-contacts`,{userId: result.id});
    // console.log(res.data.contacts)
    try {
      setLoadingContacts(true);
      let response = await axios.post(`${BackendUrl}/get-contacts`, {
        userId: result.id,
      });
      setLoadingContacts(false);
      if (response.status === 200) {
        // console.log(response.data)
        console.log(response.data.contacts);
        dispatch(refreshContacts(response.data.contacts));
      }
    } catch (error) {
      setLoadingContacts(false);
      if (error.response) {
        console.log('error response : ', error.response);
      } else {
        console.log('error : ', error);
      }
    }
  };
  console.log('=> ', result.fetchContacts.length);

  useEffect(() => {
    setTimeout(() => {
      fetchContacts();
    }, 2000);
    console.log(contacts);
  }, []);

  let content;
  if (!loadingContacts) {
    if (result?.fetchContacts?.length === 0) {
      content = (
        <View style={tw`bg-gray-500 h-full flex items-center justify-center`}>
          <Text style={tw`text-xl font-medium text-white`}>
            welcome to reactchat
          </Text>
          <Text style={tw`text-sm text-gray-400`}>
            No messages yet. Start chatting with your friends!
          </Text>
        </View>
      );
    } else {
      content = (
        <FlatList
        onRefresh={() => fetchContacts()}
        refreshing={loadingContacts}
          data={result?.fetchContacts}
          keyExtractor={item => item?._id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('singleChat', {
                  item,
                  socket: reusableSocket,
                })
              }
              style={tw`${
                loadingContacts ? 'hidden' : null
              } flex flex-row items-center justify-between p-4 border-b border-red-800 mx-1 rounded-lg`}>
              <View style={tw`flex flex-row items-center relative`}>
                <View>
                  <Image
                    source={{
                      uri:
                        item?.profile_pic ||
                        'https://th.bing.com/th/id/OIP.7B_aBzwOApSA5-JsJIUb2wHaHa?pid=ImgDet&w=203&h=203&c=7&dpr=1.3',
                    }}
                    style={tw`bg-gray-200 rounded-full w-12 h-12 mr-4
            `}
                  />
                  {
                    item?.isOnline ? (<View style={tw`h-3 w-3 bg-purple-600 rounded-full absolute`}></View>) : null
                    
                  }
                </View>
                <View>
                  <Text style={tw`text-black text-lg font-semibold`}>
                    {item?.name || 'emiwayy'}
                  </Text>
                  <Text style={tw`text-gray-400`}>
                    {item?.last_message}
                  </Text>
                </View>
              </View>
              <Text style={tw`text-gray-500 text-sm`}>
                {item?.time || 'just now'}
              </Text>
            </TouchableOpacity>
          )}
        />
      );
    }
  } else {
    let no = [1, 2, 3, 4, 5, 6, 7];
    content = (
      <FlatList
        data={result.contacts}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <View>
            <View
              style={tw`flex flex-row items-center justify-between p-4  mx-1 rounded-lg`}>
              <View style={tw`flex flex-row items-center`}>
                <View
                  style={tw`bg-gray-200 rounded-full w-12 h-12 mr-4
                    `}
                />
                <View style={tw`gap-1`}>
                  <View style={tw`w-40 bg-gray-300 h-5`}></View>
                  <View style={tw`bg-gray-300 w-50 h-3`}></View>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    );
  }

  return (
    <SafeAreaView style={tw`pb-20 h-full`}>
      <StatusBar barStyle="light-content" backgroundColor="#101828" />
      <View style={tw`bg-gray-900`}>
        <View style={tw`flex mx-4`}>
          {/* <Text style={tw`text-lg py-6 px-7 text-white`}>Reactchat</Text> */}
          <Image source={logo} style={tw`w-32 h-16 `} resizeMode="contain" />
        </View>
      </View>
      {/* messages and content section */}
      <View style={tw`relative`}>{content}</View>

      <TouchableOpacity
        onPress={handleOnAddContact}
        style={tw`w-12 right-10 absolute bottom-16`}>
        <Icon
          name="person-add"
          size={30}
          color="white"
          style={tw`rounded-full p-2 bg-orange-800`}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
