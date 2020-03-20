import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput } from 'react-native'
import * as WebBrowser from 'expo-web-browser';

import { MonoText } from '../components/StyledText';

export default function SignUpScreen() {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <TextInput
                placeholder="email"
                placeholderTextColor='rgba(255,255,255,0.7)'
                returnKeyType="next"
                onSubmitEditing={() => this.passwordInput.focus()}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input} />

            <TextInput
                placeholder="password"
                placeholderTextColor='rgba(255,255,255,0.7)'
                secureTextEntry
                returnKeyType="go"
                style={styles.input}
                ref={(input) => this.passwordInput = input} />

            <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>

        </View>
    );
}

SignUpScreen.navigationOptions = {
    header: null,
};

function DevelopmentModeNotice() {
    if (__DEV__) {
        const learnMoreButton = (
            <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
                Learn more
            </Text>
        );

        return (
            <Text style={styles.developmentModeText}>
                Development mode is enabled: your app will be slower but you can use
          useful development tools. {learnMoreButton}
            </Text>
        );
    } else {
        return (
            <Text style={styles.developmentModeText}>
                You are not in development mode: your app will run at full speed.
            </Text>
        );
    }
}

function handleHelpPress() {
    WebBrowser.openBrowserAsync(
        'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change' //to be changed
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#74b9ff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    helpLink: {
        paddingBottom: 10
    },
    helpLinkText: {
        fontSize: 14,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    container: {
        padding: 20
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 20,
        color: '#FFF',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: "#2980b9",
        paddingVertical: 15
    },
    buttonText: {
        textAlign: "center",
        color: '#FFFFFF',
        fontWeight: '700'
    }
});
