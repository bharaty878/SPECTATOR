import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Image, Dimensions, Button, Alert } from 'react-native';
import axios from 'axios';

const { width } = Dimensions.get('window');

const Rewards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define an async function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.post('https://dev.smartcookie.in/core/Version3/softrewardslist_API.php', {
          user_type: 'student'
        });
        if (response.data.responseStatus === 200) {
          setData(response.data.posts); // Set the posts from the response
        } else {
          setError('Failed to fetch data.');
        }
        setLoading(false); // Stop loading indicator
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    // Call the async function
    fetchData();
  }, []);

  const handlePurchase = async (softrewardId) => {
    try {
      const response = await axios.post('https://dev.smartcookie.in/core/Version4/purchase_soft_reward_spectator_API.php', {
        softreward_id: softrewardId,
        MemberID: '1'  // Replace with actual member ID if needed
      });
      if (response.data.responseStatus === 200) {
        Alert.alert('Success', 'Purchase successful!');
      } else {
        Alert.alert('Error', 'Failed to make the purchase.');
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.softrewardId.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagepath }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.rewardType}>{item.rewardType}</Text>
              <Text style={styles.fromRange}>From: {item.fromRange}</Text>
              <Button
                title='Purchase'
                onPress={() => handlePurchase(item.softrewardId)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#000',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
    width: width - 40,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '30%',
    height: 150,
    alignSelf:"center"
  },
  textContainer: {
    padding: 15,
  },
  rewardType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    alignSelf:"center"
  },
  fromRange: {
    fontSize: 16,
    color: '#666',
  },
});

export default Rewards;
