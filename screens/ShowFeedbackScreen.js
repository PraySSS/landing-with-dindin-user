import React, { Component } from "react";
import { StyleSheet, ScrollView, ActivityIndicator, View } from "react-native";
import { ListItem, Badge, Avatar } from "react-native-elements";
import { firebase } from "../components/Firebase/firebaseConfig";

class MapFlat extends Component {
  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection("feedbacks");
    this.state = {
      isLoading: true,
      MapArr: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  getCollection = (querySnapshot) => {
    const MapArr = [];
    querySnapshot.forEach((res) => {
      const { feedback } = res.data();
      MapArr.push({
        key: res.id,
        res,
        feedback,
      });
    });
    this.setState({
      MapArr,
      isLoading: false,
    });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <ScrollView style={styles.container}>
        {this.state.MapArr.map((feedbacks, i) => {
          return (
            <ListItem key={i} bottomDivider>
              <ListItem.Content>
                <ListItem.Title>{feedbacks.feedback}</ListItem.Title>
              </ListItem.Content>
              
            </ListItem>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MapFlat;
