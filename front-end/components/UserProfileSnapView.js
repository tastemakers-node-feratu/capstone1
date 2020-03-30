import React from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, SafeAreaView } from 'react-native'

export default function UserProfileSnapView(props) {
    const { snapshot, userId, navigate } = props

    return (
        <View >
            <TouchableHighlight style={{padding: 10, alignItems: 'center'}}onPress={() => { navigate('SingleSnap', { userId: userId, placeId: snapshot.id, }) }} >
                <View style={styles.container}>
                    <Text style={styles.name}>{snapshot.name}</Text>
                    <Text style={styles.content}>{snapshot.snapshot.description}</Text>
                    <Image source={require('../assets/images/right-arrow.png')} />
                </View>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a29bfe',
        alignItems: 'center',
        borderRadius: 10,
        height: 150,
        width: 160,
    },
    name: {
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: '400',
        marginTop: 5,
        marginBottom: 5,
    },
    content: {
        color: '#FFFFFF',
        fontStyle: 'italic',
        textAlign: 'center',
    }
})
