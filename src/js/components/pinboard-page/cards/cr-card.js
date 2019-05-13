import React, { Component } from 'react';

import LocationCard from './location-card.js';


export default class CRCard extends Component {
  render() {
    return (
      <LocationCard { ...this.props } dateKey='incidentDate'/>
    );
  }
}
