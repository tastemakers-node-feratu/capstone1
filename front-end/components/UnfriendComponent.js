/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {removeFriendThunk} from '../store/friends';

const UnfriendComponent = props => {
  const {userId, selectedFriendId, unfriend} = props;

  const handleUnfriend = () => {
    const associateIds = {
      selectedFriendId,
      userId
    };
    unfriend(associateIds);
  };

  return (
    <View>
      <TouchableOpacity onPress={handleUnfriend}>
        <Text style={styles.buttonText}>Unfriend</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 15,
    color: '#f7786b',
    textAlign: 'center',
    fontWeight: '400'
  }
});

const mapState = state => ({
  userId: state.user.id
});

const mapDispatch = dispatch => ({
  unfriend: data => dispatch(removeFriendThunk(data))
});

export default connect(mapState, mapDispatch)(UnfriendComponent);
