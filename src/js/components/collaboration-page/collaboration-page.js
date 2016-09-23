import React from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import CopyLinkButton from 'components/common/copy-link-btn';
import Footer from 'components/footer';
import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';
import {
  wrapperStyle, headLineStyle, leftColumnStyle, rightColumnStyle,
  columnHeadLineStyle, emailLinkStyle, listElementStyle, paragraphStyle,
  emailLinkWrapperStyle, smallTextStyle, copyLinkStyle, listStyle
} from './collaboration-page.style';
import { MOBILE, TABLET, DESKTOP } from 'utils/constants';


const foiaEmail = 'foia@chicagopolice.org';
const loremEmail = 'loremipsum@cpdp.co';

class CollaborationPage extends ResponsiveStyleComponent {
  responsiveStyle() {
    return {
      [MOBILE]: {
        wrapper: [wrapperStyle.base, wrapperStyle.mobile]
      },
      [TABLET]: {
        wrapper: [wrapperStyle.base, wrapperStyle.tablet]
      },
      [DESKTOP]: {
        wrapper: [wrapperStyle.base, wrapperStyle.tablet]
      }
    };
  }

  renderWithResponsiveStyle(style) {
    return (
      <div>
        <div style={ style.wrapper }>
          <div className='pure-g'>
            <div className='pure-u-1-1'>
              <h2 style={ headLineStyle }>
                This information presented in the Citizens Police Data Project
                was collected through Freedom of Information Act requests (FOIAs).
              </h2>
            </div>
            <div className='pure-u-1-2'>
              <div style={ leftColumnStyle }>
                <h6 style={ columnHeadLineStyle }>
                  Make your own FOIA request*
                </h6>
                <p style={ paragraphStyle }>
                  If you see a complaint you'd like to know more about, download a
                  sample request for the full Complaint Register file, fill in the
                  missing information, and email the PDF to
                </p>
                <div style={ emailLinkWrapperStyle }>
                  <a href={ `mailto:${foiaEmail}` } style={ emailLinkStyle }>{ foiaEmail }</a>
                  <CopyLinkButton style={ copyLinkStyle } text={ foiaEmail }/>
                </div>
                <p style={ smallTextStyle }>
                  *Before being released, each Complaint Register file must have
                  all personal information for non-police officers redacted, by
                  hand. We suggest you limit your request to fewer than five
                  Complaint Register files, so as to not overwhelm the FOIA officer
                  or delay your request.
                </p>
              </div>
            </div>
            <div className='pure-u-1-2' style={ rightColumnStyle }>
              <h6 style={ columnHeadLineStyle }>
                Share your documents
              </h6>
              <p style={ paragraphStyle }>
                We are working to create a resource for public oversight and input,
                and we welcome community collaboration.
              </p>
              <p style={ smallTextStyle }>
                We are currently looking for the following records:
              </p>
              <ul style={ listStyle }>
                <li style={ listElementStyle }>Complaint register files</li>
                <li style={ listElementStyle }>Civil claims against Chicago Police Officers</li>
                <li style={ listElementStyle }>Settlement agreements</li>
              </ul>
              <p style={ smallTextStyle }>
                If you'd like to add your documents to the database, e-mail us at
              </p>
              <div style={ emailLinkWrapperStyle }>
                <a href={ `mailto:${loremEmail}` } style={ emailLinkStyle }>{ loremEmail }</a>
                <CopyLinkButton style={ copyLinkStyle } text={ loremEmail }/>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default ConfiguredRadium(CollaborationPage);
