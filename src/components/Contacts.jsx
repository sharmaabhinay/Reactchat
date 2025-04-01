import {View, Text,Image, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native';

const Contacts = ({data}) => {
    const Navigation = useNavigation()
  return (
    <TouchableOpacity onPress={()=> Navigation.navigate('connectedContact', data)} style={tw`flex justify-between flex-row p-2 border-2 border-purple-600 rounded-full my-1`}>
        {/* <View>

        </View> */}
      <View style={tw`flex flex-row gap-2`}>
        <Image
          source={{
            uri: 'https://www.das-macht-schule.net/wp-content/uploads/2018/04/dummy-profile-pic.png',
          }}
          height={50}
          width={50}
          style={tw`rounded-full`}
        />
      <View>
        <Text style={tw`text-lg font-bold text-gray-300`}>{data.name}</Text>
        <Text style={tw`text-sm font-bold text-gray-300`}>{data.message}</Text>
      </View>
      </View>
      <View  style={tw`flex`}>
        <Text style={tw`text-xs bg-purple-400 rounded-full w-3`}>{data.mssgCount}</Text>
        <Text  style={tw`text-xs font-bold text-gray-300`}>{data.mssTime}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Contacts;
