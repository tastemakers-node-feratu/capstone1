import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, SafeAreaView } from 'react-native'

import { MonoText } from '../components/StyledText';

export default class SignUpScreen extends React.Component {

    render() {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                keyboardVerticalOffset={64}
                behavior="padding"
            >
                <SafeAreaView style={styles.container}>
                    <View style={styles.inner}>
                        <Text style={styles.brandName}>Taste Makers</Text>
                        {/* <Image source={../logo} style={styles.welcomeImage} /> */}
                        <Text style={styles.title}>What are you loving this week? </Text>

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
                </SafeAreaView>
            </KeyboardAvoidingView >
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#74b9ff',
        alignItems: 'center',
        justifyContent: 'center'
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
    brandName: {
        fontSize: 50,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    input: {
        width: 300,
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 15,
        color: '#FFF',
        paddingHorizontal: 10,
    },
    helpLink: {
        paddingBottom: 10
    },
    helpLinkText: {
        fontSize: 14,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    title: {
        color: '#FFF',
        marginTop: 10,
        width: 160,
        textAlign: 'center',
        opacity: 0.9,
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100
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
        width: 200,
        paddingVertical: 10,
        marginBottom: 10,
        borderRadius: 10
    },
    buttonText: {
        textAlign: "center",
        color: '#FFFFFF',
        fontWeight: '700'
    }
});
