import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import * as firebase from "firebase";
import AppBack1 from "./../../components/AppBack1";
import AppButton from "./../../components/AppButton";
import AppTextInput from "./../../components/AppTextInput";
import defaultStyles from "./../../config/styles";
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => {
          this.props.navigation.navigate("Main");
        },
        (error) => {
          Alert.alert(
            "Invalid email or password combination",
            "please try again"
          );
        }
      );
  };

  onCreateAccountPress = () => {
    this.props.navigation.navigate("Sign Up");
  };

  // onForgotPasswordPress = () => {
  //   var navActions = StackNavigationOptions.reset({
  //     index: 0,
  //     actions: [
  //       StackNavigationOptions.navigate({ routeName: "ForgotPassword" }),
  //     ],
  //   });
  //   this.props.navigation.dispatch(navActions);
  // };

  render() {
    return (
      <View>
        <KeyboardAvoidingView behavior="position" enabled>
          <AppBack1>
            <Text style={styles.title}>Covy</Text>
            <Text style={styles.subtitle}>Good health starts with you.</Text>
          </AppBack1>
          <View style={{ position: "fixed", bottom: 50 }}>
            <AppTextInput
              autoCapitalise="none"
              autoCorrect={false}
              keyboardType="email-address"
              icon="email"
              placeholder="Your Email"
              textContentType="emailAddress"
              value={this.state.email}
              onChangeText={(text) => {
                this.setState({ email: text });
              }}
            />
            <AppTextInput
              autoCapitalise="none"
              autoCorrect={false}
              icon="lock"
              placeholder="Your Password"
              textContentType="emailAddress"
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={(text) => {
                this.setState({ password: text });
              }}
            />

            <AppButton
              title="Sign In"
              color="#59c26F"
              onPress={this.onLoginPress}
            />
            <AppButton
              title="Sign Up"
              color={defaultStyles.colors.grey}
              onPress={this.onCreateAccountPress}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    // backgroundColor: "red",
    alignItems: "flex-start",
    color: "white",
    flex: 1,
  },

  title: {
    fontWeight: "bold",
    fontSize: 80,
    textAlign: "left",
    marginTop: 50,
    color: "white",
    padding: 30,
  },
  subtitle: {
    fontWeight: "100",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    paddingLeft: 30,
    color: "white",
    marginRight: 50,
  },

  button: {
    color: "white",
    marginTop: "80%",
  },
});
