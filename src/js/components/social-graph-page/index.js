import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import cx from 'classnames';
import styles from './social-graph-page.sass';
import responsiveContainerStyles from 'components/common/responsive-container.sass';
import AnimatedSocialGraph from 'components/common/animated-social-graph';
import sliderStyles from 'components/common/slider.sass';
import { showIntercomLauncher } from 'utils/intercom';


export default class SocialGraphPage extends Component {
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
    const { requestSocialGraph, officerIds, unitId } = this.props;
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
    }
  }

  handleCheckShowCivilOnly(event) {
    this.setState({ showCivilComplaintOnly: event.target.checked });
  }

  handleChangeThresholdValue(value) {
    this.setState({ thresholdValue: value });
  }

  render() {
    const { officers, coaccusedData, listEvent, title } = this.props;

    return (
      <div className={ styles.socialGraphPage }>
        <div className={ responsiveContainerStyles.responsiveContainer }>
          <div className='sidenav'>
            <div className='sidenav-title'>{ title }</div>
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
          <div className='clearfix'/>
        </div>
      </div>
    );
  }
}

SocialGraphPage.propTypes = {
  requestSocialGraph: PropTypes.func,
  officerIds: PropTypes.string,
  unitId: PropTypes.string,
  officers: PropTypes.array,
  title: PropTypes.string,
  coaccusedData: PropTypes.array,
  listEvent: PropTypes.array,
};

SocialGraphPage.defaultProps = {
  requestSocialGraph: () => {},
  officers: [],
  coaccusedData: [],
  listEvent: [],
};
