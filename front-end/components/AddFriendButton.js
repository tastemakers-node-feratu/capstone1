/* eslint-disable no-use-before-define */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {addFriendThunk, getFriendStatus} from '../store/friends';
import UnfriendComponent from './UnfriendComponent';

class AddFriendButton extends React.Component {
  constructor() {
    super();
    this.state = {
      myFriend: false,
      iSentRequest: false,
      theySendRequest: false,
      noStatus: true
    };
    this.handlePress = this.handlePress.bind(this);
  }

  async componentDidMount() {
    const {
      selectedFriendId,
      userId,
      friendStatus,
      friendStatusThunk
    } = this.props;
    const associateIds = {
      selectedFriendId,
      userId
    };
    // await friendStatusThunk(associateIds);
    console.log('whats the status', friendStatus);
    if (friendStatus === 'already friends') {
      this.setState({
        myFriend: true,
        noStatus: false
      });
    } else if (friendStatus === 'user sent req') {
      this.setState({
        iSentRequest: true,
        noStatus: false
      });
    } else if (friendStatus === 'friend sent req') {
      this.setState({
        theySendRequest: true,
        noStatus: false
      });
    }
  }

  handlePress() {
    const {userId, selectedFriendId, addFriends, friendStatus} = this.props;
    const associateIds = {
      selectedFriendId,
      userId,
      friendStatus
    };
    addFriends(associateIds);
  }

  // the statement logic:
  // myFriend ? (yes)no button : (no)iSentRequest ? (yes)pendingRequest : (no)theySendRequest? (yes)acceptRequest : (no)sendRequest
  render() {
    const {myFriend, iSentRequest, theySendRequest, noStatus} = this.state;
    const {selectedFriendId, friendStatus} = this.props;
    return noStatus ? null : myFriend ? (
      <View>
        <UnfriendComponent selectedFriendId={selectedFriendId} />
      </View>
    ) : iSentRequest ? (
      <View style={styles.box}>
        <Text style={styles.buttonText}>Request Pending</Text>
      </View>
    ) : theySendRequest ? (
      <View>
        <TouchableOpacity style={styles.box} onPress={this.handlePress}>
          <Text style={styles.buttonText}>Accept Friend Request</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View>
        <TouchableOpacity style={styles.box} onPress={this.handlePress}>
          <Text style={styles.buttonText}>Send Friend Request</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    color: '#FFFFFF',
    backgroundColor: '#74b9ff',
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
  addFriends: data => dispatch(addFriendThunk(data)),
  friendStatusThunk: data => dispatch(getFriendStatus(data))
});

export default connect(mapState, mapDispatch)(AddFriendButton);
