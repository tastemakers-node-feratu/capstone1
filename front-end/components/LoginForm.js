/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  View
} from 'react-native';
import {getUserThunk} from '../store/user';

const LoginForm = props => {
  const [authName, setAuthName] = useState('');
  const [password, setPassword] = useState('');
  const {navigate} = props;

  const handleSubmit = () => {
    if (authName === '') alert('Please enter an email address');
    else if (password === '') alert('Please enter a password');
    const authData = {authName, password};
    props.getUserThunk(authData);
    clearTextInput();
    // if (props.user) {
      // navigate('AllSnapShots');
    // } else {
    //   alert('try again');
    // }
  };

  const clearTextInput = () => {
    setAuthName();
    setPassword();
  };

  let passwordInput;

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="username or email"
        placeholderTextColor="rgba(255,255,255,0.7)"
        returnKeyType="next"
        onSubmitEditing={() => {
          passwordInput.focus();
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        onChangeText={value => setAuthName(value)}
        clearButtonMode="always"
        value={authName}
      />
      <TextInput
        placeholder="password"
        placeholderTextColor="rgba(255,255,255,0.7)"
        secureTextEntry
        returnKeyType="go"
        style={styles.input}
        clearButtonMode="always"
        value={password}
        name="passwordInput"
        ref={input => {
          passwordInput = input;
        }}
        onChangeText={value => setPassword(value)}
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#74b9ff'
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

const mapState = state => ({
  user: state.user
});

const mapDispatch = dispatch => ({
  getUserThunk: data => dispatch(getUserThunk(data))
});

export default connect(mapState, mapDispatch)(LoginForm);
