import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import BackendUrl from '../components/BackendUrl';
import { useDispatch, useSelector } from 'react-redux';
import { set_state, user_auth } from '../redux/user/userData/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
let bgcolor2 =
'https://w0.peakpx.com/wallpaper/340/856/HD-wallpaper-purple-purple-theme.jpg';
const CreateProfile = () => {
  const userData = useSelector((state) => state.userDetail);
  const dispatch = useDispatch();
    let navigation = useNavigation();
  const [name, setName] = useState('');
  const [valid,setValid] = useState(false);
  const [email, setEmail] = useState('');
  const [nameErr, setNameErr] = useState(null);

  let pics = [
    {
      id: 1,
      uri: 'https://img.freepik.com/premium-photo/profile-icon-white-background_941097-161481.jpg',
    },
    {
      id: 2,
      uri: 'https://th.bing.com/th/id/OIP.m0Tdm7iSgihXwA_NYIpMnwHaHa?pid=ImgDet&w=203&h=203&c=7&dpr=1.3',
    },
    {
      id: 3,
      uri: 'https://th.bing.com/th/id/OIP.EU1moZSyk3DDZsVauc4iFgAAAA?pid=ImgDet&w=203&h=203&c=7&dpr=1.3',
    },
    {
      id: 4,
      uri: 'https://th.bing.com/th/id/OIP.pOS9pa74mD-QIt0sChXMOgHaHa?pid=ImgDet&w=203&h=203&c=7&dpr=1.3',
    },
    {
      id: 5,
      uri: 'https://th.bing.com/th/id/OIP.dMKV_hSrxiPyo2Xr2LZkVwHaHa?pid=ImgDet&w=203&h=203&c=7&dpr=1.3',
    },
    {
      id: 6,
      uri: 'https://th.bing.com/th/id/OIP.ZoXNFMbIvkoLEFzAzEhSwAHaHa?pid=ImgDet&w=203&h=203&c=7&dpr=1.3',
    },
    {
      id: 7,
      uri: 'https://th.bing.com/th/id/OIP.Jz9_KGFn7Js7JstPEkpF2gHaHa?pid=ImgDet&w=203&h=203&c=7&dpr=1.3',
    },
    {
      id: 8,
      uri: 'https://th.bing.com/th/id/OIP.btuu5uSJiuIHr-MMFMUt3AHaHa?pid=ImgDet&w=203&h=203&c=7&dpr=1.3',
    },
  ];
  const handleOnNameChange = (e) => {
    setName(e);
    if (e.length <= 3) {
      setNameErr('min 3 char required');
    } else {
      setValid(true);
      setNameErr('');
    }
  };
  const handleOnContinue = async () => {
    if(!name || name.length < 3 || nameErr.length > 0){
      return;
    }else{
        try {

          let response = await axios.post(`${BackendUrl}/user-profile`, {
            userData:{ id: userData.id,
            name: name,
            email: email,
            profile_pic: profilePic,
            about:'nothing'}
          })
          if (response.status === 200) {
            dispatch(set_state({user:response.data.user}))
            AsyncStorage.setItem('token', userData.id)
            dispatch(user_auth(true))
            // navigation.navigate('Home')
          }
        } catch (error) {
          if (error.response) {
            console.log('error response : ', error.response);
          }else{
            console.log(error);
          }
        }
    }
  }
  const [profilePic, setProfilePic] = useState(pics[0].uri);
  return (
    <ImageBackground source={{uri: bgcolor2}} style={tw`flex-1`}>
    <View style={tw`flex-1 bg-gray-800`}>
      <View style={tw` w-[90%] flex m-auto rounded-lg p-5 gap-3 `}>
        <View style={tw`relative`}>
          <Image
            source={{
              uri: profilePic,
            }}
            style={tw`w-30 rounded-full border-4 border-green-500 h-30 m-auto`}></Image>
          <View
            style={tw`absolute bottom-2 right-20 bg-white w-8 h-8 flex justify-center items-center rounded-full`}>
            <Icon name="edit" size={30} style={tw`text-purple-900`} />
          </View>
        </View>
        <View style={tw`flex flex-row flex-wrap gap-2 justify-center `}>
          {pics.map((pics, id) => (
            <TouchableOpacity onPress={() => setProfilePic(pics.uri)} key={id}>
              <Image
                
                source={{uri: pics.uri}}
                style={tw`rounded-full border-2 ${profilePic === pics.uri ? 'border-4 border-green-500 h-15 w-15':'h-15 w-15'}   `}></Image>
            </TouchableOpacity>
          ))}
        </View>
        <View style={tw`flex gap-2`}>
          <View>
            <TextInput
              onChangeText={handleOnNameChange}
              value={name}
              placeholder="name"
              style={tw`border rounded-full p-3 ${nameErr ? 'border-blue-200' : 'border-white'} text-white px-5 text-lg`}
              placeholderTextColor="white"></TextInput>
            <View>
              {
                nameErr ? (<Text style={tw`text-yellow-200 px-5`}>{nameErr}</Text>) : null
              }
            
            </View>
          </View>
          <View>
            <TextInput
              style={tw`border rounded-full p-3 border-white text-white text-lg px-5`}
              placeholderTextColor="white"
              placeholder="email (optional)"></TextInput>
          </View>
          <Pressable
            onPress={handleOnContinue}
            style={tw`rounded-full`}>
            <Text
              style={tw`${name.length < 4 || nameErr ? 'bg-orange-900' : 'bg-orange-700'} text-white text-lg font-medium p-3 text-center rounded-full`}>
              continue
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
    </ImageBackground>
  );
};

export default CreateProfile;
