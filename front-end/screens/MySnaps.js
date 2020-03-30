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
        return(
            <SafeAreaView style={styles.outerContainer}>
            <View style={styles.continaer}>
                <ScrollView style={styles.snapContainer}>
                    <Text>Hello</Text>
                    {/* <UserProfileSnapView /> */}
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
    userContainer: {
        flexDirection: "row",
    },
    userInfo: {
        flexShrink: 1,
        paddingTop: 20,
        paddingBottom: 20
    },
    name: {
        flex: 1,
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: '400',
        flexWrap: 'wrap'
    },
    email: {
        fontSize: 18,
        fontStyle: 'italic',
        color: '#FFFFFF',
        textAlign: 'center',
        margin: 10
    },
    userContent: {
        fontSize: 16,
        fontStyle: 'italic',
        color: '#FFFFFF',
        textAlign: 'center',
        margin: 10
    },
    snapContainer: {
        marginLeft: 15,
    },
    addFriendButton: {
        color: '#FFFFFF',
        backgroundColor: '#fc0398',
        width: 200,
        margin: 5
    }

});

// export default MySnaps;
const mapState = state => {
    return{
        user: state.user
    }
}

const mapDispatch = dispatch => ({
    // getUser: ()=>dispatch(getPlacesThunk)
})

export default connect(mapState)(MySnaps);
