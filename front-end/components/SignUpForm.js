/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView
} from 'react-native';
import {connect} from 'react-redux';
import {signUp} from '../store/user';

const SignUpForm = props => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {navigate, signUp} = props;

  const validateEmail = inputEmail => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail);
  };

  const validatePassword = inputPassword => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/.test(
      inputPassword
    );
  };

  const validateInput = () => {
    const emailIsValid = validateEmail(email);
    const passwordIsValid = validatePassword(password);
    if (email === '') alert('Please enter an email address');
    else if (!emailIsValid) alert('Please enter a valid email address');
    else if (password === '') alert('Please enter a password');
    else if (!passwordIsValid)
      alert(
        `Password must contain
          at least 1 lowercase character
          at least 1 uppercase alphabetical character
          at least 1 numeric character
          at least 1 special character
          must be six characters or longer`
      );
  };

  const clearTextInput = () => {
    setUsername();
    setEmail();
    setPassword();
  };
  const submitHandler = () => {
    validateInput();
    const signUpData = {
      username,
      email,
      password
    };
    signUp(signUpData);
    clearTextInput();
    navigate('Home');
  };

  let passwordInput;
  let emailInput;

  return (
    <View>
      <View style={styles.brandContainer}>
        <Text style={styles.brand}>TasteMakers</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          placeholder="username"
          placeholderTextColor="rgba(0, 0, 0, 0.7)"
          returnKeyType="next"
          onSubmitEditing={() => emailInput.focus()}
          autoCapitalize="none"
          value={username}
          onChangeText={value => setUsername(value.toLowerCase())}
          autoCorrect={false}
          style={styles.input}
          clearButtonMode="always"
        />
        <TextInput
          placeholder="email"
          placeholderTextColor="rgba(0, 0, 0, 0.7)"
          returnKeyType="next"
          onSubmitEditing={() => passwordInput.focus()}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={value => setEmail(value.toLowerCase())}
          autoCorrect={false}
          style={styles.input}
          ref={input => {
            emailInput = input;
          }}
          clearButtonMode="always"
        />
        <TextInput
          placeholder="password"
          placeholderTextColor="rgba(0, 0, 0, 0.7)"
          secureTextEntry
          returnKeyType="done"
          value={password}
          onChangeText={value => setPassword(value)}
          style={styles.input}
          ref={input => {
            passwordInput = input;
          }}
          clearButtonMode="always"
        />

        <TouchableOpacity
          onPress={submitHandler}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigate('PreScreen')}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>Already Have an Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  backButton: {},
  backButtonText: {
    fontSize: 15,
    fontFamily: 'playfair-display',
  },
  brandContainer: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    justifyContent: 'center',
    marginBottom: 20
  },
  brand: {
    textAlign: 'center',
    fontSize: 40,
    fontFamily: 'playfair-display',
    shadowOffset: {width: 2, height: 2},
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 0.7
  },
  input: {
    width: 300,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0,0.5)',
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.8)',
    marginBottom: 15,
    color: '#000',
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    height: 70,
    marginHorizontal: 20,
    width: 300,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 7,
    borderWidth: 1,
    borderColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000',
    shadowOpacity: 0.3
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'playfair-display'
  }
});

const mapState = state => ({
  user: state.user
});

const mapDispatch = dispatch => ({
  signUp: data => dispatch(signUp(data))
});

export default connect(mapState, mapDispatch)(SignUpForm);
