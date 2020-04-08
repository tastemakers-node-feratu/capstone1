/* eslint-disable no-use-before-define */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { addFriendThunk, getFriendsThunk, getStrangersThunk } from '../store/friends';
import UnfriendComponent from './UnfriendComponent';

const AddFriendButton = props => {
  const { userId, selectedFriendId, addFriends, friendStatus, getFriends, getStrangers } = props;

  const handlePress = () => {
    const associateIds = {
      selectedFriendId,
      userId,
      friendStatus
    };
    addFriends(associateIds);
    getFriends(userId)
    getStrangers(userId)
  };

  const whichButton = () => {
    switch (friendStatus) {
      case '': {
        return null;
      }
      case 'already friends': {
        return <UnfriendComponent selectedFriendId={selectedFriendId} />;
      }
      case 'user sent req': {
        return <Text style={styles.buttonText}>Request Pending</Text>;
      }
      case 'friend sent req': {
        return (
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.buttonText}>Accept Friend Request</Text>
          </TouchableOpacity>
        );
      }
      case 'not friends': {
        return (
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.buttonText}>Send Friend Request</Text>
          </TouchableOpacity>
        );
      }
      default:
        return null;
    }
  };
  return <View style={styles.box}>{whichButton()}</View>;
};

const styles = StyleSheet.create({
  box: {
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    width: 'auto'
  },
  buttonText: {
    fontSize: 15,
    color: '#f7786b',
    textAlign: 'center',
    fontWeight: '400'
  }
});

const mapState = state => ({
  friendStatus: state.friends.friendStatus,
  userId: state.user.id
});

const mapDispatch = dispatch => ({
  addFriends: data => dispatch(addFriendThunk(data)),
  getFriends: (id) => dispatch(getFriendsThunk(id)),
  getStrangers: (id) => dispatch(getStrangersThunk(id))
});

export default connect(mapState, mapDispatch)(AddFriendButton);
