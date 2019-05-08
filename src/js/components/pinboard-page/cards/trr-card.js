import React, { Component } from 'react';

import LocationCard from './location-card.js';


export default class TRRCard extends Component {
  render() {
    return (
      <LocationCard { ...this.props } dateKey='trrDate'/>
    );
  }
}
