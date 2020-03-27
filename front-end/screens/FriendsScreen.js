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
import { getFriendsThunk } from '../store/user'
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
        const tempUserId = 2;
        this.props.getFriends(tempUserId)
    }

    render() {
        const { navigate } = this.props.navigation;
        const filteredFriends = this.props.friends.filter(createFilter(this.state.searchName, KEYS_TO_FILTERS))
        return (
            <SafeAreaView style={styles.container} >
                <View style={styles.topContainer}>
                    <Button title="Home" color={'white'} />
                    <View style={styles.rightButtons}>
                        <Button title="Check in" color={'white'} />
                    </View>
                </View>
                <SearchInput
                    onChangeText={(name) => { this.searchUpdated(name) }}
                    style={styles.searchInput}
                    placeholder="Type a name to search"
                />
                <ScrollView contentContainerStyle={styles.contentContainer} >
                    {
                        filteredFriends.map((friend) => {
                            return (
                                <MiniFriendView key={friend.email} info={friend} navigate={navigate} />
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
        backgroundColor: '#74b9ff',
    },
    contentContainer: {
        paddingTop: 15,
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    rightButtons: {
        flexDirection: "row",
    },
    searchInput: {
        padding: 10,
        borderColor: '#CCC',
        borderWidth: 1,
        color: '#FFFFFF',
    }
})

const mapState = state => ({
    // userId: state.user.id,
    friends: state.user.friends
});

const mapDispatch = dispatch => ({
    getFriends: () => dispatch(getFriendsThunk(2))
});

export default connect(mapState, mapDispatch)(FriendsScreen);
