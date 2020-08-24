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
import { connect } from "react-redux";
import { setUser } from "./../../redux/actions/setUserActions";
import { TouchableOpacity } from "react-native-gesture-handler";

const mapStateToProps = (state) => {
  return {
    email: state.user,
  };
};

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      forgotPasswordBg: defaultStyles.colors.lightGrey,
      forgotPasswordText: defaultStyles.colors.grey,
    };
  }

  onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        (response) => {
          this.props.dispatch(setUser(this.state.email));
          this.props.navigation.navigate("Main");
        },
        (error) => {
          this.setState({ forgotPasswordText: defaultStyles.colors.black });
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === "auth/wrong-password") {
            Alert.alert("Incorrect password.", "please try again");
          } else {
            Alert.alert(
              "Invalid email or password combination",
              "please try again"
            );
          }
        }
      );
  };

  onCreateAccountPress = () => {
    this.props.navigation.navigate("Sign Up");
  };

  onForgotPasswordPress = () => {
    this.props.navigation.navigate("Forgot Password");
  };

  render() {
    return (
      <View>
        <KeyboardAvoidingView behavior="position" enabled>
          <AppBack1>
            <Text style={styles.title}>Covy</Text>
            <Text style={styles.subtitle}>Good health starts with you.</Text>
          </AppBack1>
          <View style={{ position: "fixed", bottom: 80 }}>
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
            <TouchableOpacity
              style={[
                styles.forgotPassword,
                { backgroundColor: this.state.forgotPasswordBg },
              ]}
              onPress={this.onForgotPasswordPress}
            >
              <Text
                style={[
                  styles.forgotPasswordText,
                  { color: this.state.forgotPasswordText },
                ]}
              >
                Forgot Password
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
export default connect(mapStateToProps, null)(LoginScreen);

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
