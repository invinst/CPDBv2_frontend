import React, { Component, PropTypes } from 'react';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import {
  wrapperStyle, TRRIdHeaderStyle, contentStyle, footerStyle
} from './trr-page.style';
import OfficerSection from './officer-section';
import TRRInfoSection from './trr-info-section';
import FooterContainer from 'containers/footer-container';


export default class TRRPage extends Component {
  render() {
    const {
      trrId, officer, trrLocation, trrDetail, trrDocument, openRequestTRRDocumentModal
    } = this.props;

    return (
      <div style={ wrapperStyle }>
        <ShareableHeaderContainer/>
        <ResponsiveFluidWidthComponent style={ contentStyle }>
          <h1 className='test--trr-title' style={ TRRIdHeaderStyle }>TRR { trrId }</h1>
          <OfficerSection officer={ officer }/>
          <TRRInfoSection
            trrLocation={ trrLocation }
            trrDetail={ trrDetail }
            trrDocument={ trrDocument }
            openRequestTRRDocumentModal={ openRequestTRRDocumentModal }/>
        </ResponsiveFluidWidthComponent>
        <FooterContainer style={ footerStyle }/>
      </div>
    );
  }
}

TRRPage.propTypes = {
  trrId: PropTypes.string,
  officer: PropTypes.object,
  trrLocation: PropTypes.object,
  trrDetail: PropTypes.object,
  trrDocument: PropTypes.object,
  openRequestTRRDocumentModal: PropTypes.func,
};
