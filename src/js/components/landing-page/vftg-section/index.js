import React, { PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import SectionTemplate from 'utils/template/section';
import { SOLID_TEMPLATE } from 'utils/constants';
import MostRecentEmailLink from './most-recent-email-link';
import {
  headerBlockStyle, headerStyle, dateStyle, textInputStyle, subscribeBtnStyle, newsWrapperStyle,
  formActionBlockStyle, vftgWrapperStyle, textStyleDesktop, textStyleExtraWide
} from './vftg-section.style';
import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';
import { TABLET, DESKTOP, EXTRA_WIDE } from 'utils/constants';


class VFTGSection extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [EXTRA_WIDE]: {
        textStyle: textStyleExtraWide
      },
      [DESKTOP]: {
        textStyle: textStyleDesktop
      },
      [TABLET]: {
        textStyle: textStyleDesktop
      }
    };
  }

  renderWithResponsiveStyle(style) {
    const { template, wrapperStyle } = this.props;
    var subscribeUrl =
      '//invisibleinstitute.us1.list-manage.com/subscribe/post?u=5c80c1740c24b198f0f284cd3&id=dee1a647b0';

    return (
      <div style={ [template.wrapper, wrapperStyle] }>
        <div style={ [template.content, vftgWrapperStyle] }>
          <div style={ newsWrapperStyle }>
            <div style={ headerBlockStyle }>
              <span style={ headerStyle }>CPDP WEEKLY</span>
              <span style={ dateStyle }>Sep 23, 2016</span>
            </div>
            <div style={ style.textStyle } key={ style.screen }>
              Complaints against Chicago Police rarely result in discipline data shows.
            </div>
          </div>
          <div>
            <MostRecentEmailLink/>
            <form action={ subscribeUrl } method='post' id='mc-embedded-subscribe-form'
              name='mc-embedded-subscribe-form' className='validate' target='_blank' noValidate={ true }>
              <div id='mc_embed_signup_scroll'>
                <div className='mc-field-group'>
                  <input placeholder='email@example.com' type='email' name='EMAIL' className='email'
                    required='true' id='mce-EMAIL' style={ textInputStyle }/>
                </div>
                <div id='mce-responses' className='clear'>
                  <div className='response' id='mce-error-response' style={ { display: 'none' } } />
                  <div className='response' id='mce-success-response' style={ { display: 'none' } } />
                </div>{ /* real people should not fill this in and expect good things -
                do not remove this or risk form bot signups*/ }
                <div style={ { position: 'absolute', left: '-5000px' } }>
                  <input type='text' name='b_5c80c1740c24b198f0f284cd3_dee1a647b0' tabIndex={ -1 } />
                </div>
                <div className='clear' style={ formActionBlockStyle }>
                  <input type='submit' defaultValue='Subscribe' name='subscribe'
                    id='mc-embedded-subscribe' className='btn' style={ subscribeBtnStyle }/>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

VFTGSection.propTypes = {
  template: PropTypes.object,
  wrapperStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

VFTGSection.defaultProps = {
  template: SectionTemplate(SOLID_TEMPLATE),
  wrapperStyle: {}
};

export default ConfiguredRadium(VFTGSection);
