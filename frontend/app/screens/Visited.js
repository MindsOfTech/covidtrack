import React, { Component, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Picker,
  StatusBar,
  Image,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CheckBox, Divider, Slider } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import Checkup from "./Checkup";

class Visited extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        CompanyName: [],
        DateTimeVisited: [],
        LocationVisited: [],
        username: "",
      },
      image: "blob:7941833A-6136-40B1-85CC-77895BECEC44?offset=0&size=440",
    };
  }
  async componentDidMount() {
    fetch("http://covy-backend.mybluemix.net/qrUser/psmith", {
      method: "GET",
    })
      .then((response) => response.blob())
      .then((responseJson) => {
        // this.setState(responseJson);
        // console.log(responseJson);
        var outside = URL.createObjectURL(responseJson);
        this.setState({ image: outside });
      })
      .catch((error) => {
        console.error(error);
      });
    fetch("http://covy-backend.mybluemix.net/log/psmith", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ data: responseJson });
      })
      .catch((error) => {
        console.error(error);
      });
    // try {
    //   //Assign the promise unresolved first then get the data using the json method.
    //   const pokemonApiCall = await fetch(
    //     "http://covy-backend.mybluemix.net/qrUser/hellokitty98"
    //   );
    //   const pokemon = await pokemonApiCall.blob();
    //   console.log(pokemon);
    // } catch (err) {
    //   console.log("Error fetching data-----------", err);
    // }
  }
  renderDate(args) {
    var date = args.split(":")[0].split("/");
    var formatted = date[2] + "-" + date[1] + "-" + date[0];
    var d = new Date(formatted);
    return (
      d.toString().slice(0, 15) +
      ` @ ${args.split(":")[1]}:${args.split(":")[2]}`
    );
  }
  render(navigation) {
    var qri = (
      <Image
        source={{
          uri:
            this.state.image || "https://via.placeholder.com/300/09f/fff.png",
        }}
        style={{ height: 300, width: 300 }}
      ></Image>
    );
    var places = [];
    for (let i = 0; i < this.state.data.DateTimeVisited.length; i++) {
      places.push(
        <View key={i} style={{ flex: 1, padding: 30 }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons name="map-marker" size={25} />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                paddingLeft: 15,
              }}
            >
              {this.state.data.CompanyName[i]}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 15,
            }}
          >
            <MaterialCommunityIcons name="calendar" size={25} />
            <Text
              style={{
                paddingLeft: 15,
                fontSize: 20,
                textAlign: "center",
              }}
            >
              {this.renderDate(this.state.data.DateTimeVisited[i])}
            </Text>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Text
          style={{
            textAlign: "center",
            paddingBottom: 20,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Places {this.state.data.username} visited
        </Text>
        <ScrollView style={{}}>
          <View
            style={{
              flex: 1,
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {qri}
            {places}
          </View>
        </ScrollView>
      </View>
    );
  }
}

// function VisitedComp({ navigation }) {
//   const Visited = new Visited();
//   return Visited.render(navigation);
// }
// const VisitedStack = createStackNavigator();
// function Visited() {
//   return (
//     <VisitedStack.Navigator>
//       <VisitedStack.Screen name="Visited" component={VisitedComp} />
//       <VisitedStack.Screen name="Statistics" component={Statistics} />
//     </VisitedStack.Navigator>
//   );
// }
export default Visited;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 23,
    backgroundColor: "white",
    minHeight: "100%",
  },
  input: {
    margin: 15,
    padding: 10,
    height: 40,
    borderColor: "#59c26F",
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: "#59c26F",
    padding: 10,
    margin: 15,
    height: 40,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
  },
});
