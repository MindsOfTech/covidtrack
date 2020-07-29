import React, { Component, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Picker,
  StatusBar,
} from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { CheckBox, Divider } from "react-native-elements";
import Statistics from "./Statistics";
import { render } from "react-dom";

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
    };
  }

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
    };

    // fetch("http://covy-backend.mybluemix.net/symptoms/jcook", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     report,
    //   }),
    // });
    // navigation.navigate("Statistics", report);
    alert("Submitted", "Thanks for Checking in!");
    this.props.navigation.navigate("Home", { a: 3 });
  };
  render(navigation) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Text style={{ textAlign: "center", fontSize: 30, padding: 20 }}>
          Lets see how you're doing!
        </Text>
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
          onPress={() => this.setState({ soreThroat: !this.state.soreThroat })}
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
    borderColor: "green",
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: "green",
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
