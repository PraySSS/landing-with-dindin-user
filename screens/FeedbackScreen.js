import { isLoading } from "expo-font";
import React, { Component, useState } from "react";
import { render } from "react-dom";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { ThemeProvider, Button, Input, Image } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { firebase } from "../components/Firebase/firebaseConfig";

class FeedbackScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection("feedbacks");
    this.state = {
      feedback: "",
      isLoading: false,
    };
  }
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  storeFeedback() {
    if (this.state.feedback == "") {
      alert("Fill the word!");
    } else {
      alert("Sending");
      this.setState({
        isLoading: true,
      });
      this.dbRef
        .add({
          feedback: this.state.feedback,
          //createdAt:firebase.firestore.serverTimestamp()
        })
        .then((res) => {
          this.setState({
            feedback: "",
            isLoading: false,
          });
          this.props.navigation.navigate("ShowFeedbackScreen");
        })
        .catch((err) => {
          console.log("Error founf", err);
          this.setState({
            isLoading: false,
          });
        });
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#77302A" />
        </View>
      );
    }

    return (
      <ThemeProvider theme={theme}>
        <ScrollView styles={styles.container}>
          <Text style={styles.ftext}>How do you feel about dindin?</Text>
          <TextInput
            style={styles.texta}
            value={this.state.feedback}
            onChangeText={(val) => this.inputValueUpdate(val, "feedback")}
            minCharLimit={4}
            maxCharLimit={50}
            fontSize={20}
            placeholderTextColor="#77302A"
            exceedCharCountColor="red"
            placeholder={"plz tell us about dindin..."}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.storeFeedback()}
          >
            <Text style={styles.ltext}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => this.props.navigation.navigate("ShowFeedbackScreen")}
          >
            <Text style={styles.ltext}>Show feedback</Text>
          </TouchableOpacity>
        </ScrollView>
      </ThemeProvider>
    );
  }
}
const theme = {
  Button: {
    raised: true,
  },
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  preloader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 50,
    width: "40%",
    borderRadius: 15,
    marginBottom: 35,
    backgroundColor: "#77302A",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
  },
  button2: {
    height: 50,
    width: "40%",
    borderRadius: 15,
    marginBottom: 35,
    backgroundColor: "#437D69",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
  },

  texta: {
    height: 300,
    width: "95%",
    borderRadius: 16,
    marginTop: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginLeft: "auto",
    marginRight: "auto",
  },
  ftext: {
    justifyContent: "center",
    textAlign: "center",
    marginTop: 45,
    color: "#77302A",
    fontSize: 18,
  },

  ltext: {
    padding: 15,
    color: "#fff",
    fontSize: 15,
    justifyContent: "center",
    textAlign: "center",
  },
});
export default FeedbackScreen;
