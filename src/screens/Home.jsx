import {View, Text, StatusBar, FlatList, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const dummyContactss = [];
  const dummyContacts = [
    {id: '1', name: 'John Doe', profile_pic:'https://imgcdn.stablediffusionweb.com/2024/9/14/32126d8d-b1ea-4a60-9878-b2f729b566fa.jpg', message: 'Hey, how are you?', time: '10:30 AM'},
    {
      id: '2',
      name: 'Jane Smith',
      profile_pic:'https://th.bing.com/th/id/OIP.ha5IzzCQwmeQ64esmoBdVAHaJ4?pid=ImgDet&w=203&h=270&c=7&dpr=1.3', message: 'Let’s catch up later!',
      time: '9:15 AM',
    },
    {
      id: '3',
      name: 'Alice Johnson',
      profile_pic:'https://th.bing.com/th/id/OIP.FI0MH2oYHHNhJuX7XdjPzQHaHa?pid=ImgDet&w=203&h=203&c=7&dpr=1.3', message: 'Meeting at 3 PM.',
      time: '8:45 AM',
    },
    {
      id: '4',
      name: 'Bob Brown',
      profile_pic:'https://th.bing.com/th/id/OIP.4IHeOH-UPUURZbTydjezKgHaHa?pid=ImgDet&w=203&h=203&c=7&dpr=1.3', message: 'Got the documents.',
      time: 'Yesterday',
    },
    {
      id: '6',
      name: 'Charlie Davis',
      profile_pic:'https://th.bing.com/th/id/OIP.TWt10gqJkkoljj6sZmbNewHaFP?rs=1&pid=ImgDetMain', message: 'See you soon!',
      time: 'Yesterday',
    },
    {id: '7', name: 'bruce lee', profile_pic:'https://th.bing.com/th/id/OIP.Soqtvc8GbISKlazg81TPigHaFy?rs=1&pid=ImgDetMain', message: 'See you soon!', time: 'Yesterday'},
    {id: '8', name: 'amsterdam', profile_pic:'https://th.bing.com/th/id/OIP.NEQcb3Wx1onc0dUg1BDzwQHaE7?pid=ImgDet&w=203&h=135&c=7&dpr=1.3', message: 'See you soon!', time: 'Yesterday'},
    {id: '9', name: 'superman', profile_pic:'https://th.bing.com/th/id/OIP.hPh-Wq9GkCnU_1lKWa25GQHaLH?pid=ImgDet&w=203&h=304&c=7&dpr=1.3', message: 'See you soon!', time: 'Yesterday'},
    {id: '10', name: 'spiderman', profile_pic:'https://th.bing.com/th/id/OIP.IsXSJTojjI8_76g93ChW_AHaE8?pid=ImgDet&w=203&h=135&c=7&dpr=1.3', message: 'See you soon!', time: 'Yesterday'},
    {id: '12', name: 'dr doom', profile_pic:'https://th.bing.com/th/id/OIP.aAlZJoLoK1Y9i96GPheTCgHaHa?pid=ImgDet&w=203&h=203&c=7&dpr=1.3', message: 'See you soon!', time: 'Yesterday'},
    {id: '13', name: 'padman', profile_pic:'https://th.bing.com/th/id/OIP.7B_aBzwOApSA5-JsJIUb2wHaHa?pid=ImgDet&w=203&h=203&c=7&dpr=1.3', message: 'See you soon!', time: 'Yesterday'},
    {id: '14', name: 'aquaman', profile_pic:'https://th.bing.com/th/id/OIP.nDfebrOr7hgAsbdOHCxTVgHaHc?pid=ImgDet&w=203&h=204&c=7&dpr=1.3', message: 'See you soon!', time: 'Yesterday'},
    {id: '15', name: 'jhaa 2', profile_pic:'https://th.bing.com/th/id/OIP.vUf_14myfbVJAfC4GWv9TQHaHw?pid=ImgDet&w=203&h=212&c=7&dpr=1.3', message: 'See you soon!', time: 'Yesterday'},
    {id: '16', name: 'random', profile_pic:'https://th.bing.com/th/id/OIP.80vCHDFF7x2gZ3kmJFPXTAHaE8?pid=ImgDet&w=203&h=135&c=7&dpr=1.3', message: 'See you soon!', time: 'Yesterday'},
  ];
  return (
    <SafeAreaView style={tw`pb-20`}>
      <StatusBar barStyle="light-content" backgroundColor="#101828" />
      <View style={tw`bg-gray-900`}>
        <View>
          <Text style={tw`text-lg pb-4 text-white`}>Reactchat</Text>
        </View>
      </View>
      {/* messages and content section */}
      <View style={tw`relative my-1`}>
        {dummyContacts.length == 0 ? (
          <View style={tw`bg-gray-700 h-full flex items-center justify-center`}>
            <Text style={tw`text-xl font-medium text-white`}>welcome to reactchat</Text>
            <Text style={tw`text-sm text-gray-400`}>
              No messages yet. Start chatting with your friends!
            </Text>
          </View>
        ) : (
          <FlatList
            data={dummyContacts}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
              onPress={()=> navigation.navigate('singleChat', {item})}
                style={tw`flex flex-row items-center justify-between p-4 border-b border-red-800 mx-1 rounded-lg`}>
                <View style={tw`flex flex-row items-center`}>
                  <Image source={{uri:item.profile_pic}} style={tw`bg-gray-200 rounded-full w-12 h-12 mr-4
                    `} />
                  <View>
                    <Text style={tw`text-black text-lg font-semibold`}>
                      {item.name}
                    </Text>
                    <Text style={tw`text-gray-400`}>{item.message}</Text>
                  </View>
                </View>
                <Text style={tw`text-gray-500 text-sm`}>{item.time}</Text>
              </TouchableOpacity>
            )}
          />
        )}
        <TouchableOpacity onPress={()=>alert('added')} style={tw``}>
          <Icon name="person-add" size={30} color="white" style={tw`absolute bottom-15 right-10 rounded-full p-2 bg-purple-900`} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
