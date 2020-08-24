import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import AppBack1 from "./../../components/AppBack1";
import AppButton from "./../../components/AppButton";
import AppTextInput from "./../../components/AppTextInput";
import * as firebase from "firebase";
import defaultStyles from "./../../config/styles";
import { connect } from "react-redux";
import { setUser } from "./../../redux/actions/setUserActions";

const mapStateToProps = (state) => {
  return {
    email: state.user,
  };
};

class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirm: "",
      passwordValidate: defaultStyles.colors.black,
      emailValidate: defaultStyles.colors.black,
      emailIsValid: false,
    };
  }

  onSignupPress = () => {
    if (this.state.email == "") {
      Alert.alert("Please enter an email address");
      return;
    }
    if (this.state.password == "") {
      Alert.alert("Please enter a password");
      return;
    }
    if (this.state.password !== this.state.passwordConfirm) {
      Alert.alert("Passwords do not match");
      this.setState({ passwordValidate: defaultStyles.colors.red });
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        (response) => {
          this.props.dispatch(setUser(this.state.email));
          this.props.navigation.navigate("Main");
        },
        (error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          switch (errorCode) {
            case "auth/weak-password":
              Alert.alert(
                "Password is too weak",
                "Must be at least 8 characters and contain a number"
              );
              return;
            case "auth/email-already-in-use":
              Alert.alert("Email already in use", "Please try another email");
              return;
            case "auth/invalid-email":
              Alert.alert("Email invalid", "Please enter a valid email");
              return;

            default:
              Alert.alert(errorMessage);
              return;
          }
        }
      );
  };

  onBackToLoginPress = () => {
    this.props.navigation.navigate("Login");
  };

  render() {
    return (
      <View>
        <KeyboardAvoidingView behavior="position" enabled>
          <AppBack1>
            <Text style={styles.title}>Covy</Text>
            <Text style={styles.subtitle}>Good health starts with you.</Text>
          </AppBack1>
          <View style={{ position: "fixed", bottom: 100 }}>
            <AppTextInput
              autoCapitalise="none"
              autoCorrect={false}
              keyboardType="email-address"
              icon="email"
              iconColor={this.state.emailValidate}
              placeholder="Your Email"
              textContentType="emailAddress"
              value={this.state.email}
              onChangeText={(text) => {
                this.setState({
                  email: text,
                });
              }}
            />
            <AppTextInput
              autoCapitalise="none"
              autoCorrect={false}
              icon="lock"
              iconColor={this.state.passwordValidate}
              placeholder="Your Password"
              textContentType="emailAddress"
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
            />
            <AppTextInput
              autoCapitalise="none"
              autoCorrect={false}
              icon="lock"
              iconColor={this.state.passwordValidate}
              placeholder="Confirm Password"
              textContentType="emailAddress"
              secureTextEntry={true}
              value={this.state.passwordConfirm}
              onChangeText={(text) => {
                this.setState({
                  passwordConfirm: text,
                  passwordValidate:
                    text == this.state.password
                      ? defaultStyles.colors.primary
                      : defaultStyles.colors.red,
                });
              }}
            />

            <AppButton
              title="Create Account"
              color="#59c26F"
              onPress={this.onSignupPress}
            />
            <AppButton
              title="Back to login"
              color={defaultStyles.colors.grey}
              onPress={this.onBackToLoginPress}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default connect(mapStateToProps, null)(SignupScreen);

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
