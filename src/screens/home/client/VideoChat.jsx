import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const VideoChat = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            {/* Video Stream */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 18 }}>Video Stream Placeholder</Text>
            </View>

            {/* User Info */}
            <View style={{ position: 'absolute', top: 20, left: 20, flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/50' }}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                />
                <Text style={{ color: '#fff', marginLeft: 10, fontSize: 16 }}>User Name</Text>
            </View>

            {/* Buttons */}
            <View style={{ position: 'absolute', bottom: 30, width: '100%', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <TouchableOpacity style={{ backgroundColor: '#f00', padding: 15, borderRadius: 50 }}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>End</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: '#555', padding: 15, borderRadius: 50 }}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>Mute</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: '#555', padding: 15, borderRadius: 50 }}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: '#555', padding: 15, borderRadius: 50 }}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>Chat</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default VideoChat;