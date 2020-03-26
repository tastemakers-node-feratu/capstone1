import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    ScrollView,
    Image,
    View,
    TouchableHighlight
} from 'react-native';
import { Spinner } from 'native-base'
import { singleSnapshotThunk } from '../store/snapshots'
import { connect } from 'react-redux';
import { MonoText } from '../components/StyledText';

class OneSnapScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { route } = this.props;
        const { userId } = route.params
        const { placeId } = route.params

        // const tempUserId = 1
        // const tempPlaceId = 39;
        this.props.singleSnapshotThunk(userId, placeId)
    }

    render() {
        const snapshot = this.props.selectedSnapshot
        const { navigate } = this.props.navigation;
        return !this.props.oneLoading ? (
            <SafeAreaView style={styles.container} >
                {/* <View style={styles.topContainer}>
                    <Button title="Home" color={'white'} />
                    <View style={styles.rightButtons}>
                        <Button title="Check in" color={'white'} />
                        <Button title="Find Friends" color={'white'} />
                    </View> 
                </View>*/}
                <ScrollView contentContainerStyle={styles.contentContainer} >
                    <SafeAreaView>
                        <View style={styles.container}>
                            <View style={styles.userContainer}>
                                <Image source={{ uri: snapshot.imageURL }}
                                    style={{ width: 120, height: 120, borderRadius: 30 }} />
                                <View style={styles.outerText}>
                                    <TouchableHighlight onPress={() => {
                                        navigate('SingleFriend', { userId: snapshot.id })
                                    }} >
                                        <Text style={styles.name}>{snapshot.username} pinned {snapshot.places[0].name}</Text>
                                    </TouchableHighlight>
                                    <Text style={styles.location}> {snapshot.places[0].location}</Text>
                                </View>
                            </View>
                            <Text style={styles.content}>{snapshot.places[0].snapshot.description}</Text>
                            <Image source={{ uri: snapshot.places[0].snapshot.photos }}
                                style={{ width: 300, height: 250, alignSelf: "center" }} />
                        </View>
                    </SafeAreaView>
                </ScrollView>
            </SafeAreaView >
        ) : (
                <SafeAreaView style={{ flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: '#74b9ff' }
                }>
                    <Spinner color="#7d5fff" />
                </SafeAreaView >
            )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#74b9ff',

    },
    contentContainer: {
        marginTop: 25
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    outerText: {
        flexShrink: 1,
        justifyContent: 'space-around',
        marginLeft: 10
    },
    name: {
        flex: 1,
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: '400',
        flexWrap: 'wrap'
    },
    title: {
        fontSize: 20,
        fontStyle: 'italic',
        color: '#FFFFFF',
        textAlign: 'center',
        margin: 10
    },
    userContainer: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 20,
        flexDirection: "row",
    },
    location: {
        color: '#FFFFFF',
        marginLeft: 15,
        fontStyle: 'italic',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '400',
    },
    rightButtons: {
        flexDirection: "row",
    },
    content: {
        color: '#FFFFFF',
        marginRight: 25,
        marginLeft: 25,
        marginBottom: 15,
        textAlign: 'center',
    }
})

const mapState = state => ({
    selectedSnapshot: state.snapshots.selectedSnapshot,
    oneLoading: state.snapshots.oneLoading
});

const mapDispatch = dispatch => ({
    singleSnapshotThunk: (userId, placeId) => dispatch(singleSnapshotThunk(userId, placeId))
})

export default connect(mapState, mapDispatch)(OneSnapScreen);
