import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
  Pressable,
  Modal,
  TouchableHighlight,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {set_state, user_auth} from '../redux/user/userData/action';
import loginPng from '../assets/images/login.png';
import BackendUrl from '../components/BackendUrl';
const Signin = () => {
  let result = useSelector(state => state.userDetail);
  useEffect(() => {
    console.log('result : ', result);
  }, [result]);
  let dispatch = useDispatch();
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [phoneErr, setPhoneErr] = useState('');
  const [passErr, setPassErr] = useState('');
  const [fetching, setFetching] = useState(false);
  const [passVisibility, setPassVisibility] = useState(false);
  let bgcolor1 = 'https://wallpapercave.com/wp/wp8151110.jpg';
  let bgcolor2 =
    'https://w0.peakpx.com/wallpaper/340/856/HD-wallpaper-purple-purple-theme.jpg';

    const saveToken = async token => {
      try {
        await AsyncStorage.setItem('token', token);
      } catch (error) {
        console.error('Error saving token:', error);
      }
    }
  const handleOnContinue = async () => {
    if (
      phoneErr.length > 0 ||
      passErr.length > 0 ||
      phone.length < 3 ||
      password.length < 3
    ) {
      return;
    } else {
      console.log('getting api');
      try {
        setFetching(true);
        let response = await axios.post(`${BackendUrl}/signin`, {
          phone: phone,
          password: password,
        });
        setFetching(false);
        if (response.status === 200) {
          dispatch(user_auth(true))
          dispatch(set_state({user: response.data.data, message: 'from signin'}));
          if (!response.data.data.name) {
            navigation.navigate('CreateProfile');
          } else {
            
            saveToken(response.data.data._id);
            // navigation.navigate('Home');
          }
        }
      } catch (error) {
        setFetching(false);
        if (error.response) {
          // Server responded with a status code outside the range of 2xx
          if (error.response.status === 401) {
            setPassErr(error.response.data.message);
          } else if (error.response.status === 404) {
            setPhoneErr(error.response.data.message);
          } else {
            setPhoneErr('something went wrong');
          }
          // console.log('Server error response:', error.response.status);
          // alert(error.response.data.message); // Display the error message from the server
        } else if (error.request) {
          // Request was made but no response received
          console.log('No response received:', error.request);
          alert('No response from server. Please try again later.');
        } else {
          // Something else happened
          console.log('Error:', error.message);
          setPhoneErr('An unexpected error occurred. Please try again.');
        }
      }
    }
  };
  const phoneChangeFun = e => {
    setPhone(e);
    // console.log(e);
    if (e.length <= 3) {
      setPhoneErr('invalid phone');
    } else {
      setPhoneErr('');
    }
  };
  const passChangeFun = e => {
    setPassword(e);
    // console.log(e);
    if (e.length <= 3) {
      setPassErr('min 3 char required');
    } else {
      setPassErr('');
    }
  };
  return (
    <ImageBackground source={{uri: bgcolor2}} style={tw`h-full`}>
      {/* <ActivityIndicator size="large" color="#00ff00" /> */}
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View style={[tw`h-full bg-gray-800`]}>
        {/* <ActivityIndicator size="large" color="#00ff00" /> */}
        <Modal transparent={true} visible={fetching}></Modal>
        <View style={tw`w-[90%] rounded-lg m-auto   p-5`}>
          {/* <Text
            style={[
              tw`text-center font-bold text-[#FFDFEF] text-3xl mb-3`,
              {fontFamily: 'CedarvilleCursive-Regular'},
            ]}>
            login
          </Text> */}
          <Image
            source={loginPng}
            style={tw`h-8 w-15 mx-auto mb-8`}
            resizeMode="contain"
          />
          <View style={tw`flex gap-2`}>
            <View>
              <TextInput
                placeholder="phone"
                value={phone}
                onChangeText={phoneChangeFun}
                selectTextOnFocus
                keyboardType="number-pad"
                placeholderTextColor={'#fff'}
                style={tw`border-b rounded-md   px-3 text-lg text-white ${
                  phoneErr ? 'border-yellow-200' : 'border-white'
                }`}></TextInput>
              <View>
                {phoneErr.length > 0 ? (
                  <Text style={tw`px-3 text-yellow-200`}>{phoneErr}</Text>
                ) : null}
              </View>
            </View>
            <View>
              <View style={tw`relative`}>
                <TextInput
                  placeholder="Password"
                  value={password}
                  onChangeText={passChangeFun}
                  secureTextEntry={!passVisibility}
                  selectTextOnFocus
                  placeholderTextColor={'#fff'}
                  style={tw`border-b px-3 ${
                    passErr ? 'border-yellow-200' : 'border-white'
                  } text-white text-lg`}></TextInput>
                <Pressable
                  style={tw`absolute right-5 top-4  w-6`}
                  onPress={() => setPassVisibility(!passVisibility)}>
                  <Icon
                    name={passVisibility ? 'visibility' : 'visibility-off'}
                    size={23}
                    color="white"
                  />
                </Pressable>
              </View>
              <View>
                {passErr.length > 0 ? (
                  <Text style={tw`px-3 text-yellow-200`}>{passErr}</Text>
                ) : null}
              </View>
              <View style={tw`flex justify-end items-end`}>
                <Text
                  style={tw`text-white border-transparent border-2  underline mt-2`}>
                  Forget password ?
                </Text>
              </View>
            </View>
            <Pressable onPress={handleOnContinue}>
              {fetching ? (
                <View style={tw`bg-orange-900 p-2 rounded-full`}>
                  <ActivityIndicator size={25} color="white" />
                </View>
              ) : (
                <Text
                  style={tw`${
                    passErr ||
                    phoneErr ||
                    phone.length < 3 ||
                    password.length < 3
                      ? 'bg-yellow-800'
                      : 'bg-orange-700'
                  }  rounded-full p-2 text-white font-medium text-xl text-center`}>
                  continue
                </Text>
              )}

              {/* <ActivityIndicator size={15}/> */}
            </Pressable>
            <View
              style={tw`flex justify-between items-center gap-2 w-[70%] px-3 flex-row`}>
              <Text style={tw`text-gray-100`}>don't have an account??</Text>
              <Pressable onPress={() => navigation.navigate('Signup')}>
                <Text style={tw`text-white font-bold text-sm`}>Signup</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Signin;
