import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import cx from 'classnames';
import { get } from 'lodash';
import Scroll from 'react-scroll';

import ConfiguredRadium from 'utils/configured-radium';
// import ComplaintSummariesContainer from 'containers/landing-page/complaint-summaries';
import TopLawsuits from 'containers/landing-page/top-lawsuits';
import SlimHeader from 'components/headers/slim-header';
import FooterContainer from 'containers/footer-container';
//import PopupContainer from 'containers/popup-container';
import ModalPopup from '../popup/popup';
import HeatMap from 'containers/landing-page/heat-map';
// import RecentActivityContainer from 'containers/landing-page/recent-activity';
import RecentDocumentContainer from 'containers/landing-page/recent-document';
import OfficersByAllegationContainer from 'containers/landing-page/officers-by-allegation';
import styles from './landing-page.sass';
import SearchPageContainer from 'containers/search-page';
import { animatedScrollTo, calculateSlimHeaderPosition, scrollToTop } from 'utils/dom';
import { HEADER_HEIGHT, SEARCH_PATH } from 'utils/constants';

const ScrollElement = Scroll.Element;

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.initial = true;
    this.previousSearchPageShowing = null;
    this.scrollToTopLawsuit = this.scrollToTopLawsuit.bind(this);
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

  scrollToTopLawsuit() {
    animatedScrollTo('topLawsuits', { offset: -HEADER_HEIGHT });
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

  state = {
    show: true,
  };
  showModal = e => {
    this.setState({
      show: !this.state.show,
    });
  };

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
          { searchPageShowing || <HeatMap scrollToTopLawsuit={ this.scrollToTopLawsuit }/> }
          <div className='landing-page-carousel-wrapper'>
            <ScrollElement name='topLawsuits'>
              <TopLawsuits className='landing-page-carousel top-lawsuit' pathname={ pathname } />
            </ScrollElement>
            <OfficersByAllegationContainer className='landing-page-carousel' pathname={ pathname }/>
            {/* <RecentActivityContainer className='landing-page-carousel' pathname={ pathname }/> */}
            <RecentDocumentContainer className='landing-page-carousel' pathname={ pathname }/>
            {/* <ComplaintSummariesContainer className='landing-page-carousel' pathname={ pathname }/> */}
          </div>
          <FooterContainer />
        </div>
        <SearchPageContainer
          hide={ !searchPageShowing }
          position={ position }
          animationIn={ !this.initial && searchPageShowing && !this.previousSearchPageShowing }
        />
        <ModalPopup onClose={ this.showModal } show={ this.state.show } >
          <h4><a href='https://cpdp.co/' target='_blank'>CPDP.co</a> is built and maintained
           by the Invisible Institute, a journalism nonprofit
           based on the South Side of Chicago.</h4>
          <h4>Visit our <a href='https://invisible.institute/' target='_blank'>website</a> to learn
            more about our work, including our <a href='https://invisible.institute/all-investigations' target='_blank'>
			investigations</a> into police
            misconduct, our award-winning <a href='https://invisible.institute/somebody-podcast'
            target='_blank'>podcasts</a>, and our <a href='https://chicagopolicetorturearchive.com/'
            target='_blank'>archive</a> of documents
            related to police torture in Chicago. Subscribe to
            our monthly newsletter, <em>View from the Ground</em>,
            for updates and developments in our work.</h4>
        </ModalPopup>
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
