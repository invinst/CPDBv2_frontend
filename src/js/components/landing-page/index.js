import React, { Component, PropTypes } from 'react';
import DocumentMeta from 'react-document-meta';
import cx from 'classnames';

import ResponsiveStyleComponent from 'components/responsive/responsive-style-component';
import ConfiguredRadium from 'utils/configured-radium';

import ComplaintSummariesContainer from 'containers/landing-page/complaint-summaries';
import SlimHeader from 'components/headers/slim-header';
import FooterContainer from 'containers/footer-container';
import HeatMap from 'containers/landing-page/heat-map';
import RecentActivityContainer from 'containers/landing-page/recent-activity';
import RecentDocumentContainer from 'containers/landing-page/recent-document';
import OfficersByAllegationContainer from 'containers/landing-page/officers-by-allegation';
import styles from './landing-page.sass';
import SearchPageContainer from 'containers/search-page';
import { scrollToTop } from 'utils/dom';


class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.showSearchTerm = this.showSearchTerm.bind(this);
    this.state = {
      initial: true,
      searchPageShowing: false,
    };
  }

  componentDidMount() {
    const { resetBreadcrumbs } = this.props;
    const { pathname } = this.props.location;

    if (pathname.match(/search/)) {
      this.showSearchTerm(true, true);
    } else {
      resetBreadcrumbs({ breadcrumbs: [] });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchPageShowing !== this.state.searchPageShowing) {
      scrollToTop();
    }
  }

  showSearchTerm(showing, initial=false) {
    const { pushBreadcrumbs, resetBreadcrumbs, params, routes } = this.props;
    this.setState({
      initial: initial,
      searchPageShowing: showing,
    });

    if (showing) {
      history.replaceState({}, '', '/search/');
      const searchLocations = { pathname: '/search/' };
      const searchRoutes = [
        routes[0], {
          breadcrumb: 'Search',
          breadcrumbKey: 'search/',
        }];
      pushBreadcrumbs({ location: searchLocations, params, routes: searchRoutes });
    } else {
      history.replaceState({}, '', '/');
      resetBreadcrumbs({ breadcrumbs: [] });
    }
  }

  renderWithResponsiveStyle(style) {
    const { pathname } = this.props.location;
    const { searchPageShowing, initial } = this.state;
    return (
      <div>
        <div
          className={
            cx(styles.landingPage, {
              'animation-in': !initial && !searchPageShowing,
              hide: searchPageShowing,
            })
          }>
          <SlimHeader pathname={ pathname } onSearchBoxClick={ () => this.showSearchTerm(true) }/>
          <HeatMap/>
          <div className='landing-page-carousel-wrapper'>
            <OfficersByAllegationContainer className='landing-page-carousel' pathname={ pathname }/>
            <RecentActivityContainer className='landing-page-carousel' pathname={ pathname }/>
            <RecentDocumentContainer className='landing-page-carousel' pathname={ pathname }/>
            <ComplaintSummariesContainer className='landing-page-carousel' pathname={ pathname }/>
          </div>
          <FooterContainer/>
        </div>
        <SearchPageContainer
          className={
            cx(styles.searchPage, {
              'animation-in': !initial && searchPageShowing,
              initial,
              hide: !searchPageShowing,
            })
          }
          onCancel={ () => this.showSearchTerm(false) }
        />
      </div>
    );
  }

  render() {
    return (
      <DocumentMeta title='CPDP'>
        <ResponsiveStyleComponent responsiveStyle={ {} }>
          { this.renderWithResponsiveStyle.bind(this) }
        </ResponsiveStyleComponent>
      </DocumentMeta>
    );
  }
}

LandingPage.propTypes = {
  resetBreadcrumbs: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  params: PropTypes.object,
  routes: PropTypes.array,
  pushBreadcrumbs: PropTypes.func,
};

LandingPage.defaultProps = {
  pushBreadcrumbs: (...args) => {},
};

LandingPage.contextTypes = {
  editModeOn: PropTypes.bool,
};

export default ConfiguredRadium(LandingPage);

