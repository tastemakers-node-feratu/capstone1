/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Svg, {Image, Circle, ClipPath} from 'react-native-svg';
import Animated, {Easing} from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import {PlayText} from '../components/StyledText';
import LoginScreen from './LoginScreen';

const {width, height} = Dimensions.get('window');
const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat,
  debug
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position
  ]);
}

class PreLogin extends Component {
  constructor() {
    super();
    this.buttonOpacity = new Value(1);
    this.onStateChange = event([
      {
        nativeEvent: ({state}) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0))
            )
          ])
      }
    ]);

    this.onCloseState = event([
      {
        nativeEvent: ({state}) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1))
            )
          ])
      }
    ]);
    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 1.25 - 50, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.logInZIndex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP
    });

    this.logInOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP
    });

    this.logInY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP
    });

    this.rotateX = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [180, 360],
      extrapolate: Extrapolate.CLAMP
    });

    this.xButtonOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'flex-end'
          }}
        >
          <Animated.View
            style={{
              ...StyleSheet.absoluteFill,
              transform: [{translateY: this.bgY}]
            }}
          >
            <Svg height={height + 50} width={width}>
              <ClipPath id="clip">
                <Circle r={height + 50} cx={width / 2} />
              </ClipPath>
              <Image
                href={require('../assets/images/14.png')}
                width={width}
                height={height + 50}
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#clip)"
              />
            </Svg>
          </Animated.View>
          <TapGestureHandler onHandlerStateChange={this.onCloseState}>
            <Animated.View
              style={{
                ...styles.xButton,
                opacity: this.xButtonOpacity,
                transform: [{rotate: concat(this.rotateX, 'deg')}]
              }}
            >
              <Animated.Text styles={styles.xButtonText}>X</Animated.Text>
            </Animated.View>
          </TapGestureHandler>
          <View style={styles.brandContainer}>
            <Text style={styles.brand}>TasteMakers</Text>
          </View>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.button,
                opacity: this.buttonOpacity,
                transform: [{translateY: this.buttonY}]
              }}
            >
              <Text style={styles.buttonText}>Log In</Text>
            </Animated.View>
          </TapGestureHandler>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.button,
                opacity: this.buttonOpacity,
                transform: [{translateY: this.buttonY}]
              }}
            >
              <Text style={styles.buttonText}>Sign In With Google</Text>
            </Animated.View>
          </TapGestureHandler>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.button,
                opacity: this.buttonOpacity,
                transform: [{translateY: this.buttonY}],
                marginBottom: 70
              }}
            >
              <Text style={styles.buttonText}>New Account</Text>
            </Animated.View>
          </TapGestureHandler>
          <Animated.View
            style={{
              height: height / 1.55,
              ...StyleSheet.absoluteFill,
              top: null,
              justifyContent: 'center',
              zIndex: this.logInZIndex,
              opacity: this.logInOpacity,
              transform: [{translateY: this.logInY}]
            }}
          >
            <LoginScreen navigation={this.props.navigation} />
          </Animated.View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  brandContainer: {
    padding: 10,
    transform: [{translateY: -280}],
    // marginHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    // borderWidth: 1,
    // borderRadius: 20,
    justifyContent: 'center',
    // alignItems: 'center'
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
  button: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    height: 70,
    marginHorizontal: 50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    // borderWidth: 1,
    // borderColor: '#000'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'playfair-display'
  },
  xButton: {
    height: 40,
    width: 40,
    alignItems: 'center',
    position: 'absolute',
    top: 158,
    left: width / 2 - 20,
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: '#FFF',
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000',
    shadowOpacity: 0.3
  },
  xButtonText: {
    fontSize: 15,
    color: '#000'
  }
});

export default PreLogin;
