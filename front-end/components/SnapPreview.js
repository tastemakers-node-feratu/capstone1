import React from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, SafeAreaView } from 'react-native'

export default function SnapPreview(props) {
  const { user, snapshot } = props;
    return (
        <SafeAreaView >
          <View style={styles.container}>
            <View style={styles.userContainer}>
              <Image source={user.imageURL ? {uri: user.imageURL} : {uri: 'https://reactnative.dev/img/tiny_logo.png'}}
                style={{ width: 120, height: 120, borderRadius: 30 }} />
              <View style={styles.outerText}>
                <Text style={styles.name}>{user.username} pinned {snapshot.placeName}</Text>
                <Text style={styles.location}> {snapshot.location}</Text>
              </View>
            </View>
            <Text style={styles.content}>{snapshot.description}</Text>
            <Image source={snapshot.imageURL ? {uri: snapshot.imageURL} : {uri: ''}}
              style={{ width: 200, height: 200, alignSelf: "center", padding: 10 }} />
          </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#74b9ff',

  },
  contentContainer: {
      marginTop: 25
  },
  topContainer: {
      flexDirection: "row",
      justifyContent: 'space-between'
  },
  outerText: {
      flexShrink: 1,
      justifyContent: 'space-around'
  },
  name: {
      flex: 1,
      fontSize: 20,
      color: '#FFFFFF',
      textAlign: 'center',
      fontWeight: '400',
      flexWrap: 'wrap',
      padding: 15
  },
  title: {
      fontSize: 20,
      fontStyle: 'italic',
      color: '#FFFFFF',
      textAlign: 'center',
      margin: 10,
  },
  userContainer: {
      paddingTop: 30,
      paddingHorizontal: 25,
      paddingBottom: 20,
      flexDirection: "row",
  },
  location: {
      color: '#FFFFFF',
      marginLeft: 15,
      fontStyle: 'italic',
      fontSize: 16,
      textAlign: 'center',
      fontWeight: '400',
  },
  rightButtons: {
      flexDirection: "row",
  },
  content: {
      color: '#FFFFFF',
      marginBottom: 15,
      textAlign: 'center',
  }
})
