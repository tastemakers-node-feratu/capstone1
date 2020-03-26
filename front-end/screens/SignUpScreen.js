/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView
} from 'react-native';

import {MonoText} from '../components/StyledText';
import SignUpForm from '../components/SignUpForm';

class SignUpScreen extends React.Component {

  render() {
    const {navigate} = this.props.navigation;
    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        keyboardVerticalOffset={64}
        behavior="padding"
        enabled
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.inner}>
            <Text style={styles.brandName}>Taste Makers</Text>
            {/* <Image source={../logo} style={styles.welcomeImage} /> */}
            <Text style={styles.title}>What are you loving this week? </Text>
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
    backgroundColor: '#74b9ff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inner: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  brandName: {
    fontSize: 50,
    color: '#FFFFFF',
    textAlign: 'center'
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
    paddingHorizontal: 10
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
  logo: {
    width: 100,
    height: 100
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
