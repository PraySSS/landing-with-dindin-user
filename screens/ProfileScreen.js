import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Text,Image, } from "react-native";
import useStatusBar from "../hooks/useStatusBar";
import { logout } from "../components/Firebase/firebase";
import { AuthUserContext } from "../navigation/AuthUserProvider";
import { StatusBar } from "expo-status-bar";
import { IconButton } from "../components/IconButton";
import {firebase} from '../components/Firebase/firebaseConfig';
const auth = firebase.auth();
export default function ProfileScreen() {
  const { user } = useContext(AuthUserContext);
  useStatusBar("dark-content");
  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Image source={require('../assets/dindin1_1.png')} style={{ width: 160, height: 160 }}/>
      <Text >Good to see ya {user.email}!</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.btext}>sign out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    marginTop: 20,
    width: "50%",
    height: 80,
    backgroundColor: "#77302A",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,marginTop:100
  },
  btext: {

    justifyContent: "center",
    textAlign: "center",

    fontSize: 14,
    borderColor: 9,
    color: "#ffffff",
  },
});
