import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TouchableHighlight,
    View,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { getCuratedSnapsThunk } from '../store/snapshots'
import MiniSnapShot from '../components/MiniSnapShot'
import LogOutButton from '../components/LogOutButton'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class Explore extends React.Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){
    this.props.getCuratedSnaps(this.props.user.id);
  }
  render(){
    const { navigate } = this.props.navigation;
    const { user } = this.props;
    return (
      <SafeAreaView style={styles.container} >
        <View style={styles.topContainer}>
            <LogOutButton navigate={navigate} />
            <View style={styles.rightButtons}>
                <TouchableHighlight onPress={this.openModal} style={styles.filter}>
                    <Icon name="filter-outline" size={30} color="#f2f2f2" />
                </TouchableHighlight>
            </View>
        </View>
        <View style={styles.contentContainer}>
        <FlatList
                        keyExtractor={item => item.id.toString() + item.places[0].id.toString()}
                        data={this.props.curatedSnaps}
                        renderItem={({ item }) => (<MiniSnapShot snapshot={item} navigate={navigate} />)}
                    />
                    </View>
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
  topContainer: {
      flexDirection: "row",
      justifyContent: 'space-between'
  },
  rightButtons: {
      flexDirection: "row",
  },
  filter: {
      borderWidth: 1,
      borderColor: '#f2f2f2',
      borderRadius: 10,
      width: 40,
      alignItems: 'center',
      margin: 5,
      marginRight: 10
  },
  modal: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 100
  },
  backBtn: {
      color: '#FFF',
      fontSize: 15,
      textAlign: 'center'
  },
  buttonContainer: {
      alignSelf: 'flex-start',
      backgroundColor: '#2980b9',
      width: 90,
      paddingVertical: 10,
      marginLeft: 20,
      marginBottom: 5,
      borderRadius: 10
  }
})

const mapState = state => ({
  user: state.user,
  curatedSnaps: state.snapshots.curatedSnaps
})
const mapDispatch = dispatch => ({
  getCuratedSnaps: (userId) => dispatch(getCuratedSnapsThunk(userId))
})

export default connect(mapState, mapDispatch)(Explore);
