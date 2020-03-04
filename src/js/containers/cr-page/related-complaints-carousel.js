import { connect } from 'react-redux';

import CarouselWrapper from 'components/cr-page/related-complaints/carousel-wrapper';
import {
  cardSelector, countSelector, nextParamsSelector, hasMoreSelector,
} from 'selectors/cr-page/related-complaints';
import { fetchRelatedComplaints } from 'actions/cr-page/related-complaints';
import { addOrRemoveItemInPinboard } from 'actions/pinboard';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    cards: cardSelector(state, ownProps),
    hasMore: hasMoreSelector(state, ownProps),
    nextParams: nextParamsSelector(state, ownProps),
    count: countSelector(state, ownProps),
  };
}

const mapDispatchToProps = {
  fetchRelatedComplaints,
  addOrRemoveItemInPinboard,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarouselWrapper);
