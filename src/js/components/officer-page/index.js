import React, { Component, PropTypes } from 'react';

import Header from './header';
import { pageWrapperStyle } from './officer-page.style';


export default class OfficerPage extends Component {
  render() {
    const { location, officerName, children } = this.props;
    const { pathname } = location;

    return (
      <div>
        <Header officerName={ officerName } pathname={ pathname }/>
        <div style={ pageWrapperStyle }>
          { children }
        </div>
      </div>
    );
  }
}

OfficerPage.propTypes = {
  location: PropTypes.object,
  officerName: PropTypes.string,
  children: PropTypes.node,
  officerId: PropTypes.number
};

OfficerPage.defaultProps = {
  location: { pathname: '/' }
};
