import React from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';

export default class LoginScreen extends React.Component {

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
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate('SignUp')} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Create New User</Text>
            </TouchableOpacity>


            {/* <View style={{ flex: 1 }} /> */}
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#74b9ff'
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
  welcomeImage: {
    width: 200,
    height: 200,
    marginTop: 3,
  },
  error: {
    color: `#eb4034`,
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


