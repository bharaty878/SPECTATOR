import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [schoolid, setSchoolId] = useState("");
    const [loading, setLoading] = useState(false);

    // Check AsyncStorage for user data on mount
    useEffect(() => {
        const checkUserLoggedIn = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                navigation.navigate("Navi");
                console.log("User data found in AsyncStorage:", userData);
            }
        };

        checkUserLoggedIn();
    }, [navigation]);

    const Regis = () => {
        navigation.navigate("Registration");
    }

    const handleLogin = async () => {
        setLoading(true);
        const data = {
            mobile: email,
            password: password,
            school_id: schoolid
        };

        try {
            const response = await axios.post("https://smartcookie.in/core/Version4/spectator_volunteer_login_ws_V2.php", data);
            console.log('Response Data:', response.data);

            // Check if the response has posts and access the first one
            if (response.data && response.data.posts && response.data.posts.length > 0) {
                const post = response.data.posts[0]; // Access the first post
                const fullName = post.FullName || "";
                const points = post.Points || "";
                const IDs = response.data.MemberID || "";


                // Store user data in AsyncStorage
                await AsyncStorage.setItem('userData', JSON.stringify({ fullName, points,IDs }));

                // Confirm data is stored
                const storedData = await AsyncStorage.getItem('userData');
                console.log('Stored Data:', storedData);

                navigation.navigate("Navi", { bata: fullName, point: points });
            } else {
                console.error("No posts found in response", response.data);
            }
        } catch (error) {
            console.error("Error logging in:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <Text style={styles.title0}>Spectator</Text>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.label}>Email/Mobile</Text>
            <TextInput
                style={styles.input}
                placeholder='Enter your email or mobile number'
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={styles.label}>School id</Text>
            <TextInput
                style={styles.input}
                placeholder='Enter your school id'
                placeholderTextColor="#888"
                value={schoolid}
                onChangeText={setSchoolId}
                keyboardType="default"
                autoCapitalize="none"
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder='Enter your password'
                placeholderTextColor="#888"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text style={styles.buttonText}>Login</Text>
                )}
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkContainer} onPress={Regis}>
                <Text style={styles.link}>Don't have an account? Sign Up to Smartcookie</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'black',
    },
    title0: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'orange',
        marginBottom: 30,
        textAlign: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 30,
        textAlign: 'center'
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: 'orange',
        marginBottom: 5,
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    button: {
        backgroundColor: 'orange',
        paddingVertical: 15,
        borderRadius: 8,
        marginBottom: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    linkContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    link: {
        color: 'red',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Login;





