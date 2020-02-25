import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { createStore as ReduxCreateStore } from 'redux';
import { Provider } from 'react-redux';
import { stub } from 'sinon';

import App from 'containers/app-container';
import NetworkGraph from 'components/social-graph-page/network';
import EmbedOfficers from 'components/embed/officers';
import LandingPageContainer from 'containers/landing-page';
import CollaborationPage from 'components/collaboration-page/collaboration-page';
import SearchPageContainer from 'containers/search-page';
import OfficerPageContainer from 'containers/officer-page';
import UnitProfilePageContainer from 'containers/unit-profile-page';
import CRPageContainer from 'containers/cr-page';
import TRRPageContainer from 'containers/trr-page';
import DocumentPageContainer from 'containers/document-page';
import InlineAliasAdminContainer from 'containers/inline-alias-admin-container';
import CrawlersContainer from 'containers/crawlers-page';
import HeatMapContainer from 'containers/embeddable-heat-map';
import EmbedTopOfficersPage from 'components/landing-page/embed/top-officers-page';
import EmbedOfficersContainer from 'containers/embed/officers';
import DocumentDeduplicatorContainer from 'containers/document-deduplicator-page';
import DocumentsOverviewContainer from 'containers/documents-overview-page';
import SocialGraphContainer from 'containers/social-graph-page';
import PinboardPageContainer from 'containers/pinboard-page';
import PinboardAdminPageContainer from 'containers/pinboard-admin-page';
import RootReducer from 'reducers/root-reducer';
import browserHistory from 'utils/history';


const renderRouter = (initialEntry) => {
  const store = ReduxCreateStore(RootReducer(browserHistory));
  return mount(
    <Provider store={ store }>
      <MemoryRouter initialEntries={ [initialEntry] } initialIndex={ 0 }>
        <App location={ initialEntry }/>
      </MemoryRouter>
    </Provider>
  );
};

describe('RouterRoot component', function () {
  it('should render LandingPageContainer', function () {
    renderRouter('/').find(LandingPageContainer).exists().should.be.true();
  });

  it('should render CollaborationPage', function () {
    renderRouter('/collaborate').find(CollaborationPage).exists().should.be.true();
  });

  it('should render SearchPageContainer', function () {
    renderRouter('/search/alias').find(SearchPageContainer).exists().should.be.true();
  });

  it('should render OfficerPageContainer', function () {
    renderRouter('/officer/1/').find(OfficerPageContainer).exists().should.be.true();
  });

  it('should render UnitProfilePageContainer', function () {
    renderRouter('/unit/1/').find(UnitProfilePageContainer).exists().should.be.true();
  });

  it('should render CRPageContainer', function () {
    renderRouter('/complaint/1/').find(CRPageContainer).exists().should.be.true();
  });

  it('should render TRRPageContainer', function () {
    renderRouter('/trr/1/').find(TRRPageContainer).exists().should.be.true();
  });

  it('should render DocumentPageContainer', function () {
    renderRouter('/document/1/').find(DocumentPageContainer).exists().should.be.true();
  });

  it('should render InlineAliasAdminContainer', function () {
    renderRouter('/search/alias/form/').find(InlineAliasAdminContainer).exists().should.be.true();
  });

  it('should render CrawlersContainer', function () {
    renderRouter('/crawlers').find(CrawlersContainer).exists().should.be.true();
  });

  it('should render HeatMapContainer', function () {
    renderRouter('/embed/map/').find(HeatMapContainer).exists().should.be.true();
  });

  it('should render EmbedTopOfficersPage', function () {
    renderRouter('/embed/top-officers-page').find(EmbedTopOfficersPage).exists().should.be.true();
  });

  it('should render EmbedOfficersContainer', function () {
    stub(EmbedOfficers.prototype, 'componentDidMount');
    renderRouter('/embed/officers?ids=1').find(EmbedOfficersContainer).exists().should.be.true();
  });

  it('should render DocumentDeduplicatorContainer', function () {
    renderRouter('/documents/crid/1').find(DocumentDeduplicatorContainer).exists().should.be.true();
  });

  it('should render SocialGraphContainer', function () {
    stub(NetworkGraph.prototype, 'fetchGraphData');
    renderRouter('/social-graph/').find(SocialGraphContainer).exists().should.be.true();
    renderRouter('/social-graph/pinboard/1').find(SocialGraphContainer).exists().should.be.true();
  });

  it('should render DocumentsOverviewContainer', function () {
    renderRouter('/documents/').find(DocumentsOverviewContainer).exists().should.be.true();
  });

  it('should render PinboardPageContainer', function () {
    renderRouter('/pinboard/1/title').find(PinboardPageContainer).exists().should.be.true();
  });

  it('should render PinboardAdminPage', function () {
    renderRouter('/view-all-pinboards').find(PinboardAdminPageContainer).exists().should.be.true();
  });
});
