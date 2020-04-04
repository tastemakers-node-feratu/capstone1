/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
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
      <Button title="Log Out" color="white" onPress={logout} />
    </View>
  );
};

const mapState = state => ({
  user: state.user,
  googleId: state.user.googleId
});

const mapDispatch = dispatch => ({
  logOutThunk: () => dispatch(logOutThunk())
});

export default connect(mapState, mapDispatch)(LogOutButton);
