import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Stopwatch from './src/screens/Stopwatch';
import Timer from './src/screens/Timer';

const BottomTab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator initialRouteName='Stopwatch'>
        <BottomTab.Screen name='Stopwatch' component={Stopwatch}/>
        <BottomTab.Screen name='Timer' component={Timer}/>
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
