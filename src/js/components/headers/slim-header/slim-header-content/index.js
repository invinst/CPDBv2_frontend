import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import { noop } from 'lodash';

import RightLinks from './right-links';
import LogoContainer from 'containers/headers/slim-header/logo-container';
import LogOutButtonContainer from 'containers/log-out-container';
import SearchBox from 'components/headers/slim-header/slim-header-content/search-box';
import { scrollToTop } from 'utils/dom';
import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import styles from './slim-header-content.sass';
import DemoVideo from './demo-video';


class SlimHeaderContent extends Component {
  getPosition() {
    const { position, disableTop } = this.props;
    return (position === 'top' && disableTop) ? 'middle' : position;
  }

  render() {
    const { pathname, editModeOn, style, className, openVideoModal, videoThumbnailUrl } = this.props;
    const position = this.getPosition();

    return (
      <div
        className={ className }
        onClick={ position === 'bottom' ? scrollToTop : noop }
        style={ style }
      >
        <ResponsiveFluidWidthComponent>
          <div className={ cx(styles.slimHeader, position) }>
            <div className='top-bar'>
              <div className='logo'>
                <LogoContainer position={ position } editModeOn={ editModeOn } />
              </div>
              <DemoVideo
                position={ position }
                openVideoModal={ openVideoModal }
                videoThumbnailUrl={ videoThumbnailUrl }
              />
            </div>
            <div className='navbar'>
              <div className='vertically-aligned-header-item'>
                <LogOutButtonContainer pathname={ pathname } />
              </div>
              <div className='vertically-aligned-header-item'>
                <RightLinks position={ position } />
              </div>
              <SearchBox position={ position }/>
            </div>
          </div>
        </ResponsiveFluidWidthComponent>
      </div>
    );
  }
}

SlimHeaderContent.propTypes = {
  position: PropTypes.string,
  pathname: PropTypes.string,
  editModeOn: PropTypes.bool,
  style: PropTypes.object,
  disableTop: PropTypes.bool,
  className: PropTypes.string,
  openVideoModal: PropTypes.func,
  videoThumbnailUrl: PropTypes.string,
};

SlimHeaderContent.defaultProps = {
  style: {},
  disableTop: false,
  position: 'top',
  pathname: '/'
};

export default SlimHeaderContent;
