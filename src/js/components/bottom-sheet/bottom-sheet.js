import React, { Component, PropTypes } from 'react';
import { TransitionMotion, spring } from 'react-motion';
import { assign } from 'lodash';

import BottomSheetHeader from './bottom-sheet-header';
import StoryFull from 'components/stories/story-full';
import { overlayStyle, sheetStyle, contentStyle, bodyStyle } from './bottom-sheet.style';
import { defaultConfig } from 'utils/spring-presets';


export default class BottomSheet extends Component {
  renderOverlay(style={}) {
    return (
      <div onClick={ this.props.onClose } style={ assign({}, overlayStyle, style) }/>
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

  renderBottomSheet(style={}) {
    return (
      <div style={ assign({}, sheetStyle, style) }>
        <div style={ bodyStyle }>
          <BottomSheetHeader onDismissClick={ this.props.onClose } />
          <div style={ contentStyle }>
            <StoryFull />
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
  onClose: PropTypes.func
};
