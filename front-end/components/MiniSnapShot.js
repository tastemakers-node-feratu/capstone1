/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';


import OneSnapFullView from './OneSnapFullView'

export default function Snapshots(props) {
  const { snapshot, navigate } = props;
  const { places } = snapshot;
  return places.map(place => (
    <OneSnapFullView key={place.id} user={snapshot} place={place} />
  ));
}
