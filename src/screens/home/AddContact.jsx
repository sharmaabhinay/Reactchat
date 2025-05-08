import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import tw from 'twrnc';
import BackendUrl from '../../components/BackendUrl';
import { useDispatch, useSelector } from 'react-redux';
import { refreshContacts } from '../../redux/user/userData/action';

const AddContact = () => {
  let dispatch = useDispatch();
    let user = useSelector(state => state.userDetail);
    let userId = user.id;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneErr, setPhoneErr] = useState('');
  const [loading, setLoading] = useState(false);

  const getcontacts =async  ()=> {
      try {
        let response = await axios.post(`${BackendUrl}/get-contacts`, {
          userId: userId
        })
        if (response.status === 200) {
          console.log('user data : ', response.data);
          dispatch(refreshContacts(response.data.contacts));
        }
      } catch (error) {
        console.log('error : ', error);
        
      }
    }

  const handleAddContact = async () => {
    if (phone.length < 3) {
      Alert.alert('Phone number must be 3 digits long');
      return;
    }
    try {
        let response = await axios.post(`${BackendUrl}/add-to-contact` , {
            phone:phone,
            name:name,
            userId: userId
        })
        console.log('response : ', response);
        if(response.status === 200) {
            getcontacts()
            alert('Contact Added Successfully')
        }else{
            alert('Contact Not Added')
        }
        
    } catch (error) {
        if(error.response.status === 409) {
            setPhoneErr('Contact Already Exist')
        }else if(error.response.status === 404) {
            setPhoneErr('User Not Found')
        }else{
            console.log('error : ', error);
        }
        
    }
  };
  const handleSetPhone = (text) => {
    setPhone(text);
    if (text.length < 3) {
      setPhoneErr('Phone number must be 3 digits long');
    } else {
      setPhoneErr('');
    }
  }

  return (
    <View style={tw`flex-1 bg-gray-800`}>
      <View>
        <Text style={tw`text-white text-2xl font-bold text-center mt-4`}>
          Add New Contact
        </Text>
        <View style={tw`p-4`}>
          <TextInput
            style={tw`bg-gray-700 text-white p-2 rounded mb-4`}
            placeholder="Name (Optional)"
            placeholderTextColor="#ccc"
            value={name}
            onChangeText={setName}
          />
          <View style={tw`flex flex-col`}>
            <TextInput
              style={tw`bg-gray-700 text-white p-2 rounded mb-4`}
              placeholder="Phone Number"
              placeholderTextColor="#ccc"
              value={phone}
              onChangeText={handleSetPhone}
              keyboardType="phone-pad"
              maxLength={10}
              autoCompleteType="tel"
            />
            <View>
              <Text style={tw`text-orange-400 relative -top-4 px-2 text-xs`}>{phoneErr}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={tw`bg-blue-500 p-3 rounded ${phone.length < 3 ? 'opacity-50' : ''}`}
            onPress={handleAddContact}>
            <Text style={tw`text-white text-center font-bold`}>
              Add Contact
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddContact;
