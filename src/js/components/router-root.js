import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import LandingPageContainer from 'containers/landing-page';
import CollaborationPage from 'components/collaboration-page/collaboration-page';
import SearchPageContainer from 'containers/search-page';
import OfficerPageContainer from 'containers/officer-page';
import UnitProfilePageContainer from 'containers/unit-profile-page';
import CRPageContainer from 'containers/cr-page';
import LawsuitPageContainer from 'containers/lawsuit-page';
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
import QuestionsPage from 'components/questions-page/questions-page';
import ComplaintProcessPage from 'components/questions-page/complaint-process-page/complaint-process-page';
import ComplaintInvestigatePage from 'components/questions-page/complaint-process-page/complaint-articles/complaint-investigate-page';
import FileComplaintArticlePage from 'components/questions-page/complaint-process-page/complaint-articles/file-complaint-page';
import ImperfectInfoPage from 'components/questions-page/complaint-process-page/complaint-articles/imperfect-info-page';
import {
  COLLAB_PATH,
  SEARCH_PATH,
  OFFICER_PATH,
  TTR_PATH,
  UNIT_PROFILE_PATH,
  SEARCH_ALIAS_EDIT_PATH,
  INLINE_SEARCH_ALIAS_ADMIN_PATH,
  STANDALONE_CR_PATH,
  LAWSUIT_PATH,
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
  QUESTIONS_PATH,
  COMPLAINT_PROCESS_PATH,
  COMPLAINT_INVESTIGATE_PATH,
  FILE_COMPLAINT_ARTICLE_PATH,
  IMPERFECT_INFO_ARTICLE_PATH,
} from 'utils/constants';
import { isPinboardFeatureEnabled } from 'utils/pinboard';
import { editRouterPath } from 'utils/router-path';


export default function RouterRoot(props) {
  const enablePinboardFeature = isPinboardFeatureEnabled();
  const { location } = props;

  return (
    <Switch location={ location }>
      <Route
        exact={ true }
        path={ editRouterPath('/') }
        component={ LandingPageContainer } />
      <Route
        path={ editRouterPath(COLLAB_PATH) }
        component={ CollaborationPage } />
      <Route
        path={ editRouterPath(OFFICER_PATH) }
        component={ OfficerPageContainer } />
      <Route
        exact={ true }
        path={ editRouterPath(SEARCH_PATH) }
        component={ LandingPageContainer } />
      <Route
        path={ editRouterPath(STANDALONE_CR_PATH) }
        component={ CRPageContainer } />
      <Route
        path={ editRouterPath(QUESTIONS_PATH) }
        component={ QuestionsPage } />
      <Route
        path={ editRouterPath(COMPLAINT_PROCESS_PATH) }
        component={ ComplaintProcessPage } />
      <Route
        path={ editRouterPath(COMPLAINT_INVESTIGATE_PATH) }
        component={ ComplaintInvestigatePage } />
      <Route
        path={ editRouterPath(FILE_COMPLAINT_ARTICLE_PATH) }
        component={ FileComplaintArticlePage } />
      <Route
        path={ editRouterPath(IMPERFECT_INFO_ARTICLE_PATH) }
        component={ ImperfectInfoPage } />
      <Route
        path={ editRouterPath(LAWSUIT_PATH) }
        component={ LawsuitPageContainer } />
      <Route
        path={ editRouterPath(DOCUMENT_PATH) }
        component={ DocumentPageContainer } />
      <Route
        path={ editRouterPath(TTR_PATH) }
        component={ TRRPageContainer } />
      <Route
        path={ editRouterPath(UNIT_PROFILE_PATH) }
        component={ UnitProfilePageContainer } />
      <Route
        exact={ true }
        path={ editRouterPath(SEARCH_ALIAS_EDIT_PATH) }
        component={ SearchPageContainer }/>
      <Route
        path={ editRouterPath(INLINE_SEARCH_ALIAS_ADMIN_PATH) }
        component={ InlineAliasAdminContainer }/>
      <Route
        path={ editRouterPath(CRAWLERS_PATH) }
        component={ CrawlersContainer } />
      <Route
        path={ editRouterPath(EMBED_MAP_PATH) }
        component={ HeatMapContainer }/>
      <Route
        path={ editRouterPath(EMBED_TOP_OFFICERS_PATH) }
        component={ EmbedTopOfficersPage }/>
      <Route
        path={ editRouterPath(EMBED_OFFICERS_PATH) }
        component={ EmbedOfficersContainer }/>
      <Route
        exact={ true }
        path={ editRouterPath(TRACKER_ALL_DOCUMENTS_PATH) }
        component={ DocumentDeduplicatorContainer } />
      <Route
        exact={ true }
        path={ [
          editRouterPath(DATA_VISUALIZATION_SOCIAL_GRAPH_PATH),
          editRouterPath(PINBOARD_DATA_VISUALIZATION_SOCIAL_GRAPH_PATH),
        ] }
        component={ SocialGraphContainer }/>
      <Route
        exact={ true }
        path={ [
          editRouterPath(DATA_VISUALIZATION_GEOGRAPHIC_PATH),
          editRouterPath(PINBOARD_DATA_VISUALIZATION_GEOGRAPHIC_PATH),
        ] }
        component={ SocialGraphContainer }/>
      <Route
        path={ editRouterPath(TRACKER_DOCUMENTS_OVERVIEW_PATH) }
        component={ DocumentsOverviewContainer } />
      {
        enablePinboardFeature &&
        <Route
          path={ editRouterPath(PINBOARD_PATH) }
          component={ PinboardPageContainer } />
      }
      {
        enablePinboardFeature &&
        <Route
          path={ editRouterPath(PINBOARD_ADMIN_PATH) }
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
