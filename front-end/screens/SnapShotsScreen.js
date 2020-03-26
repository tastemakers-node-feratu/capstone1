import React from 'react';
import {
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
    ScrollView,
    View,
} from 'react-native';
import { Spinner } from 'native-base'
import MiniSnapShot from '../components/MiniSnapShot'
import { allSnapshotsThunk } from '../store/snapshots'
import { connect } from 'react-redux';
import { MonoText } from '../components/StyledText';
import LogOutButton from '../components/LogOutButton';

class SnapShotsScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            category: ''
        }
    }

    componentDidMount() {
        this.props.allSnapshotsThunk()
    }

    render() {
        const { navigate } = this.props.navigation;
        return !this.props.allLoading ? (
            <SafeAreaView style={styles.container} >
                <View style={styles.topContainer}>
                    <LogOutButton navigate={navigate} />
                    <View style={styles.rightButtons}>
                        <Button title="Check in" color={'white'} />
                        <Button title="My Friends" color={'white'} onPress={() => navigate('AllFriends')} />
                    </View>
                </View>
                <ScrollView contentContainerStyle={styles.contentContainer} >
                    {this.props.allSnapshots.map(snapshot => (
                        <MiniSnapShot key={snapshot.id} snapshot={snapshot} navigate={navigate} />
                    ))}
                </ScrollView>
            </SafeAreaView>
        ) : (
                <SafeAreaView style={{ flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: '#74b9ff' }}>
                    <Spinner color="#7d5fff" />
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
    }
})

const mapState = state => ({
    allSnapshots: state.snapshots.allSnapshots,
    allLoading: state.snapshots.allLoading
});

const mapDispatch = dispatch => ({
    allSnapshotsThunk: () => dispatch(allSnapshotsThunk())
})

export default connect(mapState, mapDispatch)(SnapShotsScreen)