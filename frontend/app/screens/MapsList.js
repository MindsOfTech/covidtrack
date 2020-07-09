import React from 'react';
import MapView ,{Marker, Circle}from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { MaterialCommunityIcons } from "@expo/vector-icons";

function MapsList(props) {


    const myTable = {
        tableHead: ['Country', 'Cases', 'Recovered', 'Death'],
        tableData: [
          ['Jamaica', '500', '300', '20'],
          ['Jamaica', '500', '300', '20'],
          ['Jamaica', '500', '300', '20'],
          ['Jamaica', '500', '300', '20'],
          ['Jamaica', '500', '300', '20'],
          ['Jamaica', '500', '300', '20'],
          ['Jamaica', '500', '300', '20'],
          ['Jamaica', '500', '300', '20'],
          ['Jamaica', '500', '300', '20'],
          ['Jamaica', '500', '300', '20'],
          ['Jamaica', '500', '300', '20'],
          ['Jamaica', '500', '300', '20'],
          ['Jamaica', '500', '300', '20'],
          ['Jamaica', '500', '300', '20'],
          ['Jamaica', '500', '300', '20'],
          ['Jamaica', '500', '300', '20'],
          ['Jamaica', '500', '300', '20'],
          ['Jamaica', '500', '300', '20'],
          ['Jamaica', '500', '300', '20'],
          ['Jamaica', '500', '300', '20'],
          ['Jamaica', '500', '300', '20'],
          ['Jamaica', '500', '300', '20'],
          ['Jamaica', '500', '300', '20'],

        ]
      }


    return (
        // Try setting `flexDirection` to `column`.
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{width: "100%", height: "20%", backgroundColor: 'powderblue'}} >

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
          <View style={{width: "100%", height: "10%", backgroundColor: 'white'}} >
          <View style={styles.card5}>
          <Text style={styles.sbutton}>Jamaica</Text>
          <Text >Global Maps</Text>
          <MaterialCommunityIcons name="google-earth" size={30} color="green" />
        
        </View>

          </View>
          <ScrollView style={styles.scrollView}>

          <View  style={{width: "100%", height: "70%"}} >




              

          <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={myTable.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={myTable.tableData} textStyle={styles.text}/>
        </Table>

          </View>

          </ScrollView>

    
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
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    sbutton: {
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: "green",
        color: "white",
        paddingLeft:10,
        paddingRight:10,
        borderRadius: 15,
      },
    scrollView: {
        backgroundColor: 'white',
        
      },

      card5: {
        flexDirection: "row",
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
    
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        height: 80,
      },
  });

export default MapsList;