/* eslint-disable no-use-before-define */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {addFriendThunk} from '../store/friends';
import UnfriendComponent from './UnfriendComponent';

class AddFriendButton extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handlePress = this.handlePress.bind(this);
    this.whichButton = this.whichButton.bind(this);
  }

  async componentDidMount() {}

  handlePress() {
    const {userId, selectedFriendId, addFriends, friendStatus} = this.props;
    const associateIds = {
      selectedFriendId,
      userId,
      friendStatus
    };
    addFriends(associateIds);
  }

  whichButton() {
    const {friendStatus, selectedFriendId} = this.props;
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
          <TouchableOpacity onPress={this.handlePress}>
            <Text style={styles.buttonText}>Accept Friend Request</Text>
          </TouchableOpacity>
        );
      }
      case 'not friends': {
        return (
          <TouchableOpacity onPress={this.handlePress}>
            <Text style={styles.buttonText}>Send Friend Request</Text>
          </TouchableOpacity>
        );
      }
      default:
        return null;
    }
  }

  render() {
    return <View style={styles.box}>{this.whichButton()}</View>;
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
  addFriends: data => dispatch(addFriendThunk(data))
});

export default connect(mapState, mapDispatch)(AddFriendButton);
