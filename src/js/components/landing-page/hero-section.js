import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import ResponsiveStyleComponent, {
  TABLET, DESKTOP, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import {
  wrapperStyle, leftColumnWrapper, rightColumnWrapper, linkStyle, paragraphStyle,
  previewImageStyle, innerWrapperStyle
} from './hero-section.style';
import { imgUrl } from 'utils/static-assets';
import CoverImage from 'components/common/cover-image';
import createFunctionWithTimeout from 'utils/create-function-with-timeout';
import PropsRerender from 'components/common/higher-order/props-rerender';


class HeroSection extends Component {
  constructor(props) {
    super(props);
    this.dataLink = 'http://cpdb.co/data';
    this.shootingDataLink = 'http://cpdb.co/shooting-data';
    this.handleClickDataLink = this.handleClickDataLink.bind(this);
    this.handleClickShootingDataLink = this.handleClickShootingDataLink.bind(this);
  }

  handleClickDataLink(event) {
    event.preventDefault();

    global.ga('send', 'event', 'Hero section: complaints data link', 'click', {
      hitCallback: createFunctionWithTimeout(() => window.location = this.dataLink )
    });
  }

  handleClickShootingDataLink(event) {
    event.preventDefault();

    global.ga('send', 'event', 'Hero section: shooting data link', 'click', {
      hitCallback: createFunctionWithTimeout(() => window.location = this.shootingDataLink )
    });
  }

  responsiveStyle() {
    return {
      [TABLET]: {
        image: [previewImageStyle.base, previewImageStyle.tablet]
      },
      [DESKTOP]: {
        image: previewImageStyle.base
      },
      [EXTRA_WIDE]: {
        image: [previewImageStyle.base, previewImageStyle.extraWide]
      }
    };
  }

  renderWithResponsiveStyle(style) {
    const { complaintsText, useOfForceText } = this.props;
    return (
      <div style={ wrapperStyle }>
        <ResponsiveFixedWidthComponent>
          <div style={ innerWrapperStyle }>
            <div className='pure-g'>
              <div className='pure-u-1-2'>
                <div style={ leftColumnWrapper }>
                  <a onClick={ this.handleClickDataLink } className='data-link'>
                    <CoverImage src={ imgUrl('cpdb-v1-ss.png') } style={ style.image }/>
                  </a>
                  <p style={ paragraphStyle }>
                    { complaintsText }
                  </p>
                  <a
                    key={ `data-tool-${style.screen}` } className='link--transition'
                    style={ linkStyle } onClick={ this.handleClickDataLink }>
                    View complaints
                  </a>
                </div>
              </div>
              <div className='pure-u-1-2'>
                <div style={ rightColumnWrapper }>
                  <a onClick={ this.handleClickShootingDataLink } className='shooting-data-link'>
                    <CoverImage src={ imgUrl('cpdb-v1-shooting-ss.png') } style={ style.image }/>
                  </a>
                  <p style={ paragraphStyle }>
                    { useOfForceText }
                  </p>
                  <a
                    key={ `shooting-data-tool-${style.screen}` } className='link--transition'
                    style={ linkStyle } onClick={ this.handleClickShootingDataLink }>
                    View Use of Force
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ResponsiveFixedWidthComponent>
      </div>
    );
  }

  render() {
    return (
      <ResponsiveStyleComponent
        responsiveStyle={ this.responsiveStyle() }>
        { this.renderWithResponsiveStyle.bind(this) }
      </ResponsiveStyleComponent>
    );
  }
}

HeroSection.propTypes = {
  complaintsText: PropTypes.string,
  useOfForceText: PropTypes.string
};

export default PropsRerender(ConfiguredRadium(HeroSection));
