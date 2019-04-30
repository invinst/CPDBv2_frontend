import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import cx from 'classnames';

import styles from './network.sass';
import AnimatedSocialGraph from 'components/common/animated-social-graph';
import RightPaneSection from 'components/social-graph-page/network/right-pane-section';
import sliderStyles from 'components/common/slider.sass';
import { showIntercomLauncher } from 'utils/intercom';
import MainTabs from 'components/social-graph-page/main-tabs';


export default class NetworkGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCivilComplaintOnly: true,
      thresholdValue: 2,
    };
    this.handleCheckShowCivilOnly = this.handleCheckShowCivilOnly.bind(this);
    this.handleChangeThresholdValue = this.handleChangeThresholdValue.bind(this);
  }

  componentDidMount() {
    showIntercomLauncher(false);
    this.fetchGraphData();
  }

  componentDidUpdate(prevProps, prevState) {
    const { showCivilComplaintOnly, thresholdValue } = this.state;
    if (prevState.thresholdValue !== thresholdValue || prevState.showCivilComplaintOnly !== showCivilComplaintOnly) {
      this.fetchGraphData();
    }
  }

  componentWillUnmount() {
    showIntercomLauncher(true);
  }

  fetchGraphData() {
    const { requestSocialGraph, requestSocialGraphAllegations, officerIds, unitId } = this.props;
    const { showCivilComplaintOnly, thresholdValue } = this.state;
    let requestParams;
    if (!isEmpty(unitId)) {
      requestParams = { 'unit_id': unitId, 'threshold': thresholdValue, 'show_civil_only': showCivilComplaintOnly };
    } else if (!isEmpty(officerIds)) {
      requestParams = {
        'officer_ids': officerIds,
        'threshold': thresholdValue,
        'show_civil_only': showCivilComplaintOnly
      };
    }

    if (requestParams) {
      requestSocialGraph(requestParams);
      requestSocialGraphAllegations(requestParams);
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
      officers,
      coaccusedData,
      listEvent,
      title,
      changeNetworkTab,
      currentMainTab,
      currentNetworkTab,
      hasComplaint,
      changeMainTab
    } = this.props;

    return (
      <div className={ styles.networkGraph }>
        <div className='left-section'>
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
          <AnimatedSocialGraph
            officers={ officers }
            coaccusedData={ coaccusedData }
            listEvent={ listEvent }
          />
        </div>
        <div className='right-section'>
          <RightPaneSection
            changeNetworkTab={ changeNetworkTab }
            currentTab={ currentNetworkTab }
            hasComplaint={ hasComplaint }
          />
        </div>
        <div className='clearfix'/>
      </div>
    );
  }
}

NetworkGraph.propTypes = {
  requestSocialGraph: PropTypes.func,
  requestSocialGraphAllegations: PropTypes.func,
  officerIds: PropTypes.string,
  unitId: PropTypes.string,
  officers: PropTypes.array,
  title: PropTypes.string,
  coaccusedData: PropTypes.array,
  listEvent: PropTypes.array,
  changeNetworkTab: PropTypes.func,
  changeMainTab: PropTypes.func,
  hasComplaint: PropTypes.bool,
  currentMainTab: PropTypes.string,
  currentNetworkTab: PropTypes.string,
};

NetworkGraph.defaultProps = {
  requestSocialGraph: () => {},
  requestSocialGraphAllegations: () => {},
  changeNetworkTab: () => {},
  officers: [],
  coaccusedData: [],
  listEvent: [],
};
