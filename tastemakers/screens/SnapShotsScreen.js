import React from 'react';
import {
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    ScrollView,
    View,
} from 'react-native';
import MiniSnapShot from '../components/MiniSnapShot'
import { allSnapshotsThunk } from '../store/snapshots'

import { MonoText } from '../components/StyledText';

export default class SnapShotsScreen extends React.Component {
    // componentDidMount() {
    //     this.props.allSnapshotsThunk()
    // }

    render() {
        return (
            <SafeAreaView style={styles.container} >
                <View style={styles.topContainer}>
                    <Button title="Home" color={'white'} />
                    <View style={styles.rightButtons}>
                        <Button title="Check in" color={'white'} />
                        <Button title="Find Friends" color={'white'} />
                    </View>
                </View>
                <ScrollView contentContainerStyle={styles.contentContainer} >
                    {/* {this.props.allSnapshots.map(snapshot => ( */}
                    <MiniSnapShot snapshot={snapshot} />
                    <MiniSnapShot />
                    <MiniSnapShot />
                    {/* ))} */}
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
    }
})

const mapState = state => ({
    allSnapshots: state.snapshots.allSnapshots
});

const mapDispatch = dispatch => ({
    allSnapshotsThunk: () => dispatch(allSnapshotsThunk())
})

// export default connect(mapState, mapDispatch)(SnapShotsScreen)