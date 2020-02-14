import React from 'react';

import LocationCard from './location-card.js';
import withUndoCard from './with-undo-card';


export default function TRRCard(props) {
  return <LocationCard { ...props } dateKey='trrDate' focusable={ true } />;
}

export const TRRCardWithUndo = withUndoCard(
  TRRCard,
  () => 'TRR removed.',
  'removeItemInPinboardPage',
  {
    isRequestDelay: false,
    completeActionName: 'completeRemoveItemInPinboardPage',
    revertActionName: 'addItemInPinboardPage',
  },
);
