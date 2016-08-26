import React from 'react';

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


class HeroSection extends ResponsiveStyleComponent {
  constructor(props) {
    super(props);
    this.dataLink = 'http://cpdb.co/data';
    this.shootingDataLink = 'http://cpdb.co/shooting-data';
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
    return (
      <div style={ wrapperStyle }>
        <ResponsiveFixedWidthComponent>
          <div style={ innerWrapperStyle }>
            <div className='pure-g'>
              <div className='pure-u-1-2'>
                <div style={ leftColumnWrapper }>
                  <a href={ this.dataLink }>
                    <CoverImage src={ imgUrl('cpdb-v1-ss.png') } style={ style.image }/>
                  </a>
                  <p style={ paragraphStyle }>
                    Complaints against the Chicago Police Department.
                  </p>
                  <a
                    key={ `data-tool-${style.screen}` } className='link--transition'
                    href={ this.dataLink } style={ linkStyle }>
                    View complaints
                  </a>
                </div>
              </div>
              <div className='pure-u-1-2'>
                <div style={ rightColumnWrapper }>
                  <a href={ this.shootingDataLink }>
                    <CoverImage src={ imgUrl('cpdb-v1-shooting-ss.png') } style={ style.image }/>
                  </a>
                  <p style={ paragraphStyle }>
                    Instances where Chicago Police have "used force".
                  </p>
                  <a
                    key={ `shooting-data-tool-${style.screen}` } className='link--transition'
                    href={ this.shootingDataLink } style={ linkStyle }>
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
}

export default ConfiguredRadium(HeroSection);
