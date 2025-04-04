import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import { Colors } from './../../constants/Colors';

const FlightInfo = ({ flightData }) => {
  if (!flightData || flightData.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>✈️ Flights</Text>
        <Text style={styles.para}>No flight information available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <Text style={styles.title}>✈️ Flights</Text>
          <TouchableOpacity
            style={styles.button} 
            onPress={() => Linking.openURL(flights.bookingUrl)}
          >
            <Text style={styles.buttonTxT}>Book Here</Text>
          </TouchableOpacity>
      </View>
      {flightData.map((flights, index) => (
        <View key={index} style={styles.flightContainer}>
          <Text style={styles.para}>Airline: {flights.airline}</Text>
          <Text style={styles.para}>Price: {flights.priceEstimate}</Text>
        </View>
      ))}
    </View>
  );
};

export default FlightInfo;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderColor: Colors.lightGray,
    padding: 10,
    borderWidth: 1,
    borderRadius: 15,
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 20,
  },
  para: {
    fontFamily: 'Outfit',
    fontSize: 17,
    marginTop: 7,
  },
  button: {
    padding: 5,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 7,
    marginTop: 7,
  },
  buttonTxT: {
    fontFamily: 'Outfit',
    color: Colors.WHITE,
    textAlign: 'center',
  },
  flightContainer: {
    marginTop: 15,
  
  },
  flexContainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  }
});
