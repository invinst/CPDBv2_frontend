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


class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.showSearchTerm = this.showSearchTerm.bind(this);
    this.state = {
      searchPageShowing: false,
    };
  }

  componentDidMount() {
    this.props.resetBreadcrumbs({
      breadcrumbs: [],
    });
  }

  showSearchTerm(showing) {
    this.setState({
      searchPageShowing: showing,
    });
  }

  renderWithResponsiveStyle(style) {
    const { pathname } = this.props;
    const { searchPageShowing } = this.state;
    return (
      <div>
        <div className={ cx(styles.landingPage, { hide: searchPageShowing }) }>
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
          className={ cx(styles.searchPage, { hide: !searchPageShowing, animation: searchPageShowing }) }
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
  pathname: PropTypes.string,
};

LandingPage.contextTypes = {
  editModeOn: PropTypes.bool,
};

export default ConfiguredRadium(LandingPage);

