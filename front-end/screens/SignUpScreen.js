/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView
} from 'react-native';

import { MonoText } from '../components/StyledText';
import SignUpForm from '../components/SignUpForm';
import GoogleOAuth from '../components/GoogleOAuth';

class SignUpScreen extends React.Component {

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
            <SignUpForm navigate={navigate} />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inner: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100
  },
  brandName: {
    fontSize: 40,
    color: '#f7786b',
    textAlign: 'center'
  },
  title: {
    color: '#FFF',
    marginTop: 10,
    width: 160,
    textAlign: 'center',
    opacity: 0.9
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  buttonContainer: {
    backgroundColor: '#2980b9',
    width: 200,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 10
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  }
});

export default SignUpScreen;
