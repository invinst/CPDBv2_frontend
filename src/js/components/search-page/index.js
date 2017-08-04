import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';

import configureStore from 'store';
import SearchPageContainer from 'containers/search-page-container';


const store = configureStore();

export default class SearchPage extends Component {
  render() {
    return (
      <Provider store={ store }>
        <SearchPageContainer location={ this.props.location }/>
      </Provider>
    );
  }
}

SearchPage.propTypes = {
  location: PropTypes.object
};

SearchPage.defaultProps = {
  location: { pathname: '' }
};
