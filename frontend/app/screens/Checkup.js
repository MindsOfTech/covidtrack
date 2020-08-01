import React, { Component, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Picker,
  StatusBar,
  Alert,
} from "react-native";

import { CheckBox, Divider, Slider } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

class Checkup extends Component {
  constructor() {
    super();
    this.state = {
      fever: false,
      headache: false,
      nausea: false,
      soreThroat: false,
      wetCoughing: false,
      dryCoughing: false,
      country: "Jamaica",
      symptoms: [],
      testedFor: ["Influenza"],
      influenzaDate: "2012-08-15",
      covidExposure: ["Yes"],
      value: 89,
    };
  }
  resetState = () => {
    var reset = {
      fever: false,
      headache: false,
      nausea: false,
      soreThroat: false,
      wetCoughing: false,
      dryCoughing: false,
      country: "Jamaica",
      symptoms: [],
      testedFor: ["Influenza"],
      influenzaDate: "2012-08-15",
      covidExposure: ["Yes"],
      value: 0,
    };
    this.setState(reset);
  };
  handleSymptoms = () => {
    var entries = Object.entries(this.state);
    entries.forEach((element) => {
      if (element[1] == true) {
        this.setState({ symptoms: this.state.symptoms.push(element[0]) });
      }
    });
  };
  submit = () => {
    this.handleSymptoms();
    let report = {
      country: this.state.country,
      symptoms: this.state.symptoms,
      "Test For": this.state.testedFor,
      "Last Influenza Test Date": this.state.influenzaDate,
      "Have you been exposed to someone confirmed with COVID19": this.state
        .covidExposure,
      lastTemp: parseInt(this.state.value),
    };

    fetch("http://covy-backend.mybluemix.net/symptoms/psmith", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        report,
      }),
    });
    // navigation.navigate("Statistics", report);
    Alert.alert(
      "Thanks for Checking in!",
      `Your current temperature is ${parseInt(this.state.value)}`,
      [{ text: "OK" }],
      { cancelable: false }
    );
    this.resetState();
    this.props.navigation.navigate("Home", { a: 3 });
  };
  render(navigation) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Text style={{ textAlign: "center", fontSize: 30, padding: 20 }}>
          Lets see how you're doing!
        </Text>
        <ScrollView>
          <CheckBox
            title="Do you have a fever?"
            checked={this.state.fever}
            onPress={() => this.setState({ fever: !this.state.fever })}
          />
          <CheckBox
            title="Do you have a headache?"
            checked={this.state.headache}
            onPress={() => this.setState({ headache: !this.state.headache })}
          />
          <CheckBox
            title="Are you feeling nauseous?"
            checked={this.state.nausea}
            onPress={() => this.setState({ nausea: !this.state.nausea })}
          />
          <CheckBox
            title="Is your throat sore?"
            checked={this.state.soreThroat}
            onPress={() =>
              this.setState({ soreThroat: !this.state.soreThroat })
            }
          />
          <CheckBox
            title="Dry cough?"
            checked={this.state.dryCoughing}
            onPress={() =>
              this.setState({ dryCoughing: !this.state.dryCoughing })
            }
          />
          <CheckBox
            title="Wet Cough?"
            checked={this.state.wetCoughing}
            onPress={() =>
              this.setState({ wetCoughing: !this.state.wetCoughing })
            }
          />
          <View
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "center",
              marginLeft: "auto",
              marginRight: "auto",
              // alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "center",
                padding: 10,
              }}
            >
              What's your current temperature?
            </Text>

            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>
                °Celius: {parseInt((this.state.value - 32) * 0.556)}
              </Text>
              <Text style={{ fontWeight: "bold" }}>
                °Fahrenheit:
                {parseInt(this.state.value)}
              </Text>
            </View>
            <Slider
              value={this.state.value}
              onValueChange={(value) => this.setState({ value })}
              minimumValue={89}
              maximumValue={110}
              thumbTintColor={"#00B027"}
              minimumTrackTintColor={"#00B027"}
              step={1}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.submit()}
        >
          <Text style={styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.props.navigation.navigate("Home", { a: 3 })}
        >
          <Text style={styles.submitButtonText}> Next </Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

// function checkUpComp({ navigation }) {
//   const checkup = new Checkup();
//   return checkup.render(navigation);
// }
// const checkUpStack = createStackNavigator();
// function checkUp() {
//   return (
//     <checkUpStack.Navigator>
//       <checkUpStack.Screen name="Checkup" component={checkUpComp} />
//       <checkUpStack.Screen name="Statistics" component={Statistics} />
//     </checkUpStack.Navigator>
//   );
// }
export default Checkup;

const styles = StyleSheet.create({
  container: {
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
    fontSize: 20,
  },
});
