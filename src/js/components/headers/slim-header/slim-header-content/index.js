import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import { noop } from 'lodash';

import RightLinks from './right-links';
import LogoContainer from 'containers/headers/slim-header/logo-container';
import LogOutButtonContainer from 'containers/log-out-container';
import SearchBox from 'components/headers/slim-header/slim-header-content/search-box';
import { scrollToTop } from 'utils/dom';
import styles from './slim-header-content.sass';
import DemoVideoContainer from 'containers/headers/slim-header/demo-video-container';


class SlimHeaderContent extends Component {
  getPosition() {
    const { position, disableTop } = this.props;
    return (position === 'top' && disableTop) ? 'middle' : position;
  }

  render() {
    const { pathname, editModeOn, style, className, onSearchBoxClick } = this.props;
    const position = this.getPosition();

    return (
      <div
        className={ className }
        onClick={ position === 'bottom' ? scrollToTop : noop }
        style={ style }
      >
        <div className={ cx(styles.slimHeader, position) }>
          <div className='top-bar-wrapper'>
            <div className='top-bar'>
              <div className='logo'>
                <LogoContainer position={ position } editModeOn={ editModeOn }/>
              </div>
              <DemoVideoContainer
                position={ position }
                editModeOn={ editModeOn }
              />
            </div>
          </div>
          <div className='navbar-wrapper'>
            <div className='navbar'>
              <div className='vertically-aligned-header-item'>
                <LogOutButtonContainer pathname={ pathname } />
              </div>
              <div className='vertically-aligned-header-item'>
                <RightLinks position={ position } />
              </div>
              <SearchBox position={ position } onClick={ onSearchBoxClick }/>
            </div>
          </div>
        </div>
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
};

SlimHeaderContent.defaultProps = {
  style: {},
  disableTop: false,
  position: 'top',
  pathname: '/',
};

export default SlimHeaderContent;
