/* eslint-disable no-use-before-define */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { MonoText } from '../components/StyledText';
import LoginForm from '../components/LoginForm';
import { getMeThunk } from '../store/user';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        keyboardVerticalOffset={-100}
        behavior="padding"
        enabled
      >
        <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
        <SafeAreaView style={styles.container}>
          <View style={styles.inner}>
            <Image source={require('../assets/images/camera-logo.png')}
              style={{ flexShrink: 1, width: 200, height: 250, marginTop: 20 }} />
            <Text style={styles.brandName}>Taste Makers</Text>
            <Text style={styles.title}>What are you loving this week? </Text>
            <LoginForm style={styles.loginForm} navigate={navigate} />

            <TouchableOpacity
              onPress={() => navigate('SignUp')}
              style={styles.buttonContainer}
            >
              <Text style={styles.buttonText}>Create New User</Text>
            </TouchableOpacity>

          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  keyboardAvoid: {},
  container: {
    alignItems: 'center',
    backgroundColor: '#034f84'
  },
  inner: {
    textAlign: 'center',
    alignItems: 'center',
  },
  brandName: {
    fontSize: 40,
    color: '#f7786b',

  },
  error: {
    color: `#eb4034`
  },
  title: {
    alignSelf: 'center',
    color: '#FFF',
    width: 160,
    textAlign: 'center',
    opacity: 0.9
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: '#2980b9',
    width: 200,
    paddingVertical: 10,
    marginBottom: 180,
    borderRadius: 10
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  },
  loginForm: {}
});

const mapState = state => ({
  user: state.user
});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(LoginScreen);
