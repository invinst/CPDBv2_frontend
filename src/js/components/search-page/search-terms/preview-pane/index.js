import React, { Component, PropTypes } from 'react';
import { descriptionStyle, titleStyle, wrapperStyle } from './preview-pane.style.js';
import { isEmpty } from 'lodash';
import SlideMotion from 'components/animation/slide-motion';
import CallToAction from './call-to-action';


export default class PreviewPane extends Component {

  handleEnterButtonClick() {
  }

  render() {
    const { item } = this.props;

    return (
      <SlideMotion show={ !isEmpty(item.name) } offsetX={ 100 }>
        <div style={ wrapperStyle }>
          <div className='test--preview-pane-title' style={ titleStyle }>{ item.name }</div>
          <div className='test--preview-pane-description' style={ descriptionStyle }>{ item.description }</div>
          <CallToAction item={ item }/>
        </div>
      </SlideMotion>
    );

  }
}

PreviewPane.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  actionCall: PropTypes.string,
  item: PropTypes.object,
};

PreviewPane.defaultProps = {
  data: [],
  item: {},
};
