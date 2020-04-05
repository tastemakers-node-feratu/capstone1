import * as React from 'react';
import { Text } from 'react-native';

export function MonoText(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}

// export function ComicText(props) {
//   return <Text {...props} style={[props.style, { fontFamily: 'comic-neue' }]} />;
// }

export function ComicLightText(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'comic-neue-light' }]} />;
}

export function AmaticText(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'amatic-sc' }]} />;
}

export function HandleeText(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'handl-ee' }]} />;
}
