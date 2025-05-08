import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import tw from 'twrnc';

const VoiceCallScreen = ({route}) => {
    console.log(route);
    const params = route.params;
    const navigation = useNavigation();
    const [isOnSpeaker,setIsOnSpreaker] = useState(false);
    const [isMuted,setIsMuted] = useState(false);
    return (
        <View style={tw`flex-1 bg-gray-900 justify-center items-center`}>
            {/* Profile Picture */}
            <View style={tw`items-center mb-10`}>
                <Image
                    source={{ uri: params.userData.profile_pic || 'https://th.bing.com/th/id/OIP.4IHeOH-UPUURZbTydjezKgHaHa?pid=ImgDet&w=203&h=203&c=7&dpr=1.3' }}
                    style={tw`w-32 h-32 rounded-full mb-4`}
                />
                <Text style={tw`text-white text-xl font-bold`}>{ params.userData?.name || "John Doe"}</Text>
                <Text style={tw`text-gray-400 text-sm`}>Calling...</Text>
            </View>

            {/* Call Controls */}
            <View style={tw`flex-row justify-around w-full px-10`}>
                {/* Mute Button */}
                <TouchableOpacity style={tw`items-center`} onPress={()=>setIsMuted(!isMuted)}>
                    <Icon name={`${isMuted ? 'mic-off' : 'mic'}`} size={30} color="white" />
                    <Text style={tw`text-white text-sm mt-2`}>Mute</Text>
                </TouchableOpacity>

                {/* Speaker Button */}
                <TouchableOpacity style={tw`items-center`} onPress={()=>setIsOnSpreaker(!isOnSpeaker)}>
                    <Icon name={`${isOnSpeaker ? 'volume-up' : 'volume-off'}`} size={30} color="white" />
                    <Text style={tw`text-white text-sm mt-2`}>Speaker</Text>
                </TouchableOpacity>

                {/* End Call Button */}
                <TouchableOpacity onPress={()=> navigation.goBack()} style={tw`items-center bg-red-600 p-4 rounded-full`}>
                    <Icon name="call-end" size={30} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default VoiceCallScreen;