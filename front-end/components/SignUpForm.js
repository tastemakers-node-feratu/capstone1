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
  const {navigate} = props;

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
  }
  const submitHandler = () => {
    validateInput();
    const signUpData = {
      username,
      email,
      password
    };
    props.signUp(signUpData);
    clearTextInput();
    navigate('AllSnapShots');
  };

  let passwordInput;
  let emailInput;

  return (
    <View>
      <TextInput
        placeholder="username"
        placeholderTextColor="rgba(255,255,255,0.7)"
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
        placeholderTextColor="rgba(255,255,255,0.7)"
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
        placeholderTextColor="rgba(255,255,255,0.7)"
        secureTextEntry
        returnKeyType="go"
        value={password}
        onChangeText={value => setPassword(value)}
        style={styles.input}
        ref={input => {
          passwordInput = input;
        }}
        clearButtonMode="always"
      />

      <TouchableOpacity style={styles.buttonContainer} onPress={submitHandler}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  buttonContainer: {
    alignSelf: 'center',
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

const mapState = state => ({
  user: state.user
});

const mapDispatch = dispatch => ({
  signUp: data => dispatch(signUp(data))
});

export default connect(mapState, mapDispatch)(SignUpForm);
