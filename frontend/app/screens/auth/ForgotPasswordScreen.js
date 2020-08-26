import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import * as firebase from "firebase";
import AppBackground from "../../components/AppBackground";
import AppButton from "./../../components/AppButton";
import AppTextInput from "./../../components/AppTextInput";
import defaultStyles from "./../../config/styles";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  onResetPasswordPress = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(
        () => {
          Alert.alert("Password reset email has been sent.");
        },
        (error) => {
          Alert.alert(error.message);
        }
      );
  };
  onLoginPress = () => {
    this.props.navigation.navigate("Login");
  };

  render() {
    return (
      <View>
        <KeyboardAvoidingView behavior="position" enabled>
          <AppBackground>
            <Text style={styles.title}>Covy</Text>
            <Text style={styles.subtitle}>Reset your password</Text>
          </AppBackground>
          <View style={{ position: "fixed", bottom: 20 }}>
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

            <AppButton
              title="Reset passsword"
              color="#59c26F"
              onPress={this.onResetPasswordPress}
            />
            <AppButton
              title="Back to login"
              color={defaultStyles.colors.grey}
              onPress={this.onLoginPress}
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
  forgotPassword: {
    marginTop: 20,
    alignSelf: "center",

    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  forgotPasswordText: {
    padding: 5,
    fontSize: 18,
    // backgroundColor: "red",
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
