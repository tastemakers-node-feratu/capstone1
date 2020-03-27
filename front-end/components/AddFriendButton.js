/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {addFriendThunk} from '../store/friends';

const AddFriendButton = props => {
  const clicked = false;

  const friendStatus = () => {};

  return clicked ? (
    <View>
      <Button>Send Friend Request</Button>
    </View>
  ) : (
    <View>
      <Button>Accept Friend Request</Button>
    </View>
  );
};

const mapState = state => ({
  user: state.user
});

const mapDispatch = dispatch => ({
  addFriend: data => dispatch(addFriendThunk(data))
});

export default connect(mapState, mapDispatch)(AddFriendButton);
