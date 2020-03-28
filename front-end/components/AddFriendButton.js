/* eslint-disable no-use-before-define */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {addFriendThunk, getFriendStatus} from '../store/friends';

class AddFriendButton extends React.Component {
  constructor() {
    super();
    this.state = {
      myFriend: false,
      iSentRequest: false,
      theySendRequest: false
    };
    this.handlePress = this.handlePress.bind(this);
  }

  async componentDidMount() {
    const {
      selectedFriendId,
      userId,
      friendStatus,
      getFriendStatus
    } = this.props;
    const associateIds = {
      selectedFriendId,
      userId
    };
    await getFriendStatus(associateIds);
    if (friendStatus === 'already friends') {
      this.setState({
        myFriend: true
      });
    } else if (friendStatus === 'user sent req') {
      this.setState({
        iSentRequest: true
      });
    } else if (friendStatus === 'friend sent req') {
      this.setState({
        theySendRequest: true
      });
    }
  }

  handlePress() {
    const {userId, selectedFriendId, addFriends} = this.props;
    const associateIds = {
      selectedFriendId,
      userId
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
        <TouchableOpacity style={styles.box} onPress={this.handlePress}>
          <Text>Accept Friend Request</Text>
        </TouchableOpacity>
      </View>
    ) : (
      <View>
        <TouchableOpacity style={styles.box} onPress={this.handlePress}>
          <Text>Send Friend Request</Text>
        </TouchableOpacity>
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
  friendStatus: state.friends.friendStatus,
  userId: state.user.id
});

const mapDispatch = dispatch => ({
  addFriends: data => dispatch(addFriendThunk(data)),
  getFriendStatus: data => dispatch(getFriendStatus(data))
});

export default connect(mapState, mapDispatch)(AddFriendButton);
