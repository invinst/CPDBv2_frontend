import React, { Component, PropTypes } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import { assign } from 'lodash';

import BottomSheetHeader from './bottom-sheet-header';
import StoryFull from 'components/landing-page/stories/story-full';
import FAQFull from 'components/landing-page/faq/faq-full';
import { overlayStyle, sheetStyle, contentStyle, bodyStyle, scrollStyle } from './bottom-sheet.style';
import { STORY_TYPE, FAQ_TYPE } from 'actions/landing-page/bottom-sheet';
import { defaultConfig } from 'utils/spring-presets';


export default class BottomSheet extends Component {
  constructor(props) {
    super(props);
    this.contentMap = {
      [STORY_TYPE]: StoryFull,
      [FAQ_TYPE]: FAQFull
    };
  }

  componentWillReceiveProps(nextProps) {
    this.prevContent = this.props.content;
  }

  getContent() {
    if (this.props.content === null) {
      return this.prevContent;
    }
    return this.props.content;
  }

  renderOverlay(style={}) {
    return (
      <div className='bottom-sheet__overlay' onClick={ this.props.onClose } style={ assign({}, overlayStyle, style) }/>
    );
  }

  renderOverlayAnimation() {
    const { open } = this.props;

    return (
      <TransitionMotion
        willLeave={ () => ({ opacity: spring(0, defaultConfig()) }) }
        willEnter={ () => ({ opacity: 0 }) }
        styles={ open ?
          [{ key: '1', style: { opacity: spring(.8, defaultConfig()) } }]
          : [] }>
        { (interpolatedStyles) => {
          let config = interpolatedStyles[0];

          if (config) {
            return this.renderOverlay(config.style);
          }
          return null;
        } }
      </TransitionMotion>
    );
  }

  renderContent() {
    const content = this.getContent();

    if (content) {
      const contentClass = this.contentMap[content.type];
      if (contentClass) {
        return React.createElement(contentClass, assign({}, content.props, { closeBottomSheet: this.props.onClose }));
      }
    }
    return null;
  }

  renderBottomSheet(style={}) {
    return (
      <div style={ assign({}, sheetStyle, style) }>
        <div style={ bodyStyle }>
          <BottomSheetHeader onDismissClick={ this.props.onClose } />
        </div>
        <div style={ scrollStyle }>
          <div style={ contentStyle }>
            { this.renderContent() }
          </div>
        </div>
      </div>
    );
  }

  renderBottomSheetAnimation() {
    const { open } = this.props;

    return (
      <TransitionMotion
        willLeave={ () => ({ bottom: spring(-588, defaultConfig()) }) }
        willEnter={ () => ({ bottom: -588 }) }
        styles={ open ?
          [{ key: '1', style: { bottom: spring(0, defaultConfig()) } }]
          : [] }>
        { (interpolatedStyles) => {
          let config = interpolatedStyles[0];

          if (config) {
            return this.renderBottomSheet({ bottom: `${config.style.bottom}px` });
          }
          return null;
        } }
      </TransitionMotion>
    );
  }

  render() {
    return (
      <div>
        { this.renderOverlayAnimation() }
        { this.renderBottomSheetAnimation() }
      </div>
    );
  }
}

BottomSheet.propTypes = {
  open: PropTypes.bool,
  content: PropTypes.shape({
    type: PropTypes.string,
    props: PropTypes.object
  }),
  onClose: PropTypes.func
};
