import { connect } from 'react-redux';

import CrawlersPage from 'components/crawlers-page';
import { crawlersSelector, nextParamsSelector } from 'selectors/crawlers-page';
import { requestCrawlers } from 'actions/crawlers-page';

function mapStateToProps(state, ownProps) {
  return {
    crawlers: crawlersSelector(state),
    nextParams: nextParamsSelector(state),
  };
}

const mapDispatchToProps = {
  requestCrawlers
};

export default connect(mapStateToProps, mapDispatchToProps)(CrawlersPage);
