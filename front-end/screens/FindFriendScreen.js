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
import { getStrangersThunk } from '../store/friends'
import { connect } from 'react-redux'
const KEYS_TO_FILTERS = ['username'];
import { MonoText } from '../components/StyledText';

class FindFriendScreen extends React.Component {
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
        this.props.getStrangers(this.props.userId)
    }

    render() {
        const { navigate } = this.props.navigation;
        const filteredUsers = this.props.strangers.filter(createFilter(this.state.searchName, KEYS_TO_FILTERS))
        return (
            <SafeAreaView style={styles.container} >
                <View style={styles.topContainer}>
                </View>
                <SearchInput
                    onChangeText={(name) => { this.searchUpdated(name) }}
                    style={styles.searchInput}
                    placeholder="Type a name to search"
                    placeholderTextColor="#CCC"
                />
                <ScrollView contentContainerStyle={styles.contentContainer} >
                    {
                        filteredUsers.map((friend) => {
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
        backgroundColor: '#034f84',
    },
    contentContainer: {
        paddingTop: 15,
    },
    rightButtons: {
        flexDirection: "row",
    },
    searchInput: {
        padding: 10,
        borderColor: '#CCC',
        borderWidth: 1,
        color: '#f7cac9',
    }
})

const mapState = state => ({
    userId: state.user.id,
    strangers: state.friends.strangers
});

const mapDispatch = dispatch => ({
    getStrangers: (id) => dispatch(getStrangersThunk(id))
});

export default connect(mapState, mapDispatch)(FindFriendScreen);
