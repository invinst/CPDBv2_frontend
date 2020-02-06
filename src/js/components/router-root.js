import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import PropTypes from 'prop-types';

import config from 'config';
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
import {
  COLLAB_PATH,
  SEARCH_PATH,
  OFFICER_PATH,
  TTR_PATH,
  UNIT_PROFILE_PATH,
  SEARCH_ALIAS_EDIT_PATH,
  INLINE_SEARCH_ALIAS_ADMIN_PATH,
  STANDALONE_CR_PATH,
  CRAWLERS_PATH,
  DOCUMENT_PATH,
  EMBED_MAP_PATH,
  EMBED_TOP_OFFICERS_PATH,
  EMBED_OFFICERS_PATH,
  TRACKER_ALL_DOCUMENTS_PATH,
  TRACKER_DOCUMENTS_OVERVIEW_PATH,
  DATA_VISUALIZATION_SOCIAL_GRAPH_PATH,
  DATA_VISUALIZATION_GEOGRAPHIC_PATH,
  PINBOARD_DATA_VISUALIZATION_SOCIAL_GRAPH_PATH,
  PINBOARD_DATA_VISUALIZATION_GEOGRAPHIC_PATH,
  PINBOARD_PATH,
  PINBOARD_ADMIN_PATH,
} from 'utils/constants';
import { editPath } from 'utils/url';


export default function RouterRoot(props) {
  const { pinboard: enablePinboardFeature } = config.enableFeatures;
  const { location } = props;

  return (
    <Switch location={ location }>
      <Route
        exact={ true }
        path={ editPath('/') }
        component={ LandingPageContainer } />
      <Route
        path={ editPath(COLLAB_PATH) }
        component={ CollaborationPage } />
      <Route
        path={ editPath(OFFICER_PATH) }
        component={ OfficerPageContainer } />
      <Route
        exact={ true }
        path={ editPath(SEARCH_PATH) }
        component={ LandingPageContainer } />
      <Route
        path={ editPath(STANDALONE_CR_PATH) }
        component={ CRPageContainer } />
      <Route
        path={ editPath(DOCUMENT_PATH) }
        component={ DocumentPageContainer } />
      <Route
        path={ editPath(TTR_PATH) }
        component={ TRRPageContainer } />
      <Route
        path={ editPath(UNIT_PROFILE_PATH) }
        component={ UnitProfilePageContainer } />
      <Route
        exact={ true }
        path={ editPath(SEARCH_ALIAS_EDIT_PATH) }
        component={ SearchPageContainer }/>
      <Route
        path={ editPath(INLINE_SEARCH_ALIAS_ADMIN_PATH) }
        component={ InlineAliasAdminContainer }/>
      <Route
        path={ editPath(CRAWLERS_PATH) }
        component={ CrawlersContainer } />
      <Route
        path={ editPath(EMBED_MAP_PATH) }
        component={ HeatMapContainer }/>
      <Route
        path={ editPath(EMBED_TOP_OFFICERS_PATH) }
        component={ EmbedTopOfficersPage }/>
      <Route
        path={ editPath(EMBED_OFFICERS_PATH) }
        component={ EmbedOfficersContainer }/>
      <Route
        exact={ true }
        path={ editPath(TRACKER_ALL_DOCUMENTS_PATH) }
        component={ DocumentDeduplicatorContainer } />
      <Route
        exact={ true }
        path={ [
          editPath(DATA_VISUALIZATION_SOCIAL_GRAPH_PATH),
          editPath(PINBOARD_DATA_VISUALIZATION_SOCIAL_GRAPH_PATH),
        ] }
        component={ SocialGraphContainer }/>
      <Route
        exact={ true }
        path={ [
          editPath(DATA_VISUALIZATION_GEOGRAPHIC_PATH),
          editPath(PINBOARD_DATA_VISUALIZATION_GEOGRAPHIC_PATH),
        ] }
        component={ SocialGraphContainer }/>
      <Route
        path={ editPath(TRACKER_DOCUMENTS_OVERVIEW_PATH) }
        component={ DocumentsOverviewContainer } />
      {
        enablePinboardFeature &&
        <Route
          path={ editPath(PINBOARD_PATH) }
          component={ PinboardPageContainer } />
      }
      {
        enablePinboardFeature &&
        <Route
          path={ editPath(PINBOARD_ADMIN_PATH) }
          component={ PinboardAdminPageContainer } />
      }
      <Redirect path='*' to='/'/>
    </Switch>
  );
}

RouterRoot.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string,
  }).isRequired,
};
