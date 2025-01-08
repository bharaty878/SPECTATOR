import React, { useState } from 'react';
import { 
    ActivityIndicator, 
    Alert, 
    Button, 
    StyleSheet, 
    Text, 
    TextInput, 
    View, 
    TouchableOpacity, 
    StatusBar 
} from 'react-native';
import axios from 'axios';

const Registration = ({ navigation }) => {
    const [Category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [schoolId, setSchoolId] = useState("");
    const [loading, setLoading] = useState(false);

    const Regis=()=>{
        navigation.navigate("Login")
   }

    const handleLogin = async () => {
        if (!Category || !name || !mobile || !password || !schoolId) {
            Alert.alert("Validation Error", "Please fill in all fields.");
            return;
        }

        const data = {
            category: Category,
            user_name: name,
            mobile: mobile,
            password: password,
            school_id: schoolId,
        };

        setLoading(true);
        
        try {
            const response = await axios.post("https://smartcookie.in/core/Version4/SpectatorRegistrationAPI_V2.php", data);

            console.log("API Response:", response.data); // Log the response to inspect it

            if (response.data.responseStatus === 200) {
                Alert.alert("Successfully Registered");
                
            } else {
                Alert.alert("Error", response.data.responseMessage || "Unexpected response.");
            }
        } catch (error) {
            Alert.alert("Error", "An error occurred during registration. Please try again.");
            console.error("Error logging in:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <Text style={styles.title0}>Spectator</Text>
            <Text style={styles.title}>Registration</Text>
            <Text style={styles.label}>Category</Text>
            <TextInput
                style={styles.input}
                placeholder='Category'
                placeholderTextColor="#888"
                value={Category}
                onChangeText={setCategory}
                autoCapitalize="none"
                accessibilityLabel="Category"
            />
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder='Name'
                placeholderTextColor="#888"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                accessibilityLabel="Name"
            />
            <Text style={styles.label}>Mobile</Text>

            <TextInput
                style={styles.input}
                placeholder='Mobile'
                placeholderTextColor="#888"
                value={mobile}
                onChangeText={setMobile}
                keyboardType="numeric"
                accessibilityLabel="Mobile"
            />
            <Text style={styles.label}>Password</Text>

            <TextInput
                style={styles.input}
                placeholder='Password'
                placeholderTextColor="#888"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                accessibilityLabel="Password"
            />
            <Text style={styles.label}>School id</Text>

            <TextInput
                style={styles.input}
                placeholder='School ID'
                placeholderTextColor="#888"
                value={schoolId}
                onChangeText={setSchoolId}
                autoCapitalize="none"
                accessibilityLabel="School ID"
            />
            
            {loading ? (
                <ActivityIndicator size="large" color="#008080" />
            ) : (
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            )}
            
            <TouchableOpacity style={styles.linkContainer} onPress={()=>Regis()}>
                <Text style={styles.link}>Login Here </Text>
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
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: 'orange',
        marginBottom: 5,
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

export default Registration;













