import React, { Component, PropTypes } from 'react';

import { storiesPageStyle } from './stories-page.style';
import FeaturedStoriesContainer from 'containers/stories-page/featured-stories-container';
import NonFeaturedStoriesContainer from 'containers/stories-page/non-featured-stories-container';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import Footer from 'components/footer';


export default class StoriesPage extends Component {
  render() {
    return (
      <div style={ storiesPageStyle }>
        <ResponsiveFixedWidthComponent>
          <FeaturedStoriesContainer store={ this.props.store }/>
          <NonFeaturedStoriesContainer store={ this.props.store }/>
        </ResponsiveFixedWidthComponent>
        <Footer/>
      </div>
    );
  }
}

StoriesPage.propTypes = {
  store: PropTypes.object
};
