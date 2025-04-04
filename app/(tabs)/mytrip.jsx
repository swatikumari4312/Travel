import { StyleSheet, Text, View, ActivityIndicator,ScrollView ,TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { useEffect, useState } from 'react';
import StartNewTripCard from '../../components/MyTrips/StartNewTripCard';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from './../../configs/FirebaseConfig';
import UserTripList from './../../components/MyTrips/UserTripList';


import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'expo-router';

console.log(uuidv4()); // Test if UUID works without errors


const MyTrip = () => {
  const router= useRouter();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;
  const userEmail =user?.email

  useEffect(() => {
    if (user) {
      getMyTrip();
    }
  }, [user]);

  const getMyTrip = async () => {
    setLoading(true);
    setUserTrips([]);
    
    try {
      const q = query(collection(db, 'UserTrip'), where('userEmail', '==', userEmail));
      const querySnapshot = await getDocs(q);
      
      const trips = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUserTrips(trips);
      
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
    
    setLoading(false);
  };
  

  return (
    <ScrollView style={styles.mainView}>
      <View style={styles.flexRowView}>
        <Text style={styles.title}>My Trip</Text>
        <TouchableOpacity
              onPress={()=>router.push('../create-trip/search-place')}
              >
        <Ionicons name="add-circle-outline" size={50} color="black" />
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator size={'large'} color={Colors.PRIMARY} />}
      {userTrips.length === 0 ? <StartNewTripCard /> : <UserTripList userTrips={userTrips} />}
    </ScrollView>
  );
};

export default MyTrip;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: Colors.WHITE,
    height: '100%',
    paddingTop: 40,
    padding: 25,
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 30,
    marginTop: 30,
  },
  flexRowView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
