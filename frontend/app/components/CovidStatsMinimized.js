import React, { Component } from "react";

import { View, StyleSheet, Text, Image, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

class CovidStatsMinimized extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    fetch("https://corona.lmao.ninja/v2/countries/Jamaica?strict&query%20", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(responseJson);
      })
      .catch((error) => {
        console.log("error");
      });
  };
  render() {
    return (
      <View style={styles.card}>
        <View style={styles.element}>
          <MaterialCommunityIcons
            name="emoticon-neutral"
            size={35}
            style={styles.text1}
            color="#0084F8"
          />
          <Text style={styles.text1}>{this.state.cases || 100}</Text>
          <Text style={styles.text2}>Confirmed</Text>
        </View>
        <View style={styles.element}>
          <MaterialCommunityIcons
            name="emoticon-happy"
            size={35}
            style={styles.text1}
            color="#00B027"
          />

          <Text style={styles.text1}>{this.state.recovered || 100}</Text>
          <Text style={styles.text2}>Recovered</Text>
        </View>
        <View style={styles.element}>
          <MaterialCommunityIcons
            name="emoticon-sad"
            size={35}
            style={styles.text1}
            color="#FF0F0F"
          />

          <Text style={styles.text1}>{this.state.deaths || 100}</Text>
          <Text style={styles.text2}>Deaths</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  element: {
    alignItems: "center",
    justifyContent: "space-between",
    textAlignVertical: "center",
    flex: 1,
  },
  card: {
    marginTop: 15,
    flexDirection: "row",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    backgroundColor: "white",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  text1: {
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    alignContent: "center",
    alignSelf: "auto",
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 25,
  },
  text2: {
    alignItems: "center",
  },
  text3: {
    alignItems: "center",
    marginTop: 30,
  },
});
export default CovidStatsMinimized;
