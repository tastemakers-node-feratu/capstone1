/* eslint-disable no-use-before-define */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {addFriendThunk} from '../store/friends';
import UnfriendComponent from './UnfriendComponent';

const AddFriendButton = props => {
  const {userId, selectedFriendId, addFriends, friendStatus} = props;

  const handlePress = () => {
    const associateIds = {
      selectedFriendId,
      userId,
      friendStatus
    };
    addFriends(associateIds);
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
    color: '#FFFFFF',
    backgroundColor: '#034f84',
    borderStyle: 'solid',
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    width: 'auto'
  },
  buttonText: {
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '400'
  }
});

const mapState = state => ({
  friendStatus: state.friends.friendStatus,
  userId: state.user.id
});

const mapDispatch = dispatch => ({
  addFriends: data => dispatch(addFriendThunk(data))
});

export default connect(mapState, mapDispatch)(AddFriendButton);
