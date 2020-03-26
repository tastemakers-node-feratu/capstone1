import React from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, SafeAreaView } from 'react-native'

export default MiniFriendView = (props) => {
    const { info, navigate } = props
    return (
        <SafeAreaView>
            <TouchableHighlight onPress={() => {
                navigate('SingleFriend', { userId: info.id })
            }} >
                <View style={styles.container}>
                    <Text style={styles.name}>{info.username}</Text>
                    <Text style={styles.name}>{info.email}</Text>
                    <Image source={{ uri: info.imageURL }}
                        style={{ width: 225, height: 175 }} />
                </View>
            </TouchableHighlight>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a29bfe',
        margin: 15,
        marginLeft: 30,
        marginRight: 30,
        alignItems: 'center',
        borderRadius: 10,
        paddingBottom: 15
    },
    contentContainer: {
        paddingTop: 15,
    },
    name: {
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: '400',
        marginTop: 15,
        marginBottom: 5,
    },
    title: {
        fontSize: 20,
        fontStyle: 'italic',
        color: '#FFFFFF',
        margin: 10
    },
    content: {
        color: '#FFFFFF',
        marginRight: 25,
        marginLeft: 25,
        marginBottom: 15,
        textAlign: 'center',
    }
})
