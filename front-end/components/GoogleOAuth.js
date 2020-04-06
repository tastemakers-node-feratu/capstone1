/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import * as Google from 'expo-google-app-auth';
import {androidClientId, iosClientId} from '../superSecret';
import {googleSignUp} from '../store/user';

class GoogleOAuth extends React.Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
  }

  async signIn() {
    try {
      const {user, accessToken, type} = await Google.logInAsync({
        androidClientId,
        iosClientId,
        scopes: ['profile', 'email']
      });
      if (type === 'success') {
        const signInData = {
          firstName: user.givenName,
          email: user.email,
          googleId: user.id,
          imageURL: user.photoUrl
        };
        await Google.logOutAsync({
          accessToken,
          androidClientId,
          iosClientId
        });
        this.props.googleSignUp(signInData);
      } else {
        console.log('cancelled');
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const {navigate, googleId} = this.props;
    return googleId ? (
      <View>{navigate('Home')}</View>
    ) : (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.signIn} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Sign In With Google</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  buttonContainer: {
    width: 200,
    paddingVertical: 1,
    marginBottom: 15,
    borderRadius: 10
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '400'
  }
});

const mapState = state => ({
  googleId: state.user.googleId
});

const mapDispatch = dispatch => ({
  googleSignUp: data => dispatch(googleSignUp(data))
});

export default connect(mapState, mapDispatch)(GoogleOAuth);
