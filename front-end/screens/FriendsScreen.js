import React from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  View
} from 'react-native';
import {connect} from 'react-redux';
import {getFriendsThunk} from '../store/user';
import MiniFriendView from '../components/MiniFriendView';

import {MonoText} from '../components/StyledText';

class FriendsScreen extends React.Component {
  componentDidMount() {
    const tempUserId = 2;
    this.props.getFriends(tempUserId);
  }

  render() {
    //   console.log('PROPS IN FRIENDS', this.props)
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}>
          <Button title="Home" color="white" />
          <View style={styles.rightButtons}>
            <Button title="Check in" color="white" />
            <Button title="Find Friends" color="white" />
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {this.props.friends.map(friend => {
            return <MiniFriendView key={friend.email} info={friend} />;
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#74b9ff'
  },
  contentContainer: {
    paddingTop: 15
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rightButtons: {
    flexDirection: 'row'
  }
});

const mapState = state => ({
  friends: state.user.friends
});

const mapDispatch = dispatch => ({
  getFriends: () => dispatch(getFriendsThunk(2))
});

export default connect(mapState, mapDispatch)(FriendsScreen);
