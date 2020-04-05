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
import {Asset} from 'expo-asset';
import {AppLoading} from 'expo';
import PreLogin from './PreLogin';

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    }
    return Asset.fromModule(image).downloadAsync();
  });
}

class PreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
    this._loadAssetsAsync = this._loadAssetsAsync.bind(this);
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([require('../assets/images/city.jpg')]);
    
    await Promise.all([...imageAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({isReady: true})}
          onError={console.warn}
        />
      );
    }
    return <PreLogin navigation={this.props.navigation.navigate} />;
  }
}

export default PreScreen;
