import React, { Component } from 'react';

import LocationCard from './location-card.js';
import withUndoCard from './with-undo-card';


export default class CRCard extends Component {
  render() {
    return (
      <LocationCard { ...this.props } dateKey='incidentDate' focusable={ true }/>
    );
  }
}


export const CRCardWithUndo = withUndoCard(
  CRCard,
  () => 'CR removed.',
  'removeItemInPinboardPage',
  {
    isRequestDelay: false,
    completeActionName: 'completeRemoveItemInPinboardPage',
    revertActionName: 'addItemInPinboardPage',
  },
);
