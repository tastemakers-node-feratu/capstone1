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
import MiniSnapShot from '../components/MiniSnapShot';

import {MonoText} from '../components/StyledText';

export default class SnapShotsScreen extends React.Component {
  // componentDidMount() {
  //     this.props.allSnapShots()
  // }

  render() {
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
          {/* {this.props.allSnapShots.map(snapshot => ( */}
          <MiniSnapShot />
          <MiniSnapShot />
          <MiniSnapShot />
          {/* ))} */}
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

// const mapState = state => ({
//     snapShots: state.snapShots
// });

// const mapDispatch = dispatch => ({
//     allSnapShots: () => dispatch(allSnapshotsThunk())
// })

// export default connect(mapState, mapDispatch)(SnapShotsScreen)
