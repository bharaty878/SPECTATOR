import React, { useRef, useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Button, StatusBar, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define a list of image sources
const images = [
  require('../images/img1.jpg'),
  require('../images/img2.jpg'),
  require('../images/img3.jpg'),
  require('../images/img4.jpg'),
  require('../images/img5.jpg'),
  require('../images/img6.jpg'),
  require('../images/img7.jpg'),
  require('../images/img8.jpg'),
  require('../images/img9.jpg'),
  require('../images/img10.jpg'),
  require('../images/img11.jpg'),
  require('../images/img12.jpg'),
  require('../images/img13.jpg'),
];

// Function to repeat the image array
const repeatImages = (images, times) => {
  return Array(times).fill(images).flat();
};

const repeatedImages = repeatImages(images, 3); // Repeat images array 3 times

const Dashboard = ({ navigation }) => {
  const scrollViewRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [selectedValue, setSelectedValue] = useState("boxing");

  // State variables for input fields
  const [points, setPoints] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [playerNo, setPlayerNo] = useState('');
  
  // State variables for loading and user data
  const [loading, setLoading] = useState(false);
  const [userFullName, setUserFullName] = useState('');
  const [userPoints, setUserPoints] = useState('');
  const[Userid,setUserId]=useState("");

  // Width of the image and margin
  const imageWidth = 200;
  const imageMargin = 10;
  const scrollAmount = imageWidth + imageMargin * 2;

  // Function to scroll to the next image
  const scrollNext = () => {
    if (scrollViewRef.current) {
      const newOffset = scrollOffset + scrollAmount;
      if (newOffset < (repeatedImages.length * scrollAmount)) {
        scrollViewRef.current.scrollTo({ x: newOffset, animated: true });
        setScrollOffset(newOffset);
      } else {
        scrollViewRef.current.scrollTo({ x: 0, animated: true });
        setScrollOffset(0);
      }
    }
  };

  // Function to scroll to the previous image
  const scrollPrev = () => {
    if (scrollViewRef.current) {
      const newOffset = scrollOffset - scrollAmount;
      if (newOffset >= 0) {
        scrollViewRef.current.scrollTo({ x: newOffset, animated: true });
        setScrollOffset(newOffset);
      } else {
        scrollViewRef.current.scrollTo({ x: (repeatedImages.length - 1) * scrollAmount, animated: true });
        setScrollOffset((repeatedImages.length - 1) * scrollAmount);
      }
    }
  };

  // Effect to automatically scroll every 1.5 seconds
  useEffect(() => {
    const id = setInterval(scrollNext, 1500); // 1500 milliseconds = 1.5 seconds
    return () => clearInterval(id); // Clean up interval on component unmount
  }, [scrollOffset]);

  // Effect to check user data from AsyncStorage
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        setUserFullName(parsedData.fullName);
        setUserPoints(parsedData.points);
        setUserId(parsedData.IDs);

        console.log("User data found in AsyncStorage:", parsedData);
      }
    };

    checkUserLoggedIn();
  }, []);

  // Update scroll offset based on user scrolling
  const onScroll = (event) => {
    setScrollOffset(event.nativeEvent.contentOffset.x);
  };

  // Updated Assign function to use state values
  const Assign = async () => {
    setLoading(true); // Start loading

    try {
      const response = await fetch('https://smartcookie.in/core/Version4/AssignPointsToPlayerAPI.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          PlayerName: playerName,
          PlayerNo: playerNo,
          SportsName: selectedValue,
          Points: points,
          MemberID: playerId,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      if (result.responseStatus === 200) {
        console.log(result);
        Alert.alert("Success", "Points have been transferred successfully");
      } else {
        throw new Error(result.responseMessage || 'Failed to fetch data');
      }
    } catch (error) {
      console.error(error.message);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  }

  const Logouts = async () => {
    // Clear user data from AsyncStorage
    await AsyncStorage.removeItem('userData');
    
    // Navigate back to the Login screen
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.header}>
        <Text style={styles.usernameText}>{userFullName}</Text>
        <Text style={styles.usernameText}>Player ID:{Userid}</Text>
      </View>
      
      <View style={styles.carouselContainer}>
        <TouchableOpacity onPress={scrollPrev} style={styles.carouselButton}>
          <Icon name="chevron-back" size={30} color="orange" />
        </TouchableOpacity>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollContainer}
        >
          {repeatedImages.map((source, index) => (
            <Image
              key={index}
              source={source}
              style={styles.image}
            />
          ))}
        </ScrollView>
        <TouchableOpacity onPress={scrollNext} style={styles.carouselButton}>
          <Icon name="chevron-forward" size={30} color="orange" />
        </TouchableOpacity>
      </View>

      <ScrollView>    
      <View style={styles.formContainer}>
        <Text style={styles.points}>Total Points: {userPoints}</Text>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
        >
          <Picker.Item label="Wrestling" value="wrestling" />
          <Picker.Item label="Basketball" value="Basketball" />
          <Picker.Item label="Football" value="Football" />
          <Picker.Item label="Hockey" value="Hockey" />
          <Picker.Item label="Weight-Lifting" value="Weight-Lifting" />
          <Picker.Item label="Kabaddi" value="Kabaddi" />
          <Picker.Item label="Kho-Kho" value="Kho-Kho" />
          <Picker.Item label="Volleyball" value="Volleyball" />
          <Picker.Item label="Athletics" value="Athletics" />
          <Picker.Item label="Volunteer" value="Volunteer" />
        </Picker>
        <TextInput
          style={styles.textInput}
          placeholder="Enter points to Reward"
          placeholderTextColor="#888"
          value={points}
          onChangeText={setPoints}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Enter player name"
          placeholderTextColor="#888"
          value={playerName}
          onChangeText={setPlayerName}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Enter player Id"
          placeholderTextColor="#888"
          value={playerId}
          onChangeText={setPlayerId}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Enter player No."
          placeholderTextColor="#888"
          value={playerNo}
          onChangeText={setPlayerNo}
          keyboardType="numeric"
        />
        <Button title='Submit' color="black" onPress={Assign} disabled={loading} />
        {loading && <ActivityIndicator size="small" color="#0000ff" style={styles.activityIndicator} />}
      </View>
      </ScrollView>
      <Button title='Logout' color={"green"} onPress={Logouts} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  header: {
    marginTop: "10%",
    marginBottom: 2,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'orange',
    paddingBottom: 10,
  },
  usernameText: {
    color: 'green',
    fontSize: 24,
    fontWeight: '600',
  },
  carouselContainer: {
    marginTop: "1%",
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  carouselButton: {
    padding: 10,
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 500,
    height: 190,
    borderRadius: 15,
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  formContainer: {
    flex: 1,
    marginTop: -120,
    backgroundColor: "orange",
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  points: {
    marginTop: "50%",
    color: "#fff",
    fontSize: 18,
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#fff',
    backgroundColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
  },
  textInput: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    margin: 10,
    backgroundColor: "#fff",
    color: '#000',
  },
  activityIndicator: {
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default Dashboard;














