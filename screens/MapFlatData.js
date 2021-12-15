import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Card } from "react-native-paper";
import { Image } from "react-native-elements";
import { firebase } from "../components/Firebase/firebaseConfig";

class Mapdata extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      title: "",
      detail: "",
      imageurl: "",
      isLoading: true,
    };
  }

  componentDidMount() {
    const dbRef = firebase
      .firestore()
      .collection("maps")
      .doc(this.props.route.params.mapkey);
    dbRef.get().then((res) => {
      if (res.exists) {
        const map = res.data();
        this.setState({
          key: res.id,
          id: map.id,
          title: map.title,
          detail: map.detail,
          imageurl: map.imageurl,
          isLoading: false,
        });
      } else {
        console.log("Document does not exist!");
      }
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <ImageBackground
        source={{
          uri: "https://www.img.in.th/images/919c243f91e61582d53bb67e54c22cd3.png",
        }}
        resizeMode="cover"
        style={styles.image}
      >
        <Card style={styles.carder}>
          <ScrollView>
            <SafeAreaView style={styles.container}>
              <Text style={styles.ftext}>{this.state.title}</Text>

              <Image source={{ uri: this.state.imageurl }} style={styles.img} />

              <View style={styles.container2}>
                <Text style={styles.text}>{this.state.detail}</Text>
              </View>
            </SafeAreaView>
          </ScrollView>
        </Card>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  carder: {
    flex: 1,
    justifyContent: "center",
    margin: 15,
    backgroundColor: "rgba(255, 255, 255,1)",
    opacity: 1,
    borderRadius: 15,
    marginTop: 50,
  },

  ftext: {
    fontSize: 40,
    marginTop: 30,
    marginBottom: 15,
    color: "#77302A",
  },

  text: {
    justifyContent: "center",
    textAlign: "center",

    fontSize: 16,
    marginBottom: 10,
    padding: 10,
    color: "#77302A",
  },

  image: {
    flex: 1,
    justifyContent: "center",
  },

  img: {
    height: 200,
    width: 300,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 25,
    marginBottom: 40,
  },
});
export default Mapdata;
