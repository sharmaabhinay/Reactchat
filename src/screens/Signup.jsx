import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import tw from 'twrnc';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Pressable
} from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const Signup = () => {
  let bgcolor2 =
    'https://w0.peakpx.com/wallpaper/340/856/HD-wallpaper-purple-purple-theme.jpg';

  const navigation = useNavigation();
  let [phone, setPhone] = useState('');
  let [password, setPassword] = useState('');
  let [phoneErr, setPhoneErr] = useState('');
  let [passErr, setPassErr] = useState('');
  const [passVisibility, setPassVisibility] = useState(false);
  const [fetching,setFetching] = useState(false);
  let [cnfPassword, setCnfPassword] = useState('');
  let [cnfPassErr, setCnfPassErr] = useState('');
  let [valid, setValid] = useState({phone: false, pass: false, cnfPass: false});

  const handleOnContinue = async () => {
    if(phone.length < 3 || password.length < 3 || cnfPassword.length < 3 || passErr.length > 0 || phoneErr.length > 0 || cnfPassErr.length > 0){
      // return;
      navigation.navigate('CreateProfile')

    }else{
      navigation.navigate('CreateProfile')
      // console.log("phone : ",phone , "password : ",password);
      // setFetching(true);
      // let register = await axios.post('https://me-chat-cazt.onrender.com/signup',{
      //   phone:phone,
      //   password:password
      // })
      // if(register.data){
      //   setFetching(false);
      //   if(register.data.data.message == 'already registered'){
      //     setPhoneErr('already registered');
      //   }else if(register.data.data.message == 'user created'){
      //     // setPhoneErr('user created');
      //     navigation.navigate('CreateProfile');

      //   }else{
      //     setPhoneErr('something went wrong');
      //   }
      // }else{
      //   alert('something went wrong');
      // }
      // console.log(register.data);
   
    }
  };

  const phoneChangeFun = e => {
    setPhone(e);
    // console.log(e);
    if (e.length <= 3) {
      setPhoneErr('invalid phone');
    } else {
      // setValid.phone(true);
      setPhoneErr('');
    }
  };

  const passChangeFun = e => {
    setPassword(e);
    // console.log(e);
    if (e.length <= 3) {
      setPassErr('min 3+ char required');
    } else {
      setPassErr('');
    }
  };

  const cnfPassChangeFun = e => {
    setCnfPassword(e);
    if (e !== password) {
      setCnfPassErr('Passwords did not match');
    } else {
      setCnfPassErr('');
    }
  };

  return (
    <ImageBackground source={{uri: bgcolor2}} style={tw`h-full`}>
      <Modal transparent visible={fetching} animationType="fade"/>
      {/* <ActivityIndicator size="large" color="#00ff00" /> */}
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View style={[tw`h-full`]}>
        <View style={tw`w-[90%] rounded-lg m-auto p-5`}>
          <Text
            style={[
              tw`text-center font-bold text-[#FFDFEF] text-xl mb-3`,
              {fontFamily: 'CedarvilleCursive-Regular'},
            ]}>
            Signup
          </Text>
          <View style={tw`flex gap-2`}>
            <TextInput
              placeholder="phone"
              value={phone}
              onChangeText={phoneChangeFun}
              selectTextOnFocus
              keyboardType="number-pad"
              placeholderTextColor={'#fff'}
              style={tw`border-b rounded-md py-2 ${phoneErr ? 'border-yellow-200' : 'border-white'} text-white text-lg px-7`}></TextInput>
            {/* </View> */}
            <View>
                  {
                    phoneErr.length > 2 ? (<Text style={tw`px-6 text-yellow-200`}>{phoneErr}</Text>) : null
                  }
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
                  style={tw`border-b rounded-md py-2 ${passErr ? 'border-yellow-200' : 'border-white'} px-7 text-white text-lg`}></TextInput>
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
                  <Text style={tw`px-6 text-yellow-200`}>{passErr}</Text>
                ) : (null)}
              </View>
            </View>
            <View>
              <TextInput
                placeholder="confirm Password"
                value={cnfPassword}
                onChangeText={cnfPassChangeFun}
                secureTextEntry
                selectTextOnFocus
                placeholderTextColor={'#fff'}
                style={tw`border-b rounded-md py-2 px-7 ${cnfPassErr ? 'border-yellow-200' : 'border-white'} text-white text-lg`}></TextInput>
              <View>
                  {
                    cnfPassErr.length > 2 ? (<Text style={tw`px-6 text-yellow-200`}>{cnfPassErr}</Text>) : null
                  }
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
                    cnfPassErr ||
                    phone.length < 3 ||
                    password.length < 3 ||
                    cnfPassword.length < 3
                      ? 'bg-yellow-800'
                      : 'bg-orange-700'
                  }  rounded-full p-2 text-white font-medium text-xl text-center`}>
                  continue
                </Text>
              )}

              {/* <ActivityIndicator size={15}/> */}
            </Pressable>
            <View style={tw`flex justify-between gap-2 w-[70%] px-3 flex-row`}>
              <Text style={tw`text-gray-100`}>already have an account??</Text>
              <Text
                style={tw`text-white font-bold`}
                onPress={() => navigation.goBack()}>
                Login
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Signup;
