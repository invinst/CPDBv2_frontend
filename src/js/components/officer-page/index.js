import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { compact, get } from 'lodash';
import { Helmet } from 'react-helmet-async';
import pluralize from 'pluralize';
import cx from 'classnames';

import AnimatedRadarChart from './radar-chart';
import SummarySection from './summary-section';
import MetricsSection from './metrics-section';
import TabbedPaneSection from './tabbed-pane-section';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import DownloadMenuContainer from 'containers/headers/shareable-header/download-menu-container';
import PinboardsMenuContainer from 'containers/officer-page/pinboards-menu-container';
import FooterContainer from 'containers/footer-container';
import { POPUP_NAMES } from 'utils/constants';
import Printable from 'components/common/higher-order/printable';
import PrintNotes from 'components/common/print-notes';
import PrintPreloadFonts from 'components/common/print-preload-fonts';
import * as tracking from 'utils/tracking';
import { PrintModeContext } from 'contexts';
import styles from './officer-page.sass';
import HeaderButton from 'components/headers/shareable-header/header-button';
import headerStyles from 'components/headers/shareable-header/shareable-header.sass';


function OfficerPage(props) {
  const {
    officerId,
    officerSummary,
    officerMetrics,
    numAttachments,
    officerName,
    threeCornerPercentile,
    changeOfficerTab,
    currentTab,
    hasComplaint,
    hasMapMarker,
    hasCoaccusal,
    popup,
    isRequesting,
    triangleEditWrapperStateProps,
    scaleEditWrapperStateProps,
    noDataRadarChartEditWrapperStateProps,
    pathName,
    infoNotes,
    timelineNotes,
  } = props;
  const { printMode } = useContext(PrintModeContext);
  const { rank, badge, hasUniqueName } = officerSummary;
  const { allegationCount, useOfForceCount } = officerMetrics;

  const pageTitle = compact([rank === 'N/A' ? '' : rank, officerName]).join(' ');

  const hasUnknownBadge = (badge || 'Unknown') === 'Unknown';
  const withBadge = hasUniqueName || hasUnknownBadge ? '' : `with Badge Number ${badge} `;

  const pageDescription = `Officer ${officerName} of the Chicago Police Department ` +
     withBadge +
    `has ${pluralize('complaint', allegationCount, true)}, ` +
    `${pluralize('use of force report', useOfForceCount, true)}, ` +
    `and ${pluralize('original document', numAttachments, true)} available.`;

  return (
    <React.Fragment>
      <Helmet>
        <title>{ pageTitle }</title>
        <meta name='description' content={ pageDescription } />
      </Helmet>
      <div className={ styles.officerPage }>
        <ShareableHeaderContainer
          headerButtons={
            <React.Fragment>
              <HeaderButton
                buttonClassName={ cx(headerStyles.addToPinboardBtn, 'pinboard-feature') }
                Menu={ PinboardsMenuContainer }
              />
              <HeaderButton
                buttonClassName={ styles.downloadBtn }
                Menu={ DownloadMenuContainer }
                onOpen={ () => tracking.trackOfficerDownloadMenu(officerId, 'open') }
              />
            </React.Fragment>
          }
        />
        <div className='page-wrapper'>
          <AnimatedRadarChart
            officerId={ officerId }
            data={ threeCornerPercentile }
            isRequesting={ isRequesting }
            triangleEditWrapperStateProps={ triangleEditWrapperStateProps }
            scaleEditWrapperStateProps={ scaleEditWrapperStateProps }
            noDataRadarChartEditWrapperStateProps={ noDataRadarChartEditWrapperStateProps }
            noDataPopup={ get(popup, POPUP_NAMES.OFFICER.NO_DATA_RADAR_CHART) }
          />
          <SummarySection
            officerName={ officerName }
            officerSummary={ officerSummary }
            popup={ popup }
            pathName={ pathName }
          />
        </div>
        <MetricsSection metrics={ officerMetrics } popup={ popup } pathName={ pathName }/>
        { printMode ? <PrintNotes notes={ infoNotes } /> : null }
        <TabbedPaneSection
          changeOfficerTab={ changeOfficerTab }
          currentTab={ currentTab }
          hasComplaint={ hasComplaint }
          hasMapMarker={ hasMapMarker }
          hasCoaccusal={ hasCoaccusal }
        />
        { printMode ? <PrintNotes notes={ timelineNotes } /> : null }
        <FooterContainer className={ styles.officerPageFooter }/>
        <PrintPreloadFonts/>
      </div>
    </React.Fragment>
  );
}

OfficerPage.propTypes = {
  officerId: PropTypes.number,
  officerName: PropTypes.string,
  officerSummary: PropTypes.object,
  officerMetrics: PropTypes.object,
  numAttachments: PropTypes.number,
  threeCornerPercentile: PropTypes.array,
  currentTab: PropTypes.string,
  changeOfficerTab: PropTypes.func,
  hasComplaint: PropTypes.bool,
  hasMapMarker: PropTypes.bool,
  hasCoaccusal: PropTypes.bool,
  isRequesting: PropTypes.bool,
  popup: PropTypes.object,
  triangleEditWrapperStateProps: PropTypes.object,
  scaleEditWrapperStateProps: PropTypes.object,
  noDataRadarChartEditWrapperStateProps: PropTypes.object,
  pathName: PropTypes.string,
  officerSlug: PropTypes.string,
  infoNotes: PropTypes.array,
  timelineNotes: PropTypes.array,
};

OfficerPage.defaultProps = {
  changeOfficerTab: () => {},
  officerSummary: {},
  pathName: '',
  officerMetrics: {
    allegationCount: 0,
    useOfForceCount: 0,
  },
  numAttachments: 0,
};

export default Printable(OfficerPage);
