/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { View, StyleSheet } from 'react-native'

import OneSnapFullView from './OneSnapFullView'

export default function Snapshots(props) {
  const { snapshot, navigate } = props;
  const { places } = snapshot;
  return places.map(place => (
    <OneSnapFullView key={place.id} user={snapshot} place={place} navigate={navigate} />
  ))
}

