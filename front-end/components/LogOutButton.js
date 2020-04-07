/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {Button, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
// import * as GoogleSignIn from 'expo-google-sign-in';
import * as Google from 'expo-google-app-auth';
import {logOutThunk} from '../store/user';
import {androidClientId, iosClientId} from '../superSecret';

const LogOutButton = props => {
  const {navigate, logOutThunk, user, googleId} = props;

  const logout = async () => {
    logOutThunk();
    navigate('Auth');
  };

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={logout}>
      {/* <Button title="Log Out" color="black"onPress={logout}> */}
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
      {/* </Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    // backgroundColor: '#FFF',
    // borderBottomWidth: 0.5,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    width: 80,
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

const mapState = state => ({
  user: state.user,
  googleId: state.user.googleId
});

const mapDispatch = dispatch => ({
  logOutThunk: () => dispatch(logOutThunk())
});

export default connect(mapState, mapDispatch)(LogOutButton);
