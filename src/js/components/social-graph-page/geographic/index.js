import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import cx from 'classnames';

import styles from './geographic.sass';
import AllegationsMap from 'components/common/allegations-map';
import MainTabs from 'components/social-graph-page/main-tabs';
import PreviewPane from 'components/social-graph-page/geographic/preview-pane';


export default class GeographicMap extends Component {
  constructor(props) {
    super(props);
    this.fetchGeographicData = this.fetchGeographicData.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleClickMarker = this.handleClickMarker.bind(this);
  }

  componentDidMount() {
    this.fetchGeographicData();
    window.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleClickOutside);
  }

  fetchGeographicData() {
    const { requestSocialGraphGeographic, officerIds, unitId, pinboardId } = this.props;
    let requestParams;
    if (!isEmpty(pinboardId)) {
      requestParams = { 'pinboard_id': pinboardId };
    } else if (!isEmpty(unitId)) {
      requestParams = { 'unit_id': unitId };
    } else if (!isEmpty(officerIds)) {
      requestParams = {
        'officer_ids': officerIds,
      };
    }

    if (requestParams) {
      requestSocialGraphGeographic(requestParams);
    }
  }

  handleClickOutside(event) {
    const { updateGeographicCrid } = this.props;
    if (!event.target.closest('.geographic-preview-link')) {
      updateGeographicCrid(null);
    }
  }

  handleClickMarker(id) {
    const { updateGeographicCrid } = this.props;
    updateGeographicCrid(id);
  }

  render() {
    const {
      mapCustomClassName,
      legend,
      markers,
      changeMainTab,
      currentMainTab,
      allegation
    } = this.props;

    return (
      <div className={ styles.geographicMap }>
        <div className='left-section'>
          <MainTabs changeTab={ changeMainTab } currentTab={ currentMainTab }/>
        </div>
        <div className={ cx('main-content', { 'show-right-pane': !isEmpty(allegation) }) }>
          <AllegationsMap
            mapCustomClassName={ mapCustomClassName }
            legend={ legend }
            markers={ markers }
            handleClickMarker={ this.handleClickMarker }

          />
        </div>
        {
          !isEmpty(allegation) ?
            <div className='right-section'>
              <PreviewPane data={ allegation }/>
            </div>
          : null
        }
        <div className='clearfix' />
      </div>
    );
  }
}

GeographicMap.propTypes = {
  mapCustomClassName: PropTypes.string,
  legend: PropTypes.object,
  markers: PropTypes.array,
  changeMainTab: PropTypes.func,
  requestSocialGraphGeographic: PropTypes.func,
  currentMainTab: PropTypes.string,
  officerIds: PropTypes.string,
  unitId: PropTypes.string,
  updateGeographicCrid: PropTypes.func,
  allegation: PropTypes.object,
  pinboardId: PropTypes.string,
};
