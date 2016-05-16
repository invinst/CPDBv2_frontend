import React from 'react';

import Stories from 'components/stories/stories';
import Header from 'components/header';


export default class LandingPage extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Stories/>
      </div>
    );
  }
}
