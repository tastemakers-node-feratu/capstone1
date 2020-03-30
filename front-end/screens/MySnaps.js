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
import UserProfileSnapView from '../components/UserProfileSnapView'

class MySnaps extends React.Component  {
    constructor(props){
        super(props)
    }
    render(){
        const {user, navigate} = this.props
        return(
            <SafeAreaView style={styles.outerContainer}>
            <View style={styles.container}>
                <ScrollView>
                    {user.places.map(place => (
                        <UserProfileSnapView
                        key={place.id}
                        userId={user.id}
                        snapshot={place}
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
        backgroundColor: '#74b9ff',
    },
    container: {
        flex: 1,
        backgroundColor: '#74b9ff',
        margin: 20
    },
});

const mapState = state => {
    return{
        user: state.user
    }
}

export default connect(mapState)(MySnaps);
