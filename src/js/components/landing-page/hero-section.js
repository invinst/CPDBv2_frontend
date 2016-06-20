import React from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import ArticleContent from 'components/common/article-content';
import ResponsiveStyleComponent, {
  TABLET, DESKTOP, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import {
  wrapperStyle, contentStyle, linkStyle, paragraphStyle, previewImageStyle,
  previewImageDesktopStyle, previewImageTabletStyle, innerWrapperStyle, desktopLinkStyle, tabletLinkStyle
} from './hero-section.style';
import { imgUrl } from 'utils/static-assets';
import CoverImage from 'components/common/cover-image';


class HeroSection extends ResponsiveStyleComponent {
  constructor(props) {
    super(props);
    this.dataLink = 'http://cpdb.co/data';
  }
  responsiveStyle() {
    return {
      [TABLET]: {
        image: previewImageTabletStyle,
        link: [linkStyle.base, tabletLinkStyle]
      },
      [DESKTOP]: {
        image: previewImageDesktopStyle,
        link: [linkStyle.base, desktopLinkStyle]
      },
      [EXTRA_WIDE]: {
        image: previewImageStyle,
        link: linkStyle.base
      }
    };
  }
  renderWithResponsiveStyle(style) {
    return (
      <div style={ wrapperStyle }>
        <ResponsiveFixedWidthComponent>
          <div style={ innerWrapperStyle }>
            <div className='pure-g'>
              <div className='hero-content pure-u-1-3'>
                <div style={ contentStyle }>
                  <ArticleContent style={ paragraphStyle }>
                    Until recently, records of police misconduct in Chicago have been kept secret.
                  </ArticleContent>
                  <ArticleContent style={ paragraphStyle }>
                    In 2014, the court decision Kalven v. Chicago opened those files to the public.
                  </ArticleContent>
                  <a className='link--transition' key={ style.screen } href={ this.dataLink } style={ style.link }>
                    Explore the data.
                  </a>
                </div>
              </div>
              <div className='preview-image pure-u-2-3'>
                <a href={ this.dataLink }>
                  <CoverImage src={ imgUrl('cpdb-v1-ss.png') } style={ style.image }/>
                </a>
              </div>
            </div>
          </div>
        </ResponsiveFixedWidthComponent>
      </div>
    );
  }
}

export default ConfiguredRadium(HeroSection);
