import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';

import styles from './geographic.sass';
import AllegationsMap from 'components/common/allegations-map';
import MainTabs from 'components/social-graph-page/main-tabs';


export default class GeographicMap extends Component {
  constructor(props) {
    super(props);
    this.fetchGeographicData = this.fetchGeographicData.bind(this);
  }

  componentDidMount() {
    this.fetchGeographicData();
  }

  fetchGeographicData() {
    const { requestGeographic, officerIds, unitId } = this.props;
    let requestParams;
    if (!isEmpty(unitId)) {
      requestParams = { 'unit_id': unitId };
    } else if (!isEmpty(officerIds)) {
      requestParams = {
        'officer_ids': officerIds,
      };
    }

    if (requestParams) {
      requestGeographic(requestParams);
    }
  }

  render() {
    const {
      mapCustomClassName,
      legend,
      markers,
      changeMainTab,
      currentMainTab,
    } = this.props;

    return (
      <div className={ styles.geographicMap }>
        <div className='left-section'>
          <MainTabs changeTab={ changeMainTab } currentTab={ currentMainTab }/>
        </div>
        <div className='main-content'>
          <AllegationsMap mapCustomClassName={ mapCustomClassName } legend={ legend } markers={ markers }/>
        </div>
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
  requestGeographic: PropTypes.func,
  currentMainTab: PropTypes.string,
  officerIds: PropTypes.string,
  unitId: PropTypes.string,
};
