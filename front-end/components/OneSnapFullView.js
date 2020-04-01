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

export default function OneSnapFullView(props){
  const {place, user} = props;
  return(
    <SafeAreaView key={place.id}>
      <TouchableHighlight
        onPress={() => {
          navigate('SingleSnap', {userId: user.id, placeId: place.id});
        }}
      >
        <View style={styles.container}>
          <Text style={styles.name}>{user.username}</Text>
          <Image
            source={{uri: handleImage(place.snapshot.photos)}}
            style={{width: 300, height: 250}}
          />
          <Text style={styles.title}>{place.name}</Text>
          <Text style={styles.content}>{place.snapshot.description}</Text>
        </View>
      </TouchableHighlight>
    </SafeAreaView>
  )
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
  name: {
    fontSize: 20,
    color: '#f7786b',
    textAlign: 'center',
    fontWeight: '400',
    marginTop: 15,
    marginBottom: 5
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
  }
})
