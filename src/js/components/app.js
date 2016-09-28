import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { StyleRoot } from 'radium';

import { getMockAdapter } from 'mock-data';
import configureStore from 'store';
import EditModeContainer from 'containers/inline-editable/edit-mode-container';
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
          <EditModeContainer>
            <Header pathname={ pathname }/>
            <RouteTransition pathname={ pathname }>
              { this.props.children }
            </RouteTransition>
            <BottomSheetContainer/>
          </EditModeContainer>
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
