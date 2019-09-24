import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import cx from 'classnames';
import TrackVisibility from 'react-on-screen';
import { isEmpty, noop } from 'lodash';

import responsiveContainerStyles from 'components/common/responsive-container.sass';
import SearchBar from './search-bar';
import Header from './header';
import styles from './pinboard-page.sass';
import PinboardInfoContainer from 'containers/pinboard-page/pinboard-info';
import { PinboardPaneSectionWithSpinner } from 'components/pinboard-page/pinboard-pane-section';
import RelevantSectionContainer from 'containers/pinboard-page/relevant-section';
import PinnedOfficersContainer from 'containers/pinboard-page/pinned-officers';
import PinnedCRsContainer from 'containers/pinboard-page/pinned-crs';
import PinnedTRRsContainer from 'containers/pinboard-page/pinned-trrs';
import FooterContainer from 'containers/footer-container';
import PinboardsContainer from 'containers/pinboard-page/pinboards-container';
import EmptyPinboardContainer from 'containers/pinboard-page/empty-pinboard';
import { PreviewPaneWithOverlay } from 'components/search-page/search-results/preview-pane';
import ManagePinboardsButtons from 'components/pinboard-page/manage-pinboards-buttons';


export default class PinboardPage extends Component {
  constructor(props) {
    super(props);

    this.handleOverlayClick = this.handleOverlayClick.bind(this);
    this.handlePinChangedOnPreviewPane = this.handlePinChangedOnPreviewPane.bind(this);
  }

  componentDidMount() {
    const { location, params, routes, pushBreadcrumbs } = this.props;
    pushBreadcrumbs({ location, params, routes });
    document.body.classList.add('body-fixed-viewport');
  }

  componentDidUpdate(prevProps) {
    const { pinboard } = prevProps;
    const { pinboard: currentPinboard, shouldRedirect, updatePathName } = this.props;

    if (currentPinboard.url !== '') {
      if (shouldRedirect && pinboard.id !== currentPinboard.id) {
        browserHistory.replace(currentPinboard.url);
      } else if (currentPinboard.url !== pinboard.url) {
        updatePathName(currentPinboard.url);
      }
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('body-fixed-viewport');
    document.body.classList.remove('body-not-scrollable');
  }

  handleOverlayClick() {
    this.props.focusItem({});
  }

  handlePinChangedOnPreviewPane(item) {
    const {
      focusItem,
      addOrRemoveItemInPinboardFromPreviewPane,
    } = this.props;

    focusItem({});
    addOrRemoveItemInPinboardFromPreviewPane(item);
  }

  renderPreviewPane() {
    const { focusedItem } = this.props;

    return (
      <PreviewPaneWithOverlay
        isShown={ !isEmpty(focusedItem) }
        handleClose={ this.handleOverlayClick }
        customClass='preview-pane'
        yScrollable={ true }
        addOrRemoveItemInPinboard={ this.handlePinChangedOnPreviewPane }
        { ...focusedItem }
      />
    );
  }

  renderContent() {
    const {
      changePinboardTab,
      currentTab,
      hasMapMarker,
      isEmptyPinboard,
      requesting,
    } = this.props;

    if (isEmptyPinboard) {
      return (
        <EmptyPinboardContainer />
      );
    }

    return (
      <div>
        <div className={ cx(responsiveContainerStyles.responsiveContainer, 'pinboard-page') }>
          <PinboardInfoContainer />
          <div className='data-visualizations'>
            <TrackVisibility partialVisibility={ true }>
              <PinboardPaneSectionWithSpinner
                changePinboardTab={ changePinboardTab }
                currentTab={ currentTab }
                hasMapMarker={ hasMapMarker }
                requesting={ requesting }
              />
            </TrackVisibility>
          </div>
          <div className='pinned-section'>
            <PinnedOfficersContainer/>
            <PinnedCRsContainer/>
            <PinnedTRRsContainer/>
          </div>
        </div>
        <RelevantSectionContainer />
        { this.renderPreviewPane() }
      </div>
    );
  }

  render() {
    const { initialRequested, isEmptyPinboard, showPinboardsList } = this.props;

    if (!initialRequested) {
      return null;
    }

    return (
      <div className={ cx(styles.pinboardPage, { 'empty': isEmptyPinboard } ) }>
        <div className='pinboard-header'>
          <Header />
          <SearchBar
            shareable={ !isEmptyPinboard }
            customButtons={ <ManagePinboardsButtons showPinboardsList={ showPinboardsList }/> }
          />
        </div>
        { this.renderContent() }
        { <PinboardsContainer /> }
        <FooterContainer className='footer' />
      </div>
    );
  }
}

PinboardPage.propTypes = {
  pinboard: PropTypes.object,
  params: PropTypes.object,
  changePinboardTab: PropTypes.func,
  currentTab: PropTypes.string,
  hasMapMarker: PropTypes.bool,
  shouldRedirect: PropTypes.bool,
  initialRequested: PropTypes.bool,
  isEmptyPinboard: PropTypes.bool,
  focusedItem: PropTypes.object,
  focusItem: PropTypes.func,
  routes: PropTypes.array,
  pushBreadcrumbs: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  updatePathName: PropTypes.func,
  addOrRemoveItemInPinboardFromPreviewPane: PropTypes.func,
  requesting: PropTypes.bool,
  showPinboardsList: PropTypes.func,
};

PinboardPage.defaultProps = {
  focusedItem: {},
  focusItem: noop,
  pushBreadcrumbs: noop,
  addOrRemoveItemInPinboardFromPreviewPane: noop,
  showPinboardsList: noop,
};
