import React, { Component, PropTypes } from 'react';

import { storiesPageStyle } from './stories-page.style';
import FeaturedStoriesContainer from 'containers/stories-page/featured-stories-container';
import NonFeaturedStoriesContainer from 'containers/stories-page/non-featured-stories-container';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';


export default class StoriesPage extends Component {
  render() {
    return (
      <div style={ storiesPageStyle }>
        <ResponsiveFixedWidthComponent>
          <FeaturedStoriesContainer store={ this.props.store }/>
          <NonFeaturedStoriesContainer store={ this.props.store }/>
        </ResponsiveFixedWidthComponent>
      </div>
    );
  }
}

StoriesPage.propTypes = {
  store: PropTypes.object
};
