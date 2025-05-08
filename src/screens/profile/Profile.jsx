import React from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import { useDispatch } from 'react-redux';
import tw from 'twrnc';
import { user_auth } from '../../redux/user/userData/action';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {BlurView} from '@react-native-community/blur';

const Profile = () => {
    let dispatch = useDispatch()
    let navigation = useNavigation();
  const handleOnLogout = () => {
    AsyncStorage.removeItem('token');
    dispatch(user_auth(false));
    // alert('Logout Successfully')
    // navigation.replace('Signin')
  };
  return (
    <ScrollView style={tw`flex-1 bg-white`}>
        {/* <BlurView
        style={tw`absolute top-0 left-0 right-0`}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      /> */}
      <View style={tw`items-center p-6`}>
        <Image
          source={{uri: 'https://via.placeholder.com/150'}}
          style={tw`w-32 h-32 rounded-full`}
        />
        <Text style={tw`text-xl font-bold mt-4`}>John Doe</Text>
        <Text style={tw`text-gray-500`}>johndoe@example.com</Text>
      </View>

      <View style={tw`px-6`}>
        <TouchableOpacity style={tw`bg-blue-500 p-4 rounded-lg mb-4`}>
          <Text style={tw`text-white text-center font-bold`}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`bg-gray-200 p-4 rounded-lg mb-4`}>
          <Text style={tw`text-center font-bold`}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`bg-red-500 p-4 rounded-lg`}>
          <Text
            style={tw`text-white text-center font-bold`}
            onPress={handleOnLogout}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;
