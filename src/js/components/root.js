import React, { PropTypes } from 'react';
import { StyleRoot } from 'radium';

import LandingPage from 'components/landing-page';
import BottomSheetContainer from 'containers/bottom-sheet-container';
import Header from 'components/header';
import Footer from 'components/footer';


export default class RootComponent extends React.Component {
  getChildContext() {
    const { adapter } = this.props;
    return { adapter };
  }

  render() {
    return (
      <StyleRoot>
        <Header/>
        <LandingPage/>
        <Footer/>
        <BottomSheetContainer/>
      </StyleRoot>
    );
  }
}

RootComponent.childContextTypes = {
  adapter: PropTypes.func
};

RootComponent.propTypes = {
  adapter: PropTypes.func
};
