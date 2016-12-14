import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';

import configureStore from 'store';
import AutocompleteContainer from 'containers/landing-page/autocomplete-container';


const store = configureStore();


export default class AutocompletePage extends Component {
  render() {
    return (
      <Provider store={ store }>
        <AutocompleteContainer location={ this.props.location }/>
      </Provider>
    );
  }
}

AutocompletePage.propTypes = {
  location: PropTypes.object
};
