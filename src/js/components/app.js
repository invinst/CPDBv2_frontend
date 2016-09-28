import React, { PropTypes } from 'react';
import { StyleRoot } from 'radium';
import { Provider } from 'react-redux';

import { getMockAdapter } from 'mock-data';
import configureStore from 'store';
import BottomSheetContainer from 'containers/bottom-sheet-container';
import Header from 'components/header';
import RouteTransition from 'components/animation/route-transition';


const store = configureStore();

export default class App extends React.Component {
  getChildContext() {
    return { adapter: getMockAdapter() };
  }

  render() {
    const { pathname } = this.props.location;

    return (
      <Provider store={ store }>
        <StyleRoot>
          <Header pathname={ pathname }/>
          <RouteTransition pathname={ pathname }>
            { this.props.children }
          </RouteTransition>
          <BottomSheetContainer/>
        </StyleRoot>
      </Provider>
    );
  }
}

App.childContextTypes = {
  adapter: PropTypes.func
};

App.propTypes = {
  children: PropTypes.node,
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
};
