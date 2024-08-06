import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { noop } from 'lodash';

import HeaderLinks from './header-links';
import LogoContainer from 'containers/headers/slim-header/logo-container';
import LogOutButtonContainer from 'containers/log-out-container';
import SearchBox from 'components/headers/slim-header/slim-header-content/search-box';
import { scrollToTop } from 'utils/dom';
import styles from './slim-header-content.sass';
import DemoVideoContainer from 'containers/headers/slim-header/demo-video-container';



function SlimHeaderContent(props) {
  const { pathname, editModeOn, position } = props;

  return (
    <div
      className={ styles.slimHeader }
      onClick={ position === 'bottom' ? scrollToTop : noop }
    >
      <div className='placeholder'/>
      <div className={ cx('header-content', position) }>
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
              <HeaderLinks position={ position } />
            </div>
            <SearchBox position={ position }/>
          </div>
        </div>
      </div>
    </div>
  );
}

SlimHeaderContent.propTypes = {
  position: PropTypes.string,
  pathname: PropTypes.string,
  editModeOn: PropTypes.bool,
};

SlimHeaderContent.defaultProps = {
  position: 'top',
  pathname: '/',
};

export default SlimHeaderContent;
