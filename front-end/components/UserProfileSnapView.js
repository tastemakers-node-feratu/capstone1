import React from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, SafeAreaView } from 'react-native'

export default function UserProfileSnapView(props) {
    const { snapshot, userId, navigate } = props

    return (
        <View style={styles.snapContainer}>
            <TouchableHighlight onPress={() => { navigate('SingleSnap', { userId: userId, placeId: snapshot.id, }) }} >
                <View style={styles.container}>
                    <Text style={styles.name}>{snapshot.name}</Text>
                    <Text style={styles.content}>{snapshot.snapshot.description}</Text>
                    <Image source={{ uri: snapshot.snapshot.photos }}
                        style={{ width: 300, height: 250, }}
                    />
                </View>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    // snapContainer: {
    //     width: 300,
    //     height: 250
    // },
    container: {
        flex: 1,
        backgroundColor: '#a29bfe',
        margin: 10,
        alignItems: 'center',
        borderRadius: 10
    },
    name: {
        fontSize: 20,
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: '400',
        marginTop: 15,
        marginBottom: 5,
    },
    content: {
        color: '#FFFFFF',
        fontStyle: 'italic',
        textAlign: 'center',
    }
})