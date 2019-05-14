import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import cx from 'classnames';

import styles from './network.sass';
import RightPaneSection from 'components/social-graph-page/network/right-pane-section';
import sliderStyles from 'components/common/slider.sass';
import { showIntercomLauncher } from 'utils/intercom';
import MainTabs from 'components/social-graph-page/main-tabs';
import PreviewPane from 'components/social-graph-page/network/right-pane-section/officers/preview-pane';
import AnimatedSocialGraphContainer from 'containers/social-graph-page/animated-social-graph-container';


export default class NetworkGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCivilComplaintOnly: true,
      thresholdValue: 2,
    };
    this.handleCheckShowCivilOnly = this.handleCheckShowCivilOnly.bind(this);
    this.handleChangeThresholdValue = this.handleChangeThresholdValue.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    showIntercomLauncher(false);
    this.fetchGraphData();
    window.addEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate(prevProps, prevState) {
    const { showCivilComplaintOnly, thresholdValue } = this.state;
    if (prevState.thresholdValue !== thresholdValue || prevState.showCivilComplaintOnly !== showCivilComplaintOnly) {
      this.fetchGraphData();
    }
  }

  componentWillUnmount() {
    showIntercomLauncher(true);
    window.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    const { updateOfficerId } = this.props;
    if (!event.target.closest('.officer-preview-link')) {
      updateOfficerId(null);
    }
  }

  fetchGraphData() {
    const {
      requestSocialGraphNetwork,
      requestSocialGraphAllegations,
      requestSocialGraphOfficers,
      officerIds,
      unitId,
      pinboardId,
    } = this.props;
    const { showCivilComplaintOnly, thresholdValue } = this.state;
    let requestParams;
    if (!isEmpty(pinboardId)) {
      requestParams = {
        'pinboard_id': pinboardId, 'threshold': thresholdValue, 'show_civil_only': showCivilComplaintOnly
      };
    } else if (!isEmpty(unitId)) {
      requestParams = { 'unit_id': unitId, 'threshold': thresholdValue, 'show_civil_only': showCivilComplaintOnly };
    } else if (!isEmpty(officerIds)) {
      requestParams = {
        'officer_ids': officerIds,
        'threshold': thresholdValue,
        'show_civil_only': showCivilComplaintOnly
      };
    }

    if (requestParams) {
      requestSocialGraphNetwork(requestParams);
      requestSocialGraphAllegations(requestParams);
      requestSocialGraphOfficers(requestParams);
    }
  }

  handleCheckShowCivilOnly(event) {
    this.setState({ showCivilComplaintOnly: event.target.checked });
  }

  handleChangeThresholdValue(value) {
    this.setState({ thresholdValue: value });
  }

  render() {
    const {
      title,
      changeNetworkTab,
      currentMainTab,
      currentNetworkTab,
      hasComplaint,
      changeMainTab,
      officer,
      location,
      pinboardId,
    } = this.props;

    return (
      <div className={ styles.networkGraph }>
        <div className='left-section'>
          {
            pinboardId && (
              <a className='back-to-pinboard-link' href={ `/pinboard/${pinboardId}/` }>← Back to pinboard</a>
            )
          }
          <MainTabs changeTab={ changeMainTab } currentTab={ currentMainTab }/>
          <div className='social-graph-title'>{ title }</div>
          <div className='coaccusals-threshold-slider-container'>
            <p className='coaccusals-threshold-text'>Minimum Coaccusal Threshold</p>
            <Slider
              step={ 1 }
              min={ 1 }
              max={ 4 }
              defaultValue={ 2 }
              value={ this.state.thresholdValue }
              onChange={ this.handleChangeThresholdValue }
              className={ cx(sliderStyles.slider, 'coaccusals-threshold-slider') }
            />
          </div>
          <label>
            Show only complaints from civilians
            <input
              type='checkbox'
              checked={ this.state.showCivilComplaintOnly }
              onChange={ this.handleCheckShowCivilOnly }
              className='test--show-civil-complaint-checkbox'
            />
          </label>

        </div>
        <div className='graph-container'>
          <AnimatedSocialGraphContainer/>
        </div>
        <div className='right-section'>
          {
            !isEmpty(officer) ? (
              <PreviewPane data={ officer } />
            ) : (
              <RightPaneSection
                changeNetworkTab={ changeNetworkTab }
                currentTab={ currentNetworkTab }
                hasComplaint={ hasComplaint }
                location={ location }
              />
            )
          }
        </div>
        <div className='clearfix'/>
      </div>
    );
  }
}

NetworkGraph.propTypes = {
  requestSocialGraphNetwork: PropTypes.func,
  requestSocialGraphAllegations: PropTypes.func,
  requestSocialGraphOfficers: PropTypes.func,
  officerIds: PropTypes.string,
  unitId: PropTypes.string,
  pinboardId: PropTypes.string,
  title: PropTypes.string,
  changeNetworkTab: PropTypes.func,
  changeMainTab: PropTypes.func,
  hasComplaint: PropTypes.bool,
  currentMainTab: PropTypes.string,
  currentNetworkTab: PropTypes.string,
  officer: PropTypes.object,
  updateOfficerId: PropTypes.func,
  location: PropTypes.object,
};

NetworkGraph.defaultProps = {
  requestSocialGraphNetwork: () => {},
  requestSocialGraphAllegations: () => {},
  requestSocialGraphOfficers: () => {},
};
