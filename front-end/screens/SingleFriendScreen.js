import React from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  View
} from 'react-native';
import {Spinner} from 'native-base';
import {connect} from 'react-redux';
import {
  getSingleFriendThunk,
//   gotFriendshipThunk,
  getFriendStatus
} from '../store/friends';
import {MonoText} from '../components/StyledText';
import UserProfileSnapView from '../components/UserProfileSnapView';
import AddFriendButton from '../components/AddFriendButton';

class SingleFriendScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    const {route, getSingleFriendThunk, gotFriendshipThunk, user} = this.props;
    const {friendId} = route.params;
    await getSingleFriendThunk(friendId);
    // await gotFriendshipThunk(user.id, friendId);
    const {singlefriend, friendStatus, friendStatusThunk} = this.props;
    console.log('-BEGIN- right before friendStatusThunk in singleFriendScreen) userid :', user.id)
    const associateIds = {
      selectedFriendId: singlefriend.id,
      userId: user.id
    };
    await friendStatusThunk(associateIds);
    console.log('(after friendStatusThunk in singleFriendScreen) friendStatus:', friendStatus);
  }

  render() {
    const singlefriend = this.props.singlefriend;

    const {navigate} = this.props.navigation;
    return !this.props.singleFriendLoading ? (
      <SafeAreaView style={styles.outerContainer}>
        <View style={styles.container}>
          <View style={styles.userContainer}>
            <Image
              source={{uri: singlefriend.imageURL}}
              style={{width: 150, height: 170, borderRadius: 30}}
            />

            <View style={styles.userInfo}>
              <Text style={styles.name}>{singlefriend.username}</Text>
              <Text style={styles.email}>{singlefriend.email}</Text>
              <AddFriendButton
              style={styles.addFriendButton}
              selectedFriendId={singlefriend.id}
              />
            </View>
          </View>
          <Text style={styles.userContent}>
            Bio: {singlefriend.bio} {'\n'}
          </Text>
          <ScrollView style={styles.snapContainer}>
            {singlefriend.places.map(place => (
              <UserProfileSnapView
                key={place.id}
                userId={singlefriend.id}
                snapshot={place}
                navigate={navigate}
              />
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    ) : (
      <SafeAreaView
        style={{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#74b9ff'
        }}
      >
        <Spinner color="#7d5fff" />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#74b9ff'
  },
  container: {
    flex: 1,
    backgroundColor: '#74b9ff',
    margin: 20
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  userInfo: {
    alignItems: 'center',
    flexShrink: 1,
    paddingTop: 20,
    paddingBottom: 20
  },
  name: {
    // flex: 1,
    fontSize: 20,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '400',
    flexWrap: 'wrap'
  },
  email: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#FFFFFF',
    textAlign: 'center',
    margin: 10
  },
  userContent: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#FFFFFF',
    textAlign: 'center',
    margin: 10
  },
  snapContainer: {
    marginLeft: 15
  }
});

const mapState = state => ({
  singlefriend: state.friends.singlefriend,
  singleFriendLoading: state.friends.singleFriendLoading,
  // singleFriendship: state.friends.singleFriendship,
  // friendshipLoading: state.friends.friendshipLoading,
  friendStatus: state.friends.friendStatus,
  user: state.user
});

const mapDispatch = dispatch => ({
  getSingleFriendThunk: userId => dispatch(getSingleFriendThunk(userId)),
//   gotFriendshipThunk: (userId, friendId) =>
//     dispatch(gotFriendshipThunk(userId, friendId)),
  friendStatusThunk: data => dispatch(getFriendStatus(data))
});

export default connect(mapState, mapDispatch)(SingleFriendScreen);
