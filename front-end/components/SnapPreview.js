import React from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, SafeAreaView } from 'react-native'

export default function SnapPreview(props) {
  const { user, snapshot } = props;
    return (
        <SafeAreaView >
          <View style={styles.container}>
            <View style={styles.userContainer}>
              <Image source={{ uri: user.imageURL }}
                style={{ width: 120, height: 120, borderRadius: 30 }} />
              <View style={styles.outerText}>
                <Text style={styles.name}>{user.username} pinned {snapshot.placeName}</Text>
                <Text style={styles.location}> {snapshot.location}</Text>
              </View>
            </View>
            <Text style={styles.content}>{snapshot.description}</Text>
            <Image source={{ uri: snapshot.photos }}
              style={{ width: 300, height: 250, alignSelf: "center" }} />
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
      flexWrap: 'wrap'
  },
  title: {
      fontSize: 20,
      fontStyle: 'italic',
      color: '#FFFFFF',
      textAlign: 'center',
      margin: 10
  },
  userContainer: {
      paddingLeft: 60,
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
      marginRight: 25,
      marginLeft: 25,
      marginBottom: 15,
      textAlign: 'center',
  }
})
