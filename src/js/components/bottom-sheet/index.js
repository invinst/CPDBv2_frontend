import React, { Component, PropTypes } from 'react';
import { Motion, spring } from 'react-motion';
import { assign } from 'lodash';

import BottomSheetTransition from 'components/animation/bottom-sheet-transition';
import ReportContainer from 'containers/bottom-sheet/report';
import FAQContainer from 'containers/bottom-sheet/faq';
import OfficerContainer from 'containers/officer-page';
import CRContainer from 'containers/cr-page';
import { overlayStyle, sheetStyle, sheetWrapperStyle, closeBottomSheetTriggerStyle } from './bottom-sheet.style';
import { BottomSheetContentType } from 'utils/constants';
import { defaultConfig } from 'utils/spring-presets';
import { recalculateStickyness } from 'components/common/sticky-header';


export default class BottomSheet extends Component {
  constructor(props) {
    super(props);
    this.contentMap = {
      [BottomSheetContentType.REPORT]: ReportContainer,
      [BottomSheetContentType.FAQ]: FAQContainer,
      [BottomSheetContentType.OFFICER]: OfficerContainer,
      [BottomSheetContentType.CR]: CRContainer
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
      <div
        className='bottom-sheet__overlay'
        style={ assign({}, overlayStyle, style) }/>
    );
  }

  renderOverlayAnimation() {
    const { open } = this.props;
    const defaultStyle = { opacity: open ? .8 : 0 };
    const motionStyle = {
      opacity: spring( open ? .8 : 0, defaultConfig())
    };

    if (global.disableAnimation) {
      return open ? this.renderOverlay({ opacity: .8 }) : null;
    }

    return (
      <Motion
        defaultStyle={ defaultStyle }
        style={ motionStyle }>
        { ({ opacity }) => {
          if (opacity === 0 && !open) {
            return null;
          }
          return this.renderOverlay({ opacity });
        } }
      </Motion>
    );
  }

  renderContent() {
    const content = this.getContent();
    const { location } = this.props;

    if (content) {
      const contentClass = this.contentMap[content.type];
      if (contentClass) {
        return React.createElement(
          contentClass,
          {
            turnOffSectionEditMode: this.props.onClose,
            sectionEditModeOn: this.context.editModeOn,
            ...content.props,
            location
          }
        );
      }
    }
    return null;
  }

  contentKey() {
    const content = this.getContent();
    if (!content) return null;
    return `${content.type}.${content.id}`;
  }

  renderBottomSheet(style={}) {
    const { open } = this.props;

    if (!open) return null;

    return (
      <div key={ this.contentKey() }
        className='test--bottom-sheet-wrapper' style={ assign({}, sheetWrapperStyle, style) }
        onScroll={ recalculateStickyness }>
        <div className='test--close-bottom-sheet'
          style={ closeBottomSheetTriggerStyle } onClick={ () => this.props.onClose() } />
        <div style={ sheetStyle }>
          { this.renderContent() }
        </div>
      </div>
    );
  }

  renderBottomSheetAnimation() {
    return (
      <BottomSheetTransition>
        { this.renderBottomSheet() }
      </BottomSheetTransition>
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
    type: PropTypes.object,
    props: PropTypes.object
  }),
  location: PropTypes.object,
  onClose: PropTypes.func
};

BottomSheet.defaultProps = {
  location: { pathname: '' }
};

BottomSheet.contextTypes = {
  editModeOn: PropTypes.bool
};
