import React from 'react';
import { View, StyleSheet,Text } from 'react-native';

function Splash(props) {
  return (
    <View style={styles.container}>

<Text style={styles.title}>Covy</Text>
        <Text style={styles.subtitle}>
          Your Health Companion
        </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

    flex:1,
    backgroundColor:"#59c26F",
    justifyContent:"center",
    alignContent:"center"
  },

  title: {
    fontWeight: "bold",
    fontSize: 60,
    alignSelf: "center",
    alignItems: "center",
    color: "white",
  
  },
  subtitle: {
    fontWeight: "100",
    fontSize: 25,
    alignSelf: "center",
    alignItems: "center",
    color: "white",
    marginRight: 5,
  },

});

export default Splash;