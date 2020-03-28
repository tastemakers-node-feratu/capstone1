/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {logOutThunk} from '../store/user';

const LogOutButton = props => {
  const {navigate, logOutThunk} = props;

  const logout = async () => {
    await logOutThunk();
    navigate('Home');
  };

  return (
    <View>
      <Button title="Log Out" color="white" onPress={logout} />
    </View>
  );
};

// const styles = StyleSheet.create({});

const mapState = state => ({
  user: state.user
});

const mapDispatch = dispatch => ({
  logOutThunk: () => dispatch(logOutThunk())
});

export default connect(mapState, mapDispatch)(LogOutButton);
