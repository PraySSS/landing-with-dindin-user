import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MapScreen from "../screens/MapScreen";
import Chat from '../screens/Chat';
import FeedbackScreen from "../screens/FeedbackScreen";
import MapFlat from "../screens/MapFlat";
import MapFlatData from "../screens/MapFlatData";
import ProfileScreen from "../screens/ProfileScreen";
import ShowFeedbackScreen from "../screens/ShowFeedbackScreen"
const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#6D1C1C",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};


const MapScreenStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
};

const ChatScreenStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

const FeedbackScreenStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
      <Stack.Screen name="ShowFeedbackScreen" component={ShowFeedbackScreen} />
    </Stack.Navigator>
  );
};

const MapFlatScreenStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="MapFlat" component={MapFlat} />
      <Stack.Screen name="MapFlatData" component={MapFlatData} />
    </Stack.Navigator>
  );
};
const ProfileScreenStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
     
    </Stack.Navigator>
  );
};
  
export { MapScreenStackNavigator ,ChatScreenStackNavigator,FeedbackScreenStackNavigator,MapFlatScreenStackNavigator,ProfileScreenStackNavigator };
