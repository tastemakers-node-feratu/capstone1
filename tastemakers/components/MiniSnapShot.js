import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native'

export default function Snapshots() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Name</Text>
            <Image source={{ uri: 'https://reactjs.org/logo-og.png' }}
                style={{ width: 300, height: 250, }} />
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a29bfe',
        margin: 15,
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center'
    },
    contentContainer: {
        paddingTop: 15,
    },
    title: {
        fontSize: 30,
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: '400'
    },
})