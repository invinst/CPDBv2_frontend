import React, { Component, PropTypes } from 'react';

import { storiesPageStyle } from './stories-page.style';
import StoriesPageContainer from 'containers/stories-page/stories-page-container';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';


export default class StoriesPage extends Component {
  render() {
    return (
      <div style={ storiesPageStyle }>
        <ResponsiveFixedWidthComponent>
          <div className='pure-g'>
            <StoriesPageContainer store={ this.props.store }/>
          </div>
        </ResponsiveFixedWidthComponent>
      </div>
    );
  }
}

StoriesPage.propTypes = {
  store: PropTypes.object
};
