import React from 'react';
import {
    Button,
    SafeAreaView,
    StyleSheet,
    Text,
    ScrollView,
    Image,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import MiniSnapShot from '../components/MiniSnapShot'

class MySnaps extends React.Component  {
    constructor(props){
        super(props)
    }
    render(){
        const {user, navigate} = this.props
        return(
            <SafeAreaView style={styles.outerContainer}>
            <View style={styles.container}>
                <Text style={styles.header}>My Snapshots</Text>
                    <ScrollView>
                        {user.places.map(place => (
                            <MiniSnapShot
                            key={place.id}
                            snapshot={user}
                            navigate={navigate}
                            />
                        ))}
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
        margin: 20
    },
    header: {
        fontSize: 50,
        color: '#f7786b',
        textAlign: 'center',
        paddingBottom: 5
    }
});

const mapState = state => {
    return{
        user: state.user
    }
}

export default connect(mapState)(MySnaps);
