import React from 'react';
import {
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
    ScrollView,
    View
} from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { getFriendsThunk } from '../store/friends'
import MiniFriendView from '../components/MiniFriendView'
import { connect } from 'react-redux'
const KEYS_TO_FILTERS = ['username'];
import { MonoText } from '../components/StyledText';

class FriendsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchName: ''
        }
    }
    searchUpdated(name) {
        this.setState({ searchName: name })
    }
    componentDidMount() {
        this.props.getFriends(this.props.userId)
    }

    render() {
        const { navigate } = this.props.navigation;
        const filteredFriends = this.props.friends.filter(createFilter(this.state.searchName, KEYS_TO_FILTERS))
        return (
            <SafeAreaView style={styles.container} >
                <View style={styles.topContainer}>
                    {/* <View style={styles.rightButtons}>
                        <Button title="Find New Friend" color={'white'} />
                    </View> */}
                </View>
                <SearchInput
                    onChangeText={(name) => { this.searchUpdated(name) }}
                    style={styles.searchInput}
                    placeholder="Type a name to search"
                    placeholderTextColor="#CCC"
                />
                <ScrollView contentContainerStyle={styles.contentContainer} >
                    {
                        filteredFriends.map((friend) => {
                            return (
                                <MiniFriendView key={friend.email} info={friend} navigate={navigate}
                                />
                            )
                        })
                    }
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    contentContainer: {
        paddingTop: 15,
    },
    rightButtons: {
        flexDirection: "row",
    },
    searchInput: {
        marginTop: 10,
        padding: 10,
        borderColor: '#000',
        borderWidth: 1,
        color: '#f7cac9',
        borderRadius: 20,
        marginLeft: 10,
        marginRight: 10
    }
})

const mapState = state => ({
    userId: state.user.id,
    friends: state.friends.friends
});

const mapDispatch = dispatch => ({
    getFriends: (id) => dispatch(getFriendsThunk(id))
});

export default connect(mapState, mapDispatch)(FriendsScreen);
