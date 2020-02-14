import React from 'react';

import LocationCard from './location-card.js';
import withUndoCard from './with-undo-card';


export default function CRCard(props) {
  return <LocationCard { ...props } dateKey='incidentDate' focusable={ true }/>;
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
