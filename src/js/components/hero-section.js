import React from 'react';

import ArticleContent from 'components/common/article-content';
import ResponsiveStyleComponent, {
  TABLET, DESKTOP, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import {
  wrapperStyle, contentStyle, linkStyle, paragraphStyle, previewImageStyle,
  previewImageExtraWideStyle, innerWrapperStyle
} from './hero-section.style';
import { imgUrl } from 'utils/static-assets';
import CoverImage from 'components/common/cover-image';


export default class HeroSection extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [TABLET]: DESKTOP,
      [DESKTOP]: {
        image: previewImageStyle
      },
      [EXTRA_WIDE]: {
        image: previewImageExtraWideStyle
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
                  <a href='http://cpdb.co/data' style={ linkStyle }>
                    Explore the data.
                  </a>
                </div>
              </div>
              <div className='preview-image pure-u-2-3'>
                <CoverImage src={ imgUrl('cpdb-v1-ss.png') } style={ style.image }/>
              </div>
            </div>
          </div>
        </ResponsiveFixedWidthComponent>
      </div>
    );
  }
}
