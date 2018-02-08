import React, { Component, PropTypes } from 'react';
import { actionStyle, descriptionStyle, titleStyle, wrapperStyle, actionButtonStyle } from './preview-pane.style.js';
import { isEmpty } from 'lodash';
import SlideMotion from 'components/animation/slide-motion';
import { HoverableButton } from 'components/common/hoverable-button';
import CallToAction from 'components/search-page/search-terms/category-column/call-to-action';


export default class PreviewPane extends Component {

  handleEnterButtonClick() {
  }

  render() {
    const { item } = this.props;

    return (
      <SlideMotion show={ !isEmpty(item) } offsetX={ 100 }>
        <div style={ wrapperStyle }>
          <div className='test--preview-pane-title' style={ titleStyle }>{ item.name }</div>
          <div className='test--preview-pane-description' style={ descriptionStyle }>{ item.description }</div>
          <div className='test--preview-pane-action' style={ actionStyle }>
            <div>
              <CallToAction item={ item }/>
            </div>
            <HoverableButton
              className='test--enter-button'
              style={ actionButtonStyle }
              onClick={ this.handleEnterButtonClick }>
              enter
            </HoverableButton>
          </div>
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
