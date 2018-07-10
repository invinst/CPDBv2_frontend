import React, { Component, PropTypes } from 'react';
import { get, keys } from 'lodash';

import { menuItemStyle, menuStyle, tabbedPaneSectionStyle } from './tabbed-pane-section.style';
import TimelineContainer from 'containers/officer-page/timeline-container';
import CoaccusalsContainer from 'containers/officer-page/coaccusals-container';
import AttachmentsContainer from 'containers/officer-page/attachments-container';
import { OFFICER_PAGE_TAB_NAMES } from 'utils/constants';
import MapContainer from 'containers/officer-page/map-container';


export default class TabbedPaneSection extends Component {
  render() {
    const {
      currentTab,
      changeOfficerTab,
      attachmentComplaintCount,
      mapMarkerCount,
      coaccusalCount
    } = this.props;
    const tabbedPaneMap = {
      [OFFICER_PAGE_TAB_NAMES.TIMELINE]: {
        component: <TimelineContainer />,
      },
      [OFFICER_PAGE_TAB_NAMES.MAP]: {
        component: <MapContainer />,
        count: mapMarkerCount,
      },
      [OFFICER_PAGE_TAB_NAMES.COACCUSALS]: {
        component: <CoaccusalsContainer />,
        count: coaccusalCount,
      },
      [OFFICER_PAGE_TAB_NAMES.ATTACHMENTS]: {
        component: <AttachmentsContainer />,
        count: attachmentComplaintCount,
      },
    };
    return (
      <div style={ tabbedPaneSectionStyle } className='tabbed-pane-section'>
        <div style={ menuStyle } className='test--tabbed-pane-section-menu'>
          {
            keys(tabbedPaneMap).map((paneName) => {
              if (get(tabbedPaneMap, paneName).count !== 0) {
                return (
                  <span
                    key={ paneName }
                    style={ menuItemStyle(paneName === currentTab) }
                    className='test--tabbed-pane-tab-name'
                    onClick={ () => changeOfficerTab(paneName) }
                  >
                    { paneName }
                  </span>
                );
              }
              return null;
            })
          }
        </div>
        { get(tabbedPaneMap, currentTab + '.component', null) }
      </div>
    );
  }
}

TabbedPaneSection.propTypes = {
  currentTab: PropTypes.string,
  changeOfficerTab: PropTypes.func,
  attachmentComplaintCount: PropTypes.number,
  mapMarkerCount: PropTypes.number,
  coaccusalCount: PropTypes.number,
};
