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
    this.handleClickCRMarker = this.handleClickCRMarker.bind(this);
    this.handleClickTRRMarker = this.handleClickTRRMarker.bind(this);
    this.renderPreviewPane = this.renderPreviewPane.bind(this);
  }

  componentDidMount() {
    this.fetchGeographicData();
    window.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleClickOutside);
  }

  fetchGeographicData() {
    const {
      requestSocialGraphGeographic,
      requestSocialGraphGeographicPreviewPane,
      officerIds,
      unitId,
      pinboardId
    } = this.props;
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
      requestSocialGraphGeographicPreviewPane(requestParams);
    }
  }

  handleClickOutside(event) {
    const { updateGeographicCrid, updateGeographicTrrId, allegation, trr } = this.props;
    if (!event.target.closest('.geographic-preview-link')) {
      if (allegation) {
        updateGeographicCrid(null);
      } else if (trr) {
        updateGeographicTrrId(null);
      }
    }
  }

  handleClickCRMarker(id) {
    const { updateGeographicCrid } = this.props;
    updateGeographicCrid(id);
  }

  handleClickTRRMarker(id) {
    const { updateGeographicTrrId } = this.props;
    updateGeographicTrrId(id);
  }

  renderPreviewPane() {
    const { allegation, trr } = this.props;

    if (!isEmpty(allegation)) {
      return (
        <div className='right-section'>
          <PreviewPane data={ allegation } type='CR'/>
        </div>
      );
    } else if (!isEmpty(trr)) {
      return (
        <div className='right-section'>
          <PreviewPane data={ trr } type='FORCE'/>
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    const {
      legend,
      markers,
      changeMainTab,
      currentMainTab,
      allegation,
      trr,
    } = this.props;

    return (
      <div className={ styles.geographicMap }>
        <div className='left-section'>
          <MainTabs changeTab={ changeMainTab } currentTab={ currentMainTab }/>
        </div>
        <div className={ cx('main-content', { 'show-right-pane': !isEmpty(allegation) || !isEmpty(trr) }) }>
          <AllegationsMap
            mapCustomClassName='social-graph-map'
            legend={ legend }
            markers={ markers }
            handleClickCRMarker={ this.handleClickCRMarker }
            handleClickTRRMarker={ this.handleClickTRRMarker }
          />
        </div>
        {
          this.renderPreviewPane()
        }
        <div className='clearfix' />
      </div>
    );
  }
}

GeographicMap.propTypes = {
  legend: PropTypes.object,
  markers: PropTypes.array,
  changeMainTab: PropTypes.func,
  requestSocialGraphGeographic: PropTypes.func,
  requestSocialGraphGeographicPreviewPane: PropTypes.func,
  currentMainTab: PropTypes.string,
  officerIds: PropTypes.string,
  unitId: PropTypes.string,
  updateGeographicCrid: PropTypes.func,
  updateGeographicTrrId: PropTypes.func,
  allegation: PropTypes.object,
  trr: PropTypes.object,
  pinboardId: PropTypes.string,
};
