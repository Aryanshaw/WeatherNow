/* eslint-disable prettier/prettier */

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
  TextInput,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';

const MainScreen = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mydata, setmydata] = useState([]);
  //   const [backgroundImage, setBackgroundImage] = useState(null);

  const api = {
    // key: '96fb2b829ba232491fb9bd18e1b7bcb8',
    key: 'a0a38a9e46874580af6212255220108',
    // baseUrl: 'http://api.weatherstack.com/',
    baseUrl: 'https://api.weatherapi.com/v1',
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    setLoading(true);
    setInput('');
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${api.key}&q=${input}&aqi=no`,
      );

      const realData = await response.json();
      setmydata(realData);
      console.log(realData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const image = {
    uri: 'https://iphoneswallpapers.com/wp-content/uploads/2020/09/Aesthetic-Nature-iPhone-Wallpaper.jpg',
  };

  return (
    <View style={styles.root}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={styles.imageBackground}>
        <View>
          {/* <Text>Weather</Text> */}
          <TextInput
            placeholder="Enter city name and press.. "
            onChangeText={text => setInput(text)}
            value={input}
            placeholderTextColor={'black'}
            style={styles.textInput}
            onSubmitEditing={getUserData}
          />
        </View>
        {loading && (
          <View>
            <ActivityIndicator size={'large'} color="#000" />
          </View>
        )}
        {mydata && (
          // {input ,&& (
          <View style={styles.infoView}>
            <Text
              style={
                styles.citytext
              }>{`${mydata?.location?.name}, ${mydata?.location?.country}`}</Text>
            <Text style={styles.date}>{`${mydata?.location?.localtime}`}</Text>
            <Text style={styles.temp}>
              {`${Math.round(mydata?.current?.temp_c)} °C`}
            </Text>
            <Image
              style={{marginTop: 20}}
              source={{
                uri: `https://${mydata?.current?.condition?.icon}`,
                width: 120,
                height: 120,
              }}
            />
            <Text
              style={
                styles.description
              }>{`${mydata?.current?.condition?.text}`}</Text>

            {/* </View> */}
          </View>
          // )}
        )}
      </ImageBackground>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    flexDirection: 'column',
  },
  textInput: {
    color:"black",
    borderBottomWidth: 3,
    padding: 25,
    paddingVertical: 15,
    marginVertical: 100,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    fontSize: 19,
    borderRadius: 16,
    borderBottomColor: '#df8c00',
  },
  infoView: {
    alignItems: 'center',
  },
  citytext: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    paddingHorizontal: 12,
  },
  date: {
    color: '#fff',
    fontSize: 22,
    marginVertical: 10,
  },
  temp: {
    fontSize: 45,
    color: '#fff',
    marginVertical: 10,
  },
  description: {
    color: '#fff',
    fontSize: 28,
    marginVertical: 20,
    // fontWeight: '500',
  },
  weatherImage: {
    height: 50,
    width: 50,
    // zIndex:1,
    // flex: 1
  },
});
