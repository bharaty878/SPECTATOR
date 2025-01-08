import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Navi from './screens/Navi'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './screens/Login'
import Dashboard from './screens/Dashboard'
import Registration from './screens/Registration'

const Stacks = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
       <Stacks.Navigator>
          <Stacks.Screen name='Login' component={Login} options={{headerShown:false}}/>
          <Stacks.Screen name='Registration' component={Registration} options={{headerShown:false}}/>
          <Stacks.Screen name='Navi' component={Navi} options={{headerShown:false}}/>
          
       </Stacks.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})