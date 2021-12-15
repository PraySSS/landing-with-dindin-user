import React, {useState} from 'react';
import { 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  Text,
  SafeAreaView, 
  Image, 
  TextInput 
  } from 'react-native';


const FeedbackScreen = () => {
  const [defaultRating, setDefaultRating] = useState(3);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const starImageFilled =
    'https://sv1.picz.in.th/images/2021/11/09/upV04J.png';
  // Empty Star
  const starImageCorner =
    'https://sv1.picz.in.th/images/2021/11/09/upV7Qb.png';
  // Half Star
  const startHalfFilled =
    'https://sv1.picz.in.th/images/2021/11/09/upHVbN.png';

  const onStarClick = (item, bool) => {
    if (bool) {
      item = item - 1 + 0.5;
    }
    setDefaultRating(item);
  };

  const CustomRatingBar = () => {
    return (
      <View style={styles.ratingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <View>
              <Image
                style={styles.imageStyle}
                source={
                  item <= defaultRating
                    ? {uri: starImageFilled}
                    : item >= defaultRating && item < defaultRating + 1
                    ? {uri: startHalfFilled}
                    : {uri: starImageCorner}
                }
              />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  position: 'absolute',
                }}>
                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    width: 20,
                    height: 40,
                  }}
                  onPress={() => onStarClick(item, true)}
                />

                <TouchableOpacity
                  activeOpacity={1}
                  style={{
                    width: 20,
                    height: 40,
                  }}
                  onPress={() => onStarClick(item, false)}
                />
              </View>
            </View>
          );
        })}
      </View>
    );
  };
  return (
    <View style = {styles.container}>
          <Text style={styles.ftext}>
            How do you feel about dindin?
          </Text>
        <CustomRatingBar />
          <TextInput style={styles.texta}
            maxCharLimit={50}
            placeholderTextColor="#ef9a9a"
            exceedCharCountColor="red"
            placeholder={"plz tell us about dindin..."}
            
          />
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => {}}>
          <Text style={styles.ltext}>Submit</Text>
          </TouchableOpacity>
          </View>

  );
};

export default FeedbackScreen;
const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
      justifyContent: 'center', 
    },

  texta : {
    height: 260, 
    width:'95%',
    borderRadius: 16 , 
    marginTop: 30, 
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15
  },

  button : {
  height: 50,
  width: '40%',
  borderRadius: 15,
  backgroundColor: '#77302A',
  marginTop : 80,
},

  ratingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  imageStyle: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    marginRight: 15
  },

  ftext : {
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 100,
    color: '#77302A',
    fontSize: 18
  },

   ltext : {
    padding: 15,
    color: '#fff',
    fontSize: 15,
    justifyContent: 'center',
    textAlign: 'center',
  }
})
