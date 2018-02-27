import { connect } from 'react-redux';
import { cardsSelector } from 'selectors/landing-page/recent-document';
import { getRecentDocument } from 'actions/landing-page/recent-document';
import RecentDocument from 'components/landing-page/recent-document';


function mapStateToProps(state, ownProps) {
  return {
    cards: cardsSelector(state)
  };
}

const mapDispatchToProps = {
  getRecentDocument
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentDocument);
