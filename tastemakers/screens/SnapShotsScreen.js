import React from 'react';
import {
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native';
import MiniSnapShot from '../components/MiniSnapShot'

import { MonoText } from '../components/StyledText';

export default class SnapShotsScreen extends React.Component {
    // componentDidMount() {
    //     this.props.allSnapShots()
    // }

    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} >
                {/* {this.props.allSnapShots.map(snapshot => ( */}
                <MiniSnapShot />
                <MiniSnapShot />
                <MiniSnapShot />
                {/* ))} */}
            </ScrollView>
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
    }
})

// const mapState = state => ({
//     snapShots: state.snapShots
// });

// const mapDispatch = dispatch => ({
//     allSnapShots: () => dispatch(allSnapshotsThunk())
// })

// export default connect(mapState, mapDispatch)(SnapShotsScreen)