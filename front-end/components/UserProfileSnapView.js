import React from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight, SafeAreaView } from 'react-native'

export default function UserProfileSnapView(props) {
    const { snapshot, userId, navigate } = props

    return (
        <SafeAreaView >
            <TouchableHighlight onPress={() => { navigate('SingleSnap', { userId: userId, placeId: snapshot.id, }) }} >
                <View style={styles.container}>
                    <Text style={styles.name}>{snapshot.name}</Text>
                    <Text style={styles.content}>{snapshot.description}</Text>
                    <Image source={{ uri: snapshot.photos }}
                        style={{ width: 300, height: 250, }}
                    />
                </View>
            </TouchableHighlight>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a29bfe',
        margin: 15,
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
        borderRadius: 10
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