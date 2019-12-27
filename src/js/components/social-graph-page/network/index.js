import React, { Component } from 'react';
import { isEmpty, noop, startCase, toLower } from 'lodash';
import PropTypes from 'prop-types';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import cx from 'classnames';

import styles from './network.sass';
import RightPaneSection from 'components/social-graph-page/network/right-pane-section';
import sliderStyles from 'components/common/slider.sass';
import { showIntercomLauncher } from 'utils/intercom';
import PreviewPane from 'components/social-graph-page/network/preview-pane';
import AnimatedSocialGraphContainer from 'containers/social-graph-page/animated-social-graph-container';

const SIDEBARS_STATUS_MAPPING = {
  'SHOW_BOTH': {
    showLeftSidebar: true,
    showRightSidebar: true,
    classname: 'show-both-sidebars',
    iconClassname: 'show-right-sidebar-icon',
    nextSidebarsStatus: 'SHOW_RIGHT',
  },
  'SHOW_RIGHT': {
    showLeftSidebar: false,
    showRightSidebar: true,
    classname: 'show-right-sidebar',
    iconClassname: 'hide-both-sidebars-icon',
    nextSidebarsStatus: 'HIDE_BOTH',
  },
  'HIDE_BOTH': {
    showLeftSidebar: false,
    showRightSidebar: false,
    classname: 'hide-both-sidebars',
    iconClassname: 'show-left-sidebar-icon',
    nextSidebarsStatus: 'SHOW_LEFT',
  },
  'SHOW_LEFT': {
    showLeftSidebar: true,
    showRightSidebar: false,
    classname: 'show-left-sidebar',
    iconClassname: 'show-both-sidebars-icon',
    nextSidebarsStatus: 'SHOW_BOTH',
  },
};

const DEFAULT_SIDEBARS_STATUS = 'SHOW_BOTH';

const COMPLAINT_ORIGIN_VALUES = ['ALL', 'CIVILIAN', 'OFFICER'];
const COMPLAINT_ORIGIN_CIVILIAN = 'CIVILIAN';
const DEFAULT_THRESHOLD_VALUE = 2;

export default class NetworkGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complaintOrigin: COMPLAINT_ORIGIN_CIVILIAN,
      thresholdValue: DEFAULT_THRESHOLD_VALUE,
      sortedOfficerIds: [],
      sidebarsStatus: DEFAULT_SIDEBARS_STATUS,
      previousSidebarsStatus: DEFAULT_SIDEBARS_STATUS,
      performResizeGraph: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { sidebarsStatus, previousSidebarsStatus } = state;

    return {
      performResizeGraph: (sidebarsStatus !== previousSidebarsStatus),
      previousSidebarsStatus: sidebarsStatus,
    };
  }

  componentDidMount() {
    showIntercomLauncher(false);
    this.fetchGraphData();
    window.addEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate(prevProps, prevState) {
    const { complaintOrigin, thresholdValue } = this.state;
    if (prevState.thresholdValue !== thresholdValue || prevState.complaintOrigin !== complaintOrigin) {
      this.fetchGraphData();
    }
  }

  componentWillUnmount() {
    showIntercomLauncher(true);
    window.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = event => {
    const {
      updateSelectedOfficerId,
      updateSelectedEdge,
      updateSelectedCrid,
      selectedOfficerId,
      selectedEdge,
      selectedCrid,
    } = this.props;
    if (!event.target.closest('.officer-preview-link, .edge-coaccusals-preview-link, .cr-preview-link')) {
      if (selectedOfficerId) {
        updateSelectedOfficerId(null);
      }
      if (selectedCrid) {
        updateSelectedCrid(null);
      } else {
        if (selectedEdge) {
          updateSelectedEdge(null);
        }
      }
    }
  };

  fetchGraphData() {
    const {
      requestSocialGraphNetwork,
      requestSocialGraphAllegations,
      requestSocialGraphOfficers,
      officerIds,
      unitId,
      pinboardId,
    } = this.props;
    const { complaintOrigin, thresholdValue } = this.state;
    let requestParams;
    if (!isEmpty(pinboardId)) {
      requestParams = {
        'pinboard_id': pinboardId, 'threshold': thresholdValue, 'complaint_origin': complaintOrigin,
      };
    } else if (!isEmpty(unitId)) {
      requestParams = { 'unit_id': unitId, 'threshold': thresholdValue, 'complaint_origin': complaintOrigin };
    } else if (!isEmpty(officerIds)) {
      requestParams = {
        'officer_ids': officerIds,
        'threshold': thresholdValue,
        'complaint_origin': complaintOrigin,
      };
    }

    if (requestParams) {
      requestSocialGraphNetwork(requestParams);
      requestSocialGraphAllegations(requestParams);
      requestSocialGraphOfficers(requestParams);
    }
  }

  handleSelectComplaintOrigin = value => {
    this.setState({ complaintOrigin: value });
  };

  handleChangeThresholdValue = value => {
    this.setState({ thresholdValue: value });
  };

  updateSortedOfficerIds = officerIds => {
    this.setState({ sortedOfficerIds: officerIds });
  };

  renderPreviewPane() {
    const {
      networkPreviewPaneData,
      changeNetworkTab,
      currentNetworkTab,
      showTimelineTab,
      location,
      onTrackingAttachment,
      updateSelectedCrid,
    } = this.props;

    const { sortedOfficerIds } = this.state;

    if (!isEmpty(networkPreviewPaneData)) {
      return (
        <PreviewPane
          { ...networkPreviewPaneData }
          location={ location }
          onTrackingAttachment={ onTrackingAttachment }
          updateSelectedCrid={ updateSelectedCrid }
          pinnable={ false }
        />
      );
    } else {
      return (
        <RightPaneSection
          changeNetworkTab={ changeNetworkTab }
          currentTab={ currentNetworkTab }
          showTimelineTab={ showTimelineTab }
          location={ location }
          sortedOfficerIds={ sortedOfficerIds }
        />
      );
    }
  }

  handleToggleSidebarsButtonClick = () => {
    this.setState({ sidebarsStatus: this.sidebarsSettings().nextSidebarsStatus });
  };

  toggleSidebarsButton() {
    return (
      <div
        className={ cx('toggle-sidebars-btn', this.sidebarsSettings().iconClassname) }
        onClick={ this.handleToggleSidebarsButtonClick }
      />
    );
  }

  sidebarsSettings() {
    const { sidebarsStatus } = this.state;
    return SIDEBARS_STATUS_MAPPING[sidebarsStatus];
  }

  renderLeftSidebar() {
    const { title, mainTabsContent } = this.props;
    const { complaintOrigin } = this.state;

    if (this.sidebarsSettings().showLeftSidebar) {
      return (
        <div className='left-section'>
          { mainTabsContent }
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
          <div className='complaint-origin'>
            <div className='complaint-origin-label'>
              Complaint Origin
            </div>
            {
              COMPLAINT_ORIGIN_VALUES.map(complaintOriginValue => {
                const uniqKey = `complaint-origin-${complaintOriginValue.toLowerCase()}`;
                return (
                  <div
                    className={
                      cx('complaint-origin-option-container', uniqKey)
                    }
                    key={ uniqKey }
                  >
                    <a
                      className={
                        cx('complaint-origin-option', { 'selected': complaintOrigin === complaintOriginValue })
                      }
                      onClick={ () => {
                        this.handleSelectComplaintOrigin(complaintOriginValue);
                      } }
                    >
                      { startCase(toLower(complaintOriginValue)) }
                    </a>
                  </div>
                );
              })
            }
          </div>
        </div>
      );
    }
  }

  renderRightSidebar() {
    if (this.sidebarsSettings().showRightSidebar) {
      return (
        <div className='right-section'>
          { this.renderPreviewPane() }
        </div>
      );
    }
  }

  render() {
    const { performResizeGraph } = this.state;
    return (
      <div className={ cx(styles.networkGraph, this.sidebarsSettings().classname) }>
        { this.renderLeftSidebar() }
        <div className='graph-container'>
          <AnimatedSocialGraphContainer
            performResizeGraph={ performResizeGraph }
            customRightControlButton={ this.toggleSidebarsButton() }
            updateSortedOfficerIds={ this.updateSortedOfficerIds }
          />
        </div>
        { this.renderRightSidebar() }
        <div className='clearfix'/>
      </div>
    );
  }
}

NetworkGraph.propTypes = {
  requestSocialGraphNetwork: PropTypes.func,
  requestSocialGraphAllegations: PropTypes.func,
  requestSocialGraphOfficers: PropTypes.func,
  mainTabsContent: PropTypes.node,
  officerIds: PropTypes.string,
  unitId: PropTypes.string,
  pinboardId: PropTypes.string,
  title: PropTypes.string,
  changeNetworkTab: PropTypes.func,
  showTimelineTab: PropTypes.bool,
  currentNetworkTab: PropTypes.string,
  selectedOfficerId: PropTypes.number,
  selectedEdge: PropTypes.object,
  updateSelectedOfficerId: PropTypes.func,
  updateSelectedEdge: PropTypes.func,
  location: PropTypes.object,
  networkPreviewPaneData: PropTypes.object,
  onTrackingAttachment: PropTypes.func,
  updateSelectedCrid: PropTypes.func,
  selectedCrid: PropTypes.string,
};

NetworkGraph.defaultProps = {
  requestSocialGraphNetwork: noop,
  requestSocialGraphAllegations: noop,
  requestSocialGraphOfficers: noop,
  updateSelectedOfficerId: noop,
  updateSelectedEdge: noop,
  updateSelectedCrid: noop,
};
