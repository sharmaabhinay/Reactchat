import {View, Text, Image, TextInput, ScrollView, FlatList, ImageBackground} from 'react-native';
import React, {useEffect, useState} from 'react';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/AntDesign';

let user = {
  name: 'kaju1',
};
// import socketConnection from '../components/Socket';

// var socket = socketConnection();
// socket()
const ConnectedContact = ({data}) => {
  const [bgForMe, setBgForMe] = useState('bg-purple-600');
  const [inputValue, setInput] = useState('');
  let [tempC, setTempC] = useState({});
  const [chat, setChat] = useState([]);
  const [scrollDirection,setScrollDirection] = useState("")
  const [scrollingValue,setScrollingValue] = useState(0);
  const [lastScrolledValue,setLastScrolledValue] = useState(0)
  const [globalSocket, setGlobalSocket] = useState();
  const [connectionStatus, setConnectionStatus] = useState('connecting...');
  const Tarik = Date();


  // useEffect(() => {
  //   socket.emit('joined', {user});7
  //   socket.on('connected', data => {});
  //   socket.on('userJoined', data => {
  //     console.log(data);
  //   });
  //   socket.on('welcome', data => {
  //     if (data) {
  //       setConnectionStatus('connected');
  //     } else {
  //       setConnectionStatus('failed');
  //     }
  //   });
  //   socket.on('new-message', data => {
  //     setTempC(data);
  //   });
  // }, [user.name]);

  const [messages, setMessages] = useState([]);
  console.log(data)
  let temp = [
    {
      id: 1,
      To: 'me',
      from: 'frnd',
      message: 'Hii',
      time: '03:45',
      isDelivered: null,
      isRead: null,
    },
    {
      id: 2,
      To: 'ffrnd',
      from: 'me',
      message: 'Yes?',
      time: '03:45',
      isDelivered: null,
      isRead: null,
    },
    {
      id: 3,
      To: 'me',
      from: 'frnd',
      message: 'Is this the right time to ',
      time: '03:45',
      isDelivered: null,
      isRead: null,
    },
    {
      id: 4,
      To: 'me',
      from: 'frnd',
      message: 'Talk to you',
      time: '03:45',
      isDelivered: null,
      isRead: null,
    },
    {
      id: 5,
      To: 'frnd',
      from: 'me',
      message: 'It depends on the topic',
      time: '03:45',
      isDelivered: null,
      isRead: null,
    },
    {
      id: 6,
      To: 'me',
      from: 'frnd',
      message: 'Its nothing like that',
      time: '03:45',
      isDelivered: null,
      isRead: null,
    },
    {
      id: 7,
      To: 'me',
      from: 'frnd',
      message: 'what are you thking about',
      time: '03:45',
      isDelivered: null,
      isRead: null,
    },
    {
      id: 8,
      To: 'frnd',
      from: 'me',
      message: 'ok, go ahead',
      time: '03:45',
      isDelivered: null,
      isRead: null,
    },
    {
      id: 9,
      To: 'me',
      from: 'frnd',
      message: 'Thanks',
      time: '03:45',
      isDelivered: null,
      isRead: null,
    },
    {
      id: 10,
      To: 'me',
      from: 'frnd',
      message:
        'So, one day i was thinking about that, What if i kick you for your rude behavior',
      time: '03:45',
      isDelivered: null,
      isRead: null,
    },
    {
      id: 1,
      To: 'me',
      from: 'frnd',
      message: 'Hii',
      time: '03:45',
      isDelivered: null,
      isRead: null,
    },
    {
      id: 2,
      To: 'ffrnd',
      from: 'me',
      message: 'Yes?',
      time: '03:45',
      isDelivered: null,
      isRead: null,
    },
    {
      id: 3,
      To: 'me',
      from: 'frnd',
      message: 'Is this the right time to ',
      time: '03:45',
      isDelivered: null,
      isRead: null,
    },
    {
      id: 4,
      To: 'me',
      from: 'frnd',
      message: 'Talk to you',
      time: '03:45',
      isDelivered: null,
      isRead: null,
    },
    {
      id: 5,
      To: 'frnd',
      from: 'me',
      message: 'It depends on the topic',
      time: '03:45',
      isDelivered: null,
      isRead: null,
    },
    {
      id: 6,
      To: 'me',
      from: 'frnd',
      message: 'Its nothing like that',
      time: '03:45',
      isDelivered: null,
      isRead: null,
    },
    {
      id: 7,
      To: 'me',
      from: 'frnd',
      message: 'what are you thking about',
      time: '03:45',
      isDelivered: null,
      isRead: null,
    },
    {
      id: 8,
      To: 'frnd',
      from: 'me',
      message: 'ok, go ahead',
      time: '03:45',
      isDelivered: null,
      isRead: null,
    },
    {
      id: 9,
      To: 'me',
      from: 'frnd',
      message: 'Thanks',
      time: '03:45',
      isDelivered: null,
      isRead: null,
    },
    {
      id: 10,
      To: 'me',
      from: 'frnd',
      message:
        'So, one day i was thinking about that, What if i kick you for your rude behavior',
      time: '03:45',
      isDelivered: null,
      isRead: null,
    },
  ];
  const handleOnscrollToTop = (e)=>{
    let currentYOffset= e.nativeEvent.contentOffset.y;
    if(currentYOffset < lastScrolledValue){
      setScrollDirection('up')
    }else if(currentYOffset > lastScrolledValue){
      setScrollDirection('down')
    }
    setLastScrolledValue(currentYOffset);
  }

  const handleOnSend = () => {
    socket.emit('message-send', {user, message: inputValue});
  };
  return (
    // <ImageBackground source={{uri:'https://e1.pxfuel.com/desktop-wallpaper/935/323/desktop-wallpaper-25th-anniversary-pokemon-colourised-1080-x-2220-amoledbackgrounds-pokemon-oled-phone-thumbnail.jpg'}} style={tw`h-full`}>

    <View style={tw`bg-gray-900 h-full`}>
      <View style={tw`${scrollDirection == 'down' ? '-mt-14' :null } w-full`}>
        <View
          style={[tw`bg-gray-200  p-2 w-[80%] m-auto rounded-full flex flex-row items-center justify-between`]}>
          <View style={tw`flex flex-row items-center gap-3`}>
            <Image
              source={{
                uri: 'https://www.das-macht-schule.net/wp-content/uploads/2018/04/dummy-profile-pic.png',
              }}
              height={40}
              width={40}
              style={tw`rounded-full border-2 border-purple-700`}
            />
            <View style={tw`leading-5`}>
              <Text
                style={tw`text-sm font-bold`}
                onPress={() => console.log(messages)}>
                John Doe Jior
              </Text>
              <Text style={tw`text-xs`}>{connectionStatus}</Text>
            </View>
          </View>
          <View style={tw`flex flex-row items-center gap-5`}>
            {/* <Icon name="user" size={40} color="black" /> */}
            {/* <Icon name="bell" size={50} color="red" />
      <Icon name="heart" size={60} color="pink" /> */}
            <Text onPress={() => console.log(temp)}>📞</Text>
            <Text>📷</Text>
            <Text>🍔</Text>
          </View>
        </View>
      </View>
      {/* <FlatList
        data={messages}
        keyExtractor={data}
        renderItem={({ data }) => (
          <View>
            <Text>{data.content}</Text>
          </View>
        )}
       /> */}
      <ScrollView style={tw`p-2 mb-2`} onScroll={handleOnscrollToTop}>
        {Array.isArray(temp) && temp.length > 0 ? (
          temp.map((item, i) => (
            <View
              key={i}
              style={tw`flex flex-row my-1 ${
                item.from === 'me' ? 'justify-end' : ' justify-start'
              }`}>
              <Text
                style={tw`text-black p-2 rounded-lg px-4 ${
                  item.from === 'me' ? `${bgForMe} ` : 'bg-gray-300'
                }`}>
                {item.message}
              </Text>
            </View>
          ))
        ) : (
          <Text
            style={tw`text-gray-500 text-center`}
            onPress={() => console.log(tempC)}>
            No messages
          </Text>
        )}
      </ScrollView>

      {/* <View> */}
      <View style={tw`mb-2 ${scrollDirection == 'up' ? '-mb-12' : null}   w-full`}>
        <View style={tw`flex flex-row gap-3 items-center m-auto w-[80%]`}>
          <Text style={tw`w-[15%]`}>🔗</Text>
          <TextInput
            value={inputValue}
            onChangeText={e => setInput(e)}
            style={tw`border-2 px-3 bg-gray-300 rounded-full border-white w-[70%] focus:border-purple-700`}
            placeholder="start your holy conversation"></TextInput>
          <Text style={tw`w-[15%]`} onPress={handleOnSend}>
            ✈️
          </Text>
        </View>
      </View>
      {/* </View> */}
    </View>
    // </ImageBackground>
  );
  videi;
};

export default ConnectedContact;
