import React, { Component, PropTypes } from 'react';
import { get, keys } from 'lodash';
import cx from 'classnames';

import TimelineContainer from 'containers/officer-page/timeline-container';
import CoaccusalsContainer from 'containers/officer-page/coaccusals-container';
import AttachmentsContainer from 'containers/officer-page/attachments-container';
import { OFFICER_PAGE_TAB_NAMES } from 'utils/constants';
import MapContainer from 'containers/officer-page/map-container';
import styles from './tabbed-pane-section.sass';


export default class TabbedPaneSection extends Component {
  render() {
    const {
      currentTab,
      changeOfficerTab,
      hasComplaint,
      hasMapMarker,
      hasCoaccusal,
    } = this.props;
    const tabbedPaneMap = {
      [OFFICER_PAGE_TAB_NAMES.TIMELINE]: {
        component: TimelineContainer,
        show: true,
      },
      [OFFICER_PAGE_TAB_NAMES.MAP]: {
        component: MapContainer,
        show: hasMapMarker,
      },
      [OFFICER_PAGE_TAB_NAMES.COACCUSALS]: {
        component: CoaccusalsContainer,
        show: hasCoaccusal,
      },
      [OFFICER_PAGE_TAB_NAMES.ATTACHMENTS]: {
        component: AttachmentsContainer,
        show: hasComplaint,
      },
    };
    const CurrentComponent = get(tabbedPaneMap, `${currentTab}.component`, null);
    return (
      <div className={ cx(styles.tabbedPaneSection, 'tabbed-pane-section') }>
        <div className='tabbed-pane-section-menu no-print'>
          {
            keys(tabbedPaneMap).map(paneName => (
              get(tabbedPaneMap, `${paneName}.show`) ? (
                <span
                  key={ paneName }
                  className={ cx('tabbed-pane-tab-name', { 'active': paneName === currentTab }) }
                  onClick={ () => changeOfficerTab(paneName) }
                >
                  { paneName }
                </span>
              ) : null
            ))
          }
        </div>
        { CurrentComponent ? <CurrentComponent /> : null }
      </div>
    );
  }
}

TabbedPaneSection.propTypes = {
  currentTab: PropTypes.string,
  changeOfficerTab: PropTypes.func,
  hasComplaint: PropTypes.bool,
  hasMapMarker: PropTypes.bool,
  hasCoaccusal: PropTypes.bool,
};
