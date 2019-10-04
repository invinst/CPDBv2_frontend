import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import cx from 'classnames';
import { isEmpty, noop } from 'lodash';

import responsiveContainerStyles from 'components/common/responsive-container.sass';
import SearchBar from './search-bar';
import Header from './header';
import styles from './pinboard-page.sass';
import PinboardInfoContainer from 'containers/pinboard-page/pinboard-info';
import RelevantSectionContainer from 'containers/pinboard-page/relevant-section';
import PinnedOfficersContainer from 'containers/pinboard-page/pinned-officers';
import PinnedCRsContainer from 'containers/pinboard-page/pinned-crs';
import PinnedTRRsContainer from 'containers/pinboard-page/pinned-trrs';
import FooterContainer from 'containers/footer-container';
import EmptyPinboardContainer from 'containers/pinboard-page/empty-pinboard';
import PreviewPane from 'components/search-page/search-results/preview-pane';
import PinboardDataVisualization from 'components/pinboard-page/pinboard-data-visualization';


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

  componentWillReceiveProps(nextProps) {
    if (isEmpty(nextProps.focusedItem)) {
      document.body.classList.remove('body-not-scrollable');
      document.body.classList.add('body-scrollable');
    } else {
      document.body.classList.add('body-not-scrollable');
      document.body.classList.remove('body-scrollable');
    }
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

  renderContent() {
    const {
      pinboard,
      isEmptyPinboard,
      focusedItem,
      hasMapMarker,
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
          <PinboardDataVisualization pinboard={ pinboard } hasMapMarker={ hasMapMarker }/>
          <div className='pinned-section'>
            <PinnedOfficersContainer/>
            <PinnedCRsContainer/>
            <PinnedTRRsContainer/>
          </div>
        </div>
        <RelevantSectionContainer />

        <div
          className='overlay'
          aria-hidden={ isEmpty(focusedItem) }
          onClick={ this.handleOverlayClick }
        />

        <PreviewPane
          customClass='preview-pane'
          yScrollable={ true }
          addOrRemoveItemInPinboard={ this.handlePinChangedOnPreviewPane }
          { ...focusedItem }
        />
      </div>
    );
  }

  render() {
    const { initialRequested, isEmptyPinboard } = this.props;

    if (!initialRequested) {
      return null;
    }

    return (
      <div className={ cx(styles.pinboardPage, { 'empty': isEmptyPinboard } ) }>
        <div className='pinboard-header'>
          <Header />
          <SearchBar shareable={ !isEmptyPinboard }/>
        </div>
        { this.renderContent() }
        <FooterContainer className='footer' />
      </div>
    );
  }
}

PinboardPage.propTypes = {
  pinboard: PropTypes.object,
  params: PropTypes.object,
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
};

PinboardPage.defaultProps = {
  focusedItem: {},
  focusItem: noop,
  pushBreadcrumbs: noop,
  addOrRemoveItemInPinboardFromPreviewPane: noop,
};
