import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

const File = ({route, navigation}) => {
  const {imageUri, sender, receiver, receiveImage} = route.params || {};
  // let newImageData = {
  //   content: imageUri.path

  // }
  const uploadImage = async () => {

    
    // const formData = new FormData();
    // formData.append('file', {
    //   uri: imageUri.path,
    //   type: 'image/jpeg', // Adjust the type based on your image format
    //   name: 'image.jpg',
    // });
    // formData.append('upload_preset', 'Reactchat'); // 🔥 move outside file object
    // formData.append('cloud_name', 'dpybzn1oa'); 

    // try {
    //   const response = await axios.post(
    //   'https://api.cloudinary.com/v1_1/dpybzn1oa/image/upload',
    //   formData,
    //   {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   }
    // );
    //   receiveImage(imageUri.path)
    //   navigation.goBack()
    //   console.log('Image uploaded successfully:', response.data.url);
    // } catch (error) {
    //   console.error('Error uploading image:', error);
    // }
    receiveImage(imageUri.path)
    navigation.goBack()
  };
  

  return (
    <View style={tw`flex-1 bg-gray-900 justify-center items-center`}>
      {imageUri ? (
        <>
          <View style={tw`flex justify-start w-full px-6 mb-5`}>
            <Icon
              name="close"
              size={34}
              style={tw`relative left-0`}
              color="white"
              onPress={() => navigation.goBack()}
            />
          </View>
          <Image
            source={{uri: imageUri.path}}
            style={tw`w-[100%] h-[80%] rounded-lg mb-6`}
            resizeMode="contain"
          />
          {/* <Text style={tw`text-lg font-bold mb-4`}>Image Selected</Text> */}
          {/* <TouchableOpacity
            style={tw`bg-orange-600 w-full items-center px-6 py-3 rounded-full`}
            onPress={() => navigation.goBack()}>
            <Text style={tw`text-white text-base font-semibold`}>send</Text>
          </TouchableOpacity> */}
          <View
            style={tw`flex-row items-center justify-between w-full px-6 mt-4`}>
            <TouchableOpacity style={tw`bg-gray-500 p-2 px-4 rounded-full`}>
              <Text>To {receiver.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`bg-orange-600  items-center px-6 py-2 rounded-full`}
              onPress={uploadImage}>
              <Icon name="send" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={tw`text-gray-500 text-lg`}>No image selected.</Text>
      )}
    </View>
  );
};

export default File;
