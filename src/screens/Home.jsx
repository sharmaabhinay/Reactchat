import {View, Text, TouchableOpacity, Image, ScrollView, FlatList, StatusBar, ImageBackground} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/Ionicons'
import Contacts from '../components/Contacts';
// import { FlatList } from 'react-native-reanimated/lib/typescript/Animated';

const Home = () => {
  let dumyContacts = [
    {name:'Batman', message : 'Hi', mssgCount:2,mssTime:'03:45'},
    {name:'padman', message : 'feedback ??', mssgCount:1 ,mssTime:'03:45'},
    {name:'Spider man', message : 'I am on top', mssgCount:2,mssTime:'03:45'},
    {name:'Flash', message : 'just arrived andromada glxy', mssgCount:2,mssTime:'03:45'},
    {name:'Batman', message : 'Hi', mssgCount:2,mssTime:'03:45'},
    {name:'Batman', message : 'Hi', mssgCount:2,mssTime:'03:45'},
    {name:'Batman', message : 'Hi', mssgCount:2,mssTime:'03:45'},
    {name:'Batman', message : 'Hi', mssgCount:2,mssTime:'03:45'},
    {name:'Batman', message : 'Hi', mssgCount:2,mssTime:'03:45'},
  ]
  let bgcolor2 =
  'https://w0.peakpx.com/wallpaper/340/856/HD-wallpaper-purple-purple-theme.jpg';
  const Navigation = useNavigation();
  return (
      <ImageBackground source={{uri: bgcolor2}} style={tw`flex-1`}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <View>
          <View style={tw`bg-orange-800 text-white`}>
            <Text>Reactchat</Text>
          </View>
        </View>
      </ImageBackground>
  );
};

export default Home;
