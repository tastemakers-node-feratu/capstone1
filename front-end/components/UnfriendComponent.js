/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import {connect} from 'react-redux';
import {removeFriendThunk} from '../store/friends';

class UnfriendComponent extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleUnfriend = this.handleUnfriend.bind(this);
  }

  componentDidMount() {}

  handleUnfriend() {
    const {userId, selectedFriendId, unfriend} = this.props;
    const associateIds = {
      selectedFriendId,
      userId
    };
    unfriend(associateIds);
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.handleUnfriend}>
          <Text style={styles.buttonText}>Unfriend</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 15,
    color: '#FFFFFF',
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
