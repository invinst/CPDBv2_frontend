import React from 'react';
import { StyleRoot } from 'radium';

import LandingPage from 'components/landing-page';
import Header from 'components/header';
import Footer from 'components/footer';


export default class RootComponent extends React.Component {
  render() {
    return (
      <StyleRoot>
        <Header/>
        <LandingPage/>
        <Footer/>
      </StyleRoot>
    );
  }
}
