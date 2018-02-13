import { connect } from 'react-redux';
import { cardsSelector } from 'selectors/landing-page/complaint-summaries';
import { getComplaintSummaries } from 'actions/landing-page/complaint-summaries';
import ComplaintSummaries from 'components/landing-page/complaint-summaries';


function mapStateToProps(state, ownProps) {
  return {
    cards: cardsSelector(state)
  };
}

const mapDispatchToProps = {
  getComplaintSummaries
};

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintSummaries);
