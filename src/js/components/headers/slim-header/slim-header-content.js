import React, { PropTypes, Component } from 'react';
import cx from 'classnames';
import { noop } from 'lodash';

import RightLinks from './right-links';
import LogoContainer from 'containers/headers/slim-header/logo-container';
import LogOutButtonContainer from 'containers/log-out-container';
import SearchSectionComponent from 'components/landing-page/search-section';
import { accentColor } from 'utils/styles';
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
            <div className={ cx('vertically-aligned-header-item', position) }>
              <LogOutButtonContainer pathname={ pathname } />
            </div>

            <div className={ cx('vertically-aligned-header-item', position) }>
              <RightLinks className={ cx('right-link', position) } editModeOn={ editModeOn } />
            </div>

            <SearchSectionComponent
              searchBoxClassName={ cx('search-box', position) }
              magnifyingGlassColor={ position === 'bottom' ? 'white' : accentColor }
            />

            <div className='logo'>
              <LogoContainer position={ position } editModeOn={ editModeOn } />
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
