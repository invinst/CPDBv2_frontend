import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import { noop } from 'lodash';

import RightLinks from './right-links';
import LogoContainer from 'containers/headers/slim-header/logo-container';
import LogOutButtonContainer from 'containers/log-out-container';
import SearchBox from 'components/headers/slim-header/search-box';
import { scrollToTop } from 'utils/dom';
import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import styles from './slim-header-content.sass';


class SlimHeaderContent extends Component {
  getPosition() {
    const { position, disableTop } = this.props;
    return (position === 'top' && disableTop) ? 'middle' : position;
  }

  render() {
    const { pathname, editModeOn, style, className } = this.props;
    const position = this.getPosition();

    return (
      <div
        className={ cx(className, styles.slimHeaderContent, position) }
        onClick={ position === 'bottom' ? scrollToTop : noop }
        style={ style }
      >
        <ResponsiveFluidWidthComponent>
          <div className={ cx('slim-header', position) } >
            <div className={ cx('top-bar', position) }>
              <div className='logo'>
                <LogoContainer position={ position } editModeOn={ editModeOn } />
              </div>
              <div className='watch-video'>
                <div className='watch-video-text'>
                  <span className={ cx('watch-video-text-upper', position) }>WATCH:</span>
                  <br/>
                  <span className={ cx('watch-video-text-lower', position) }>What is CPDP?</span>
                </div>
                <div className='watch-video-clip'/>
              </div>
            </div>
            <div className={ cx('navbar', position) }>
              <div className={ cx('vertically-aligned-header-item', position) }>
                <LogOutButtonContainer pathname={ pathname } />
              </div>
              <div className={ cx('vertically-aligned-header-item', position) }>
                <RightLinks position={ position } />
              </div>
              <SearchBox
                position={ position }
                searchBoxClassName={ cx('search-box', position) }
              />
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
  className: PropTypes.string
};

SlimHeaderContent.defaultProps = {
  style: {},
  disableTop: false,
  position: 'top',
  pathname: '/'
};

export default SlimHeaderContent;
