import React from 'react';
import { Text, View, StyleSheet, Image, Button, SafeAreaView } from 'react-native'

export default function Snapshots(props) {
    const { snapshot } = props.snapshot
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.name}>Name</Text>
                <Image source={{ uri: snapshot.photos }}
                    style={{ width: 300, height: 250, }} />
                <Text style={styles.title}>{snapshot.description}</Text>
                <Text style={styles.content}>Snap Shot paragraph paragraph: “I got to the resto around 10am but there was STILL a long wait. Food was well worth it though. Pro-tip: get there at 8am!” </Text>
            </View>
        </SafeAreaView>
    );
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