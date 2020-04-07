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
    <View>
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
          <TouchableOpacity style={styles.infoContent}
            onPress={() => navigate("My Pins")}
          >
            <Text style={styles.info}>My Pins</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.item}>
        <View style={styles.iconContent}>
          <Icon style={styles.icon} name="gears" size={30} color="white" />
        </View>
        <TouchableOpacity style={styles.infoContent}>
          <Text style={styles.info}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  body: {
    marginTop: -15,
    backgroundColor: "#FFF",
    height: 500,
    alignItems: 'center'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    width: 200
  },
  iconContent: {
    alignItems: 'center',
    paddingRight: 7
  },
  icon: {
    width: 30,
    height: 30,
    color: '#f7786b'
  },
  info: {
    fontSize: 20,
    color: '#f7786b',
    fontFamily: 'playfair-display',
  }
});
