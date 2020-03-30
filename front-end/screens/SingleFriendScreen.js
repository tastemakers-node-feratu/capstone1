import React from 'react';
import {
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
    ScrollView,
    Image,
    View,
} from 'react-native';
import { Spinner } from 'native-base'
import { getSingleFriendThunk, gotFriendshipThunk } from '../store/friends'
import { connect } from 'react-redux';
import { MonoText } from '../components/StyledText';
import UserProfileSnapView from '../components/UserProfileSnapView';
import AddFriendButton from '../components/AddFriendButton';

class SingleFriendScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { route } = this.props;
        const { friendId } = route.params
        this.props.getSingleFriendThunk(friendId)
        // this.props.gotFriendshipThunk(userId, friendId)
    }

    render() {
        const singlefriend = this.props.singlefriend

        const { navigate } = this.props.navigation;
        return !this.props.singleFriendLoading ? (

            <SafeAreaView style={styles.outerContainer}>
                <View style={styles.container}>
                    <View style={styles.userContainer}>
                        <Image source={{ uri: singlefriend.imageURL }}
                            style={{ width: 150, height: 170, borderRadius: 30 }} />

                        <View style={styles.userInfo}>
                            <Text style={styles.name}>{singlefriend.username}</Text>
                            <Text style={styles.email}>{singlefriend.email}</Text>
                            <AddFriendButton style={styles.addFriendButton} selectedFriendId={singlefriend.id} />
                        </View>
                    </View>
                    <Text style={styles.userContent}>Bio: {singlefriend.bio} {"\n"}
                    </Text>
                    <ScrollView style={styles.snapContainer}>
                        {singlefriend.places.map(place => (
                            <UserProfileSnapView
                                key={place.id} userId={singlefriend.id} snapshot={place} navigate={navigate} />
                        ))}
                    </ScrollView>

                </View>
            </SafeAreaView>
        ) : (
                <SafeAreaView style={{ flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: '#74b9ff' }
                }>
                    <Spinner color="#7d5fff" />
                </SafeAreaView >
            )
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#74b9ff',
    },
    container: {
        flex: 1,
        backgroundColor: '#74b9ff',
        margin: 10
    },
    userContainer: {
        flexDirection: "row",
    },
    userInfo: {
        flexShrink: 1,
        paddingTop: 10,
        paddingBottom: 10
    },
    name: {
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: '400',
        // flexWrap: 'wrap'
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
        marginLeft: 10,
        // flexShrink: 1,
        flexDirection: "row",
    },
    addFriendButton: {
        color: '#FFFFFF',
        backgroundColor: '#fc0398',
        width: 190,
        textAlign: 'center',
        margin: 10
    }

});

const mapState = state => ({
    singlefriend: state.friends.singlefriend,
    singleFriendLoading: state.friends.singleFriendLoading,
    // singleFriendship: state.friends.singleFriendship,
    // friendshipLoading: state.friends.friendshipLoading
});

const mapDispatch = dispatch => ({
    getSingleFriendThunk: (userId) => dispatch(getSingleFriendThunk(userId)),
    gotFriendshipThunk: (userId, friendId) => dispatch(gotFriendshipThunk(userId, friendId)),
})

export default connect(mapState, mapDispatch)(SingleFriendScreen)