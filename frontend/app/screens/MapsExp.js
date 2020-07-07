import React from 'react';
import MapView ,{Marker, Circle}from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

function MapsExp(props) {
  return (
    <View style={styles.container}>
  
        <MapView style={styles.mapStyle} 
         initialRegion={{
            latitude: 18.109581,
            longitude: -77.297508,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            
          }}
          >
       
            
        </MapView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
export default MapsExp;
