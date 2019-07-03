import React, { Component } from 'react';

import LocationCard from './location-card.js';
import withUndoCard from './with-undo-card';


export default class TRRCard extends Component {
  render() {
    return (
      <LocationCard { ...this.props } dateKey='trrDate' focusable={ true } />
    );
  }
}

export const TRRCardWithUndo = withUndoCard(
  TRRCard,
  () => 'TRR removed.',
  'removeItemInPinboardPage'
);
