/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  SafeAreaView
} from 'react-native';
const handleImage = (src) => {
  return src ? src : ''
}
const handleIcon = (category) => {
  switch (category) {
    case 'fitness':
      return <Image source={require('../assets/images/Icons/fitness-48.png')}
        style={styles.image} />
    case 'shop':
      return <Image source={require('../assets/images/Icons/shop-64.png')}
        style={styles.image} />
    case 'food':
      return <Image source={require('../assets/images/Icons/food.png')}
        style={styles.image} />
    case 'nightlife':
      return <Image source={require('../assets/images/Icons/dancing-64.png')}
        style={styles.image} />
    case 'beauty':
      return <Image source={require('../assets/images/Icons/lipstick-40.png')}
        style={styles.image} />
    default:
      return <Image source={require('../assets/images/Icons/experience-40.png')}
        style={styles.image} />
  }
}

export default function Snapshots(props) {
  const { snapshot, navigate } = props;
  const { places } = snapshot;
  return places.map(place => (
    <SafeAreaView key={place.id}>
      <TouchableHighlight
        onPress={() => {
          navigate('SingleSnap', { userId: snapshot.id, placeId: place.id });
        }}
      >
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <Text style={styles.name}>{snapshot.username}</Text>
            {handleIcon(place.category[0])}
          </View>
          <Image
            source={{ uri: handleImage(place.snapshot.photos) }}
            style={{ width: 300, height: 250 }}
          />
          <Text style={styles.title}>{place.name}</Text>
          <Text style={styles.content}>{place.snapshot.description}</Text>
        </View>
      </TouchableHighlight>
    </SafeAreaView>
  ));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7cac9',
    margin: 15,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
    borderRadius: 10
  },
  contentContainer: {
    paddingTop: 15
  },
  topContainer: {
    flexDirection: 'row'
  },
  name: {
    fontSize: 20,
    color: '#f7786b',
    textAlign: 'center',
    fontWeight: '400',
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 80
  },
  title: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#f7786b',
    margin: 10
  },
  content: {
    color: '#f7786b',
    marginRight: 25,
    marginLeft: 25,
    marginBottom: 15,
    textAlign: 'center'
  },
  image: {
    width: 40,
    height: 40,
    marginLeft: 70
  }
});
