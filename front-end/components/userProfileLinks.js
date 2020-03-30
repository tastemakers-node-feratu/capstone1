import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function userProfileLinks(props) {
  const { navigate } = props;
  return (
    <View style={styles.body}>
      <View style={styles.item}>
        <View style={styles.iconContent}>
          <Icon style={styles.icon} name="users" size={30} color="white" />
        </View>
        <TouchableOpacity style={styles.infoContent} onPress={() => {
          navigate('All Friends');
        }}
        >
          <Text style={styles.info}>My Friends</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.item}>
        <View style={styles.iconContent}>
          <Icon style={styles.icon} name="tags" size={30} color="white" />
        </View>
        <TouchableOpacity style={styles.infoContent}>
          <Text style={styles.info}>My Pins</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.item}>
        <View style={styles.iconContent}>
          <Icon style={styles.icon} name="gears" size={30} color="white" />
        </View>
        <TouchableOpacity style={styles.infoContent}>
          <Text style={styles.info}>Settings</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#a29bfe",
    height: 500,
    flexShrink: 1,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  iconContent: {
    flex: 1,
    alignItems: 'center',
    width: 80,
    paddingRight: 7,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 30,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    marginRight: 90,
    color: "#FFFFFF",
    // alignSelf: 'flex-start',
  },
});
