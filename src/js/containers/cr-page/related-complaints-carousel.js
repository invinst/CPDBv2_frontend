import { connect } from 'react-redux';

import CarouselWrapper from 'components/cr-page/related-complaints/carousel-wrapper';
import { cardSelector, countSelector } from 'selectors/cr-page/related-complaints';
import { fetchRelatedComplaints } from 'actions/cr-page/related-complaints';


function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    cards: cardSelector(state, ownProps),
    count: countSelector(state, ownProps)
  };
}

const mapDispatchToProps = {
  fetchRelatedComplaints: fetchRelatedComplaints
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarouselWrapper);
