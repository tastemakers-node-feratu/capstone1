import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {logOut} from '../store/user';

const LogOutButton = props => {
  const {navigate} = props;

  const logout = () => {
    props.logOut();
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
  logOut: () => dispatch(logOut())
});

export default connect(mapState, mapDispatch)(LogOutButton);
