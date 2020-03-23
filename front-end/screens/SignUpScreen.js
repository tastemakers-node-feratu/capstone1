import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, SafeAreaView } from 'react-native'

import { MonoText } from '../components/StyledText';

export default class SignUpScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

    validatePassword(pw) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/.test(pw)
    }

    submitHandler() {
        const emailIsValid = this.validateEmail(this.state.email)
        const passwordIsValid = this.validatePassword(this.state.password)
        if (this.state.email === '') alert('Please enter an email address')
        else if (!emailIsValid) alert('Please enter a valid email address')
        else if (this.state.password === '') alert('Please enter a password')
        else if (!passwordIsValid) alert('Password must contain at least 1 lowercase character/n'
            + 'at least 1 uppercase alphabetical character/n'
            + 'at least 1 numeric character/n'
            + 'at least 1 special character/n'
            + 'must be six characters or longer')
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                keyboardVerticalOffset={64}
                behavior="padding"
                enabled
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
                            value={this.state.email}
                            onChangeText={email => this.setState({ email: email.toLowerCase() })}
                            autoCorrect={false}
                            style={styles.input} />

                        <TextInput
                            placeholder="password"
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            secureTextEntry
                            returnKeyType="go"
                            value={this.state.password}
                            onChangeText={password => this.setState({ password })}
                            style={styles.input}
                            ref={(input) => this.passwordInput = input} />


                        <TouchableOpacity style={styles.buttonContainer} onPress={this.submitHandler} >
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
    inner: {
        justifyContent: 'center',
        alignItems: 'center',
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
