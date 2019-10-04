import React, { Component, PropTypes } from 'react';
import { isEmpty, noop } from 'lodash';
import cx from 'classnames';

import styles from './geographic.sass';
import AllegationsMap from 'components/common/allegations-map';
import PreviewPane from 'components/social-graph-page/geographic/preview-pane';
import { loadPaginatedData } from 'utils/load-paginated-data';


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
      requestFirstPageSocialGraphGeographicCrs,
      requestOtherPagesSocialGraphGeographicCrs,
      requestFirstPageSocialGraphGeographicTrrs,
      requestOtherPagesSocialGraphGeographicTrrs,
      requestFirstPageSocialGraphGeographicCrsPreviewPane,
      requestOtherPagesSocialGraphGeographicCrsPreviewPane,
      requestFirstPageSocialGraphGeographicTrrsPreviewPane,
      requestOtherPagesSocialGraphGeographicTrrsPreviewPane,
      officerIds,
      unitId,
      pinboardId,
      isRequested,
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

    if (requestParams && !isRequested) {
      loadPaginatedData(
        requestParams,
        requestFirstPageSocialGraphGeographicCrs,
        requestOtherPagesSocialGraphGeographicCrs
      );
      loadPaginatedData(
        requestParams,
        requestFirstPageSocialGraphGeographicTrrs,
        requestOtherPagesSocialGraphGeographicTrrs,
      );
      loadPaginatedData(
        requestParams,
        requestFirstPageSocialGraphGeographicCrsPreviewPane,
        requestOtherPagesSocialGraphGeographicCrsPreviewPane
      );
      loadPaginatedData(
        requestParams,
        requestFirstPageSocialGraphGeographicTrrsPreviewPane,
        requestOtherPagesSocialGraphGeographicTrrsPreviewPane,
      );
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
      mainTabsContent,
      allegation,
      trr,
    } = this.props;

    return (
      <div className={ styles.geographicMap }>
        <div className='left-section'>
          { mainTabsContent }
        </div>
        <div className={ cx('main-content', { 'show-right-pane': !isEmpty(allegation) || !isEmpty(trr) }) }>
          <AllegationsMap
            mapCustomClassName='social-graph-map'
            legend={ legend }
            markers={ markers }
            handleClickCRMarker={ this.handleClickCRMarker }
            handleClickTRRMarker={ this.handleClickTRRMarker }
            clearAllMarkers={ false }
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
  mainTabsContent: PropTypes.node,
  requestFirstPageSocialGraphGeographicCrs: PropTypes.func,
  requestOtherPagesSocialGraphGeographicCrs: PropTypes.func,
  requestFirstPageSocialGraphGeographicTrrs: PropTypes.func,
  requestOtherPagesSocialGraphGeographicTrrs: PropTypes.func,
  requestFirstPageSocialGraphGeographicCrsPreviewPane: PropTypes.func,
  requestOtherPagesSocialGraphGeographicCrsPreviewPane: PropTypes.func,
  requestFirstPageSocialGraphGeographicTrrsPreviewPane: PropTypes.func,
  requestOtherPagesSocialGraphGeographicTrrsPreviewPane: PropTypes.func,
  officerIds: PropTypes.string,
  unitId: PropTypes.string,
  updateGeographicCrid: PropTypes.func,
  updateGeographicTrrId: PropTypes.func,
  allegation: PropTypes.object,
  trr: PropTypes.object,
  pinboardId: PropTypes.string,
  isRequested: PropTypes.bool,
};

GeographicMap.defaultProps = {
  requestSocialGraphGeographic: noop,
  requestSocialGraphGeographicPreviewPane: noop,
};
