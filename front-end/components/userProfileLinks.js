import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function userProfileLinks(props) {
  return (
  <View style={styles.body}>
    <View style={styles.item}>
      <View style={styles.iconContent}>
        <Icon style={styles.icon} name="users" size={30} color="white"/>
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.info}>My Friends</Text>
      </View>
    </View>

    <View style={styles.item}>
      <View style={styles.iconContent}>
        <Icon style={styles.icon} name="tags" size={30} color="white"/>
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.info}>My Pins</Text>
      </View>
    </View>

    <View style={styles.item}>
      <View style={styles.iconContent}>
        <Icon style={styles.icon} name="gears" size={30} color="white"/>
      </View>
      <View style={styles.infoContent}>
        <Text style={styles.info}>Settings</Text>
      </View>
    </View>

  </View>
  )
}

const styles = StyleSheet.create({

})
