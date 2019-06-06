import { connect } from 'react-redux';

import RelevantCoaccusals from 'components/pinboard-page/relevant/relevant-coaccusals';
import {
  relevantCoaccusalsSelector,
  relevantCoaccusalsNextParamsSelector,
  relevantCoaccusalsHasMoreSelector
} from 'selectors/pinboard-page/relevant-coaccusals';
import { fetchPinboardRelevantCoaccusals, addItemInPinboardPage } from 'actions/pinboard';
import { getPinboardID } from 'utils/location';
import { focusItem } from 'actions/pinboard-page';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    pinboardId: getPinboardID(state.pathname),
    coaccusals: relevantCoaccusalsSelector(state, ownProps),
    hasMore: relevantCoaccusalsHasMoreSelector(state, ownProps),
    nextParams: relevantCoaccusalsNextParamsSelector(state, ownProps),
  };
}

const mapDispatchToProps = {
  fetchPinboardRelevantCoaccusals,
  addItemInPinboardPage,
  focusItem,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RelevantCoaccusals);
