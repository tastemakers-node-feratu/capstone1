/* eslint-disable no-use-before-define */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { MonoText } from '../components/StyledText';
import LoginForm from '../components/LoginForm';
import GoogleOAuth from '../components/GoogleOAuth';
// import { getMeThunk } from '../store/user';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const navigate = this.props.navigation;
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={64}
        behavior="padding"
      >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer} >
          <View style={styles.inner}>
            {/* <Image source={require('../assets/images/camera-logo.png')}
              style={{ flexShrink: 1, width: 200, height: 250, marginTop: 20 }} /> */}
            {/* <Text style={styles.brandName}>Taste Makers</Text>
            <Text style={styles.title}>What are you loving this week? </Text> */}
            <LoginForm navigate={navigate} />
            <GoogleOAuth navigate={navigate} />
            <TouchableOpacity
              onPress={() => navigate('SignUp')}
              style={styles.buttonContainer}
            >
              <Text style={styles.buttonText}>Create New User</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  keyboardAvoid: {},
  container: {
    flex: 1,
    alignItems: 'center'
  },
  inner: {
    textAlign: 'center',
    alignItems: 'center'
  },
  error: {
    color: `#eb4034`
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    alignSelf: 'center',
    width: 200,
    paddingVertical: 0
  },
  buttonText: {
    textAlign: 'center',
    color: '#000',
    fontWeight: '400'
  },
  contentContainer: {
    paddingTop: 15,
    paddingBottom: 15
  }
});

const mapState = state => ({
  user: state.user
});

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(LoginScreen);
