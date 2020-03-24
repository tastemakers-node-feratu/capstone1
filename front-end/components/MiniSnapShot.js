import React from 'react';
import { Text, View, StyleSheet, Image, Button, SafeAreaView } from 'react-native'

export default function Snapshots(props) {
    const { snapshot } = props
    const places = snapshot.places;
    return places.length === 1 ? (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.name}>{snapshot.username}</Text>
                <Image source={{ uri: places[0].snapshot.photos }}
                    style={{ width: 300, height: 250, }} />
                <Text style={styles.title}>{places[0].name} </Text>
                <Text style={styles.content}>{places[0].snapshot.description}</Text>
            </View>
        </SafeAreaView>
    ) : places.map(place => (
        <SafeAreaView key={snapshot.id}>
            <View style={styles.container}>
                <Text style={styles.name}>{snapshot.username}</Text>
                {/* <Image source={snapshot.photos}
                    style={{ width: 300, height: 250, }} /> */}
                <Text style={styles.title}>{place.name} </Text>
                <Text style={styles.content}>{place.snapshot.description}</Text>
            </View>
        </SafeAreaView>
    ))
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