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
        <TouchableOpacity style={styles.box} onPress={this.handleUnfriend}>
          <Text style={styles.buttonText}>Unfriend</Text>
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
  userId: state.user.id
});

const mapDispatch = dispatch => ({
  unfriend: data => dispatch(removeFriendThunk(data))
});

export default connect(mapState, mapDispatch)(UnfriendComponent);
