/* eslint-disable no-use-before-define */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  View
} from 'react-native';
import {connect} from 'react-redux';
import {MonoText} from '../components/StyledText';
import LoginForm from '../components/LoginForm';
import {getMeThunk} from '../store/user';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
  }
  // async componentDidMount() {
  //   await getMeThunk();
  // }
  render() {
    const {navigate} = this.props.navigation;
    return ( 
      // this.props.user.id ? <View>{navigate('AllSnapShots')}</View>:
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        keyboardVerticalOffset={-150}
        behavior="padding"
      >
        <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
        <SafeAreaView style={styles.container}>
          <View style={styles.inner}>
            <View>
              <Text style={styles.brandName}>Taste Makers</Text>
              {/* <Image source={../logo} style={styles.welcomeImage} /> */}
              <Text style={styles.title}>What are you loving this week? </Text>
            </View>
            <LoginForm style={styles.loginForm} navigate={navigate} />
            <View>
              <TouchableOpacity
                onPress={() => navigate('SignUp')}
                style={styles.buttonContainer}
              >
                <Text style={styles.buttonText}>Create New User</Text>
              </TouchableOpacity>
            </View>
            {/* <View style={{ flex: 1 }} /> */}
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
    backgroundColor: '#74b9ff'
  },
  inner: {},
  brandName: {
    marginTop: 150,
    fontSize: 50,
    color: '#FFFFFF',
    textAlign: 'center'
  },
  // welcomeImage: {
  //   width: 200,
  //   height: 200,
  //   marginTop: 30
  // },
  error: {
    color: `#eb4034`
  },
  title: {
    alignSelf: 'center',
    color: '#FFF',
    // marginTop: 10,
    width: 160,
    textAlign: 'center',
    opacity: 0.9
  },
  logoContainer: {
    alignItems: 'center',
    // flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 100
  },
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: '#2980b9',
    width: 200,
    paddingVertical: 10,

    marginBottom: 250,
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

const mapDispatch = dispatch => ({
  getMeThunk: data => dispatch(getMeThunk(data))
});

export default connect(mapState, mapDispatch)(LoginScreen);
