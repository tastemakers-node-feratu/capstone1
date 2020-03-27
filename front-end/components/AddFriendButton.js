/* eslint-disable no-use-before-define */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {Button, StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {addFriendThunk} from '../store/friends';

class AddFriendButton extends React.Component {
  constructor() {
    super();
    this.state = {
      myFriend: false,
      iSentRequest: false,
      theySendRequest: false
    };
  }

  componentDidMount() {
    const {selectedFriend, user, addFriends} = this.props;
    const associateIds = {
      selectedFriend,
      user
    };
    addFriends(associateIds);
  }

  // the statement logic:
  // myFriend ? (yes)no button : (no)iSentRequest ? (yes)pendingRequest : (no)theySendRequest? (yes)acceptRequest : (no)sendRequest
  render() {
    const {myFriend, iSentRequest, theySendRequest} = this.state;
    return myFriend ? null : iSentRequest ? (
      <View>
        <Text style={styles.box}>Request Pending</Text>
      </View>
    ) : theySendRequest ? (
      <View>
        <Button style={styles.box}>Accept Friend Request</Button>
      </View>
    ) : (
      <View>
        <Button style={styles.box}>Send Friend Request</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    color: '#FFFFFF',
    backgroundColor: '#fc0398'
  }
});

const mapState = state => ({
  friend: state.friend
});

const mapDispatch = dispatch => ({
  addFriends: data => dispatch(addFriendThunk(data))
});

export default connect(mapState, mapDispatch)(AddFriendButton);
