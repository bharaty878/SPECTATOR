import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Dashboard from './Dashboard';
import Registration from './Registration';

const Bottom = createBottomTabNavigator();

const Navi = ({ route }) => {
  const { bata, point } = route.params || {};

  // Wrapper component to pass props to Dashboard
  const DashboardScreen = (props) => <Dashboard {...props} bata={bata} point={point} />;

  return (
    <Bottom.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Coupon':
              iconName = 'tag';
              break;
            case 'Rewards':
              iconName = 'trophy';
              break;
            case 'Settings':
              iconName = 'garage';
              break;
            default:
              iconName = 'home';
          }

          return (
            <Icon
              name={iconName}
              color={focused ? 'black' : color}
              size={focused ? size * 1.5 : size} // Increase size if focused
            />
          );
        },
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'orange', // Set the background color of the tab bar
        },
      })}
    >
      <Bottom.Screen name='Home' component={DashboardScreen} options={{ tabBarActiveTintColor: 'black',tabBarInactiveTintColor:"white" }} />
      {/* <Bottom.Screen name='Registration' component={Registration} options={{ tabBarActiveTintColor: 'black',tabBarInactiveTintColor:"white" }} />  */}
    </Bottom.Navigator>
  );
};

export default Navi;















// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import Dashboard from './Dashboard';
// import Coupon from './Coupon';
// import Rewards from './Rewards';
// import Settings from './Settings';

// const Bottom = createBottomTabNavigator();

// const Navi = ({ route }) => {
//   // Ensure route.params exists and handle cases where 'bata' might not be defined
//   const { bata,point } = route.params || {};




//   return (
//     <View style={{ flex: 1 }}>
//       <Bottom.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ color, size, focused }) => {
//             let iconName;

//             switch (route.name) {
//               case 'Home':
//                 iconName = 'home';
//                 break;
//               case 'Coupon':
//                 iconName = 'tag';
//                 break;
//               case 'Rewards':
//                 iconName = 'trophy';
//                 break;
//               case 'Settings':
//                 iconName = 'garage';
//                 break;
//               default:
//                 iconName = 'home';
//             }

//             return (
//               <Icon
//                 name={iconName}
//                 color={focused ? 'red' : color}
//                 size={focused ? size * 1.5 : size} // Increase size if focused
//               />
//             );
//           },
//           headerShown: false,
//           tabBarStyle: {
//             backgroundColor: '#004d4d', // Set the background color of the tab bar
//           },
//         })}
//       >
//         {/* Pass bata as a parameter to Dashboard */}
//         <Bottom.Screen
//           name='Home'
//           component={(props) => <Dashboard {...props} bata={bata} point={point}/>}
//           options={{ tabBarActiveTintColor: 'red' }}
//         />
//         <Bottom.Screen name='Coupon' component={Coupon} options={{ tabBarActiveTintColor: 'red' }} />
//         <Bottom.Screen name='Rewards' component={Rewards} options={{ tabBarActiveTintColor: 'red' }} />
//         <Bottom.Screen name='Settings' component={Settings} options={{ tabBarActiveTintColor: 'red' }} />
//       </Bottom.Navigator>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     padding: 10,
//     backgroundColor: '#004d4d', // Consistent background color
//     alignItems: 'center',
//   },
//   headerText: {
//     color: 'red', // Text color for the header
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
// });

// export default Navi;
















// import React from 'react';
// import { StyleSheet,Text } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import Dashboard from './Dashboard';
// import Coupon from './Coupon';
// import Rewards from './Rewards';
// import Settings from './Settings';

// const Bottom = createBottomTabNavigator();

// const Navi = ({route}) => {
//   const {Papa} = route.params.bata
//   return (
//     <>
//     <Text style={{color:"red"}}>{Papa}</Text>
//       <Bottom.Navigator
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ color, size, focused }) => {
//             let iconName;

//             switch (route.name) {
//               case 'Home':
//                 iconName = 'home';
//                 break;
//               case 'Coupon':
//                 iconName = 'tag';
//                 break;
//               case 'Rewards':
//                 iconName = 'trophy';
//                 break;
//               case 'Settings':
//                 iconName = 'garage';
//                 break;
//               default:
//                 iconName = 'home';
//             }

//             return (
//               <Icon
//                 name={iconName}
//                 color={focused ? 'red' : color}
//                 size={focused ? size * 1.5 : size} // Increase size if focused
//               />
//             );
//           },
//           headerShown: false,
//           tabBarStyle: {
//             backgroundColor: '#004d4d', // Set the background color of the tab bar
//           },
//         })}
//       >
//         <Bottom.Screen name='Home' component={Dashboard} options={{tabBarActiveTintColor:"red"}}/>
//         <Bottom.Screen name='Coupon' component={Coupon} options={{tabBarActiveTintColor:"red"}}/>
//         <Bottom.Screen name='Rewards' component={Rewards} options={{tabBarActiveTintColor:"red"}}/>
//         <Bottom.Screen name='Settings' component={Settings} options={{tabBarActiveTintColor:"red"}}/>
        
//       </Bottom.Navigator>
//       </>
//   );
// }

// export default Navi;

// const styles = StyleSheet.create({});

















