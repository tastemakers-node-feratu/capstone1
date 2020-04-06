/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  SafeAreaView
} from 'react-native';
import { getUserThunk } from '../store/user';

const LoginForm = props => {
  const [authName, setAuthName] = useState('');
  const [password, setPassword] = useState('');
  const { navigate, getUserThunk, user } = props;

  const handleSubmit = async () => {
    if (authName === '') alert('Please enter an email address');
    else if (password === '') alert('Please enter a password');
    const authData = { authName, password };
    await getUserThunk(authData);
    clearTextInput();
  };

  const clearTextInput = () => {
    setAuthName();
    setPassword();
  };

  let passwordInput;

  return user.id ? (
    <View>{navigate('Home')}</View>
  ) : (
        <SafeAreaView style={styles.container}>
          <TextInput
            placeholder="username or email"
            placeholderTextColor="rgba(0, 0, 0, 0.7)"
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
            placeholderTextColor="rgba(0, 0, 0, 0.7)"
            secureTextEntry
            returnKeyType="done"
            style={styles.input}
            clearButtonMode="always"
            value={password}
            name="passwordInput"
            ref={input => {
              passwordInput = input;
            }}
            onChangeText={value => setPassword(value)}
          />
          <View styles={styles.container}>
          <TouchableOpacity onPress={handleSubmit} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
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
  getUserThunk: data => dispatch(getUserThunk(data))
});

export default connect(mapState, mapDispatch)(LoginForm);
