import React from 'react';
import {
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    View,
    TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import { getUserSnapsThunk } from '../store/snapshots'
import OneSnapFullView from '../components/OneSnapFullView'

class MySnaps extends React.Component  {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        const {id} = this.props.user;
        this.props.getSnaps(id);
    }
    render(){
        const {user, navigate, userSnaps} = this.props
        return(
            <SafeAreaView style={styles.outerContainer}>
            <View style={styles.container}>
                <Text style={styles.header}>My Snapshots</Text>
                    <ScrollView style={styles.contentContainer}>
                        {this.props.userSnaps.map((place) => {
                            return (<OneSnapFullView key={place.id} user={user} place={place} />)
                        })}
                    </ScrollView>
            </View>
        </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#034f84',
        //74b9ff
    },
    container: {
        flex: 1,
        backgroundColor: '#034f84',
    },
    header: {
        fontSize: 50,
        color: '#f7786b',
        textAlign: 'center',
        paddingBottom: 5
    },
    contentContainer: {
        paddingTop: 15,
    },
});

const mapState = state => {
    return{
        user: state.user,
        userSnaps: state.snapshots.userSnaps
    }
}

const mapDispatch = dispatch => ({
    getSnaps: (id) => {
        dispatch(getUserSnapsThunk(id))
    }
})

export default connect(mapState, mapDispatch)(MySnaps);
