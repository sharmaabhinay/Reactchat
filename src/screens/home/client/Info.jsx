import React from 'react';
import tw from 'twrnc';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import BackendUrl from '../../../components/BackendUrl';
import { useDispatch, useSelector } from 'react-redux';
import { refreshContacts } from '../../../redux/user/userData/action';
import { useNavigation, CommonActions } from '@react-navigation/native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const FriendDetails = ({ route }) => {
    let dispatch = useDispatch();
    let navigation = useNavigation()
    let user = useSelector(state => state.userDetail);
    let userId = user.id;
    const getcontacts =async  ()=> {
        try {
          let response = await axios.post(`${BackendUrl}/get-contacts`, {
            userId: userId
          })
          if (response.status === 200) {
            dispatch(refreshContacts(response.data.contacts));
          }
        } catch (error) {
          console.log('error : ', error);
          
        }
      }
    const handleOnDelete = async ()=>{
        try{
            let response = await axios.post(`${BackendUrl}/remove-contact`,{
                userId: userId,
                friendId: route?.params?.userData?._id
            })
            if(response.status === 200) {
                // getcontacts()
                alert('Contact Deleted Successfully')
                navigation.getParent().dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{ name: 'HomeChats' }],
                    })
                  );
            }

        }catch(error){
            console.log('error : ', error);
        }
    }

    let friend = route?.params?.userData;
    return (
        <SafeAreaView>
        {/* <ScrollView style={{ flex: 1, backgroundColor: '#f9f9f9' }}> */}
            <View style={{ alignItems: 'center', padding: 20 }}>
                <Image
                    source={{ uri: friend?.profile_pic || 'https://www.das-macht-schule.net/wp-content/uploads/2018/04/dummy-profile-pic.png' }}
                    style={{ width: 120, height: 120, borderRadius: 60, marginBottom: 20 }}
                />
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>
                    {friend?.name || 'Dummy'}
                </Text>
                <Text style={{ fontSize: 16, color: '#666', marginTop: 5 }}>
                    {friend?.location || 'Unknown Location'}
                </Text>
            </View>

            <View style={{ paddingHorizontal: 20 }}>
                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: '#444' }}>
                        Phone
                    </Text>
                    <Text style={{ fontSize: 16, color: '#666', marginTop: 5 }}>
                        {friend?.phone || 'No phone number available'}
                    </Text>
                </View>

                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: '#444' }}>
                        About
                    </Text>
                    <Text style={{ fontSize: 16, color: '#666', marginTop: 5 }}>
                        {friend?.about || 'No about information available'}
                    </Text>
                </View>

                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: '#444' }}>
                        Email
                    </Text>
                    <Text style={{ fontSize: 16, color: '#666', marginTop: 5 }}>
                        {friend?.email || 'No email available'}
                    </Text>
                </View>

                <View style={{ marginBottom: 15 }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: '#444' }}>
                        Location
                    </Text>
                    <Text style={{ fontSize: 16, color: '#666', marginTop: 5 }}>
                        {friend?.location || 'No location available'}
                    </Text>
                </View>
            </View>
            <TouchableOpacity onPress={handleOnDelete} style={tw`bg-red-500 w-[90%] mx-auto rounded-lg`}>
                <Text style={tw`text-center p-4 text-white`}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    backgroundColor: '#007bff',
                    padding: 15,
                    borderRadius: 10,
                    margin: 20,
                    alignItems: 'center',
                }}
                onPress={() => navigation.goBack()}
            >
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
                    Back to Chat
                </Text>
            </TouchableOpacity>
        {/* </ScrollView> */}
        </SafeAreaView>
    );
};

export default FriendDetails;