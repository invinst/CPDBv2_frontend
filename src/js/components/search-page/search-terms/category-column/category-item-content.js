import React, { PropTypes, Component } from 'react';

import { wrapperStyle, descriptionStyle, paddingStyle } from './category-item-content.style';
import CallToAction from './call-to-action';


export default class CategoryItemContent extends Component {
  render() {
    const { item, style } = this.props;

    return (
      <div style={ { ...wrapperStyle, ...style } }>
        <div style={ descriptionStyle }>{ item.description }</div>
        <CallToAction item={ item }/>
        <div style={ paddingStyle }/>
      </div>
    );
  }
}

CategoryItemContent.propTypes = {
  item: PropTypes.object,
  style: PropTypes.object
};

CategoryItemContent.defaultProps = {
  item: {}
};
