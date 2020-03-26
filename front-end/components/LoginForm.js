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
  console.log('this is props, where is nav', props);
  const {navigate} = props;

  const handleSubmit = event => {
    // event.preventDefault();
    const authData = {authName, password};
    props.getUserThunk(authData);
    setAuthName('');
    setPassword('');
    // navigate should take us to all snapshots if login was successful
    navigate('AllSnapShots');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="username or email"
        placeholderTextColor="rgba(255,255,255,0.7)"
        returnKeyType="next"
        // onSubmitEditing={() => props.passwordInput.focus()}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        onChangeText={value => setAuthName(value)}
      />
      <TextInput
        placeholder="password"
        placeholderTextColor="rgba(255,255,255,0.7)"
        secureTextEntry
        returnKeyType="go"
        style={styles.input}
        // ref={input => (props.passwordInput = input)}
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

const mapDispatch = dispatch => ({
  getUserThunk: data => dispatch(getUserThunk(data))
});

export default connect(null, mapDispatch)(LoginForm);
