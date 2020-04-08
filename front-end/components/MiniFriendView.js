import React from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, SafeAreaView } from 'react-native'

export default MiniFriendView = (props) => {
    const { info, navigate } = props
    return (
        <SafeAreaView>
            <TouchableHighlight onPress={() => {
                navigate('SingleFriend', { friendId: info.id })
            }} >
                <View style={styles.container}>
                    <Text style={styles.name}>{info.username}</Text>
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
        backgroundColor: '#FFF',
        margin: 15,
        marginLeft: 30,
        marginRight: 30,
        alignItems: 'center',
        borderRadius: 10,
        paddingBottom: 15,
        borderWidth: 1,
        shadowRadius: 0.8,
        shadowOffset: {width: 0, height: 3},
        shadowColor: '#f7786b',
        shadowOpacity: 0.3
    },
    name: {
        fontSize: 20,
        color: '#f7786b',
        textAlign: 'center',
        fontWeight: '400',
        marginTop: 15,
        marginBottom: 5,
    }
})
