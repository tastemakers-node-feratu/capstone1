import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const FindFriendsButton = props => {
  const {navigate } = props;

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={() => navigate('Find Friends')}>
        <Text style={styles.buttonText}>Find Friends</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    width: 110,
    alignItems: 'center',
    margin: 5,
    justifyContent: 'center',
    height: 30
  },
  buttonText: {
    color: '#000',
    fontSize: 15,
    fontFamily: 'playfair-display'
  }
});

export default FindFriendsButton;
