import { connect } from 'react-redux';

import CrawlersPage from 'components/crawlers-page';
import { crawlersSelector, nextParamsSelector } from 'selectors/crawlers-page';
import { requestCrawlers } from 'actions/crawlers-page';
import { openLogFileModal } from 'actions/generic-modal';

function mapStateToProps(state, ownProps) {
  return {
    crawlers: crawlersSelector(state),
    nextParams: nextParamsSelector(state),
  };
}

const mapDispatchToProps = {
  requestCrawlers,
  openLogFileModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(CrawlersPage);
