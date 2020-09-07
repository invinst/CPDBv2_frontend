import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import cx from 'classnames';
import { get } from 'lodash';

import ConfiguredRadium from 'utils/configured-radium';
import ComplaintSummariesContainer from 'containers/landing-page/complaint-summaries';
import TopLawsuits from 'containers/landing-page/top-lawsuits';
import SlimHeader from 'components/headers/slim-header';
import FooterContainer from 'containers/footer-container';
import HeatMap from 'containers/landing-page/heat-map';
import RecentActivityContainer from 'containers/landing-page/recent-activity';
import RecentDocumentContainer from 'containers/landing-page/recent-document';
import OfficersByAllegationContainer from 'containers/landing-page/officers-by-allegation';
import styles from './landing-page.sass';
import SearchPageContainer from 'containers/search-page';
import { calculateSlimHeaderPosition, scrollToTop } from 'utils/dom';
import { SEARCH_PATH } from 'utils/constants';


class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.initial = true;
    this.previousSearchPageShowing = null;
  }

  componentDidMount() {
    this.initial = false;
    this.previousSearchPageShowing = this.getSearchPageShowing();
  }

  componentDidUpdate(prevProps, prevState) {
    const searchPageShowing = this.getSearchPageShowing();
    if (this.previousSearchPageShowing !== searchPageShowing) {
      scrollToTop();
      this.previousSearchPageShowing = searchPageShowing;
    }
  }

  getSearchPageShowing() {
    const pathname = get(this.props, 'location.pathname');

    if (pathname === `${SEARCH_PATH}` || pathname === `/edit${SEARCH_PATH}`)
      return true;
    if (pathname === '/' || pathname === '/edit/')
      return false;
    else
      return this.previousSearchPageShowing;
  }

  render() {
    const pathname = get(this.props, 'location.pathname', '');
    const position = calculateSlimHeaderPosition();
    const searchPageShowing = this.getSearchPageShowing();

    return (
      <React.Fragment>
        <Helmet>
          <title>CPDP</title>
        </Helmet>
        <div
          className={
            cx(styles.landingPage, {
              'animation-in': !this.initial && !searchPageShowing && this.previousSearchPageShowing,
              hide: searchPageShowing,
            })
          }>
          <SlimHeader pathname={ pathname }/>
          { searchPageShowing || <HeatMap /> }
          <div className='landing-page-carousel-wrapper'>
            <TopLawsuits className='landing-page-carousel top-lawsuit' pathname={ pathname } />
            <OfficersByAllegationContainer className='landing-page-carousel' pathname={ pathname }/>
            <RecentActivityContainer className='landing-page-carousel' pathname={ pathname }/>
            <RecentDocumentContainer className='landing-page-carousel' pathname={ pathname }/>
            <ComplaintSummariesContainer className='landing-page-carousel' pathname={ pathname }/>
          </div>
          <FooterContainer/>
        </div>
        <SearchPageContainer
          hide={ !searchPageShowing }
          position={ position }
          animationIn={ !this.initial && searchPageShowing && !this.previousSearchPageShowing }
        />
      </React.Fragment>
    );
  }
}

LandingPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  params: PropTypes.object,
};

export default ConfiguredRadium(LandingPage);
