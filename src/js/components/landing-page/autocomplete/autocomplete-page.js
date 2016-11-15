import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from 'store';
import AutocompleteContainer from 'containers/landing-page/autocomplete-container';


const store = configureStore();


export default class AutocompletePage extends Component {
  render() {
    return (
      <Provider store={ store }>
        <AutocompleteContainer/>
      </Provider>
    );
  }
}
