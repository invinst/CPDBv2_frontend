import React, { Component, PropTypes } from 'react';

import CrawlersTable from './crawlers-table';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';

export default class CrawlersPage extends Component {
  render() {
    const { crawlers, requestCrawlers, nextParams } = this.props;

    return (
      <div>
        <ShareableHeaderContainer/>
        <CrawlersTable
          rows={ crawlers } nextParams={ nextParams } requestCrawlers={ requestCrawlers }/>
      </div>
    );
  }
}

CrawlersPage.propTypes = {
  crawlers: PropTypes.array,
  nextParams: PropTypes.object,
  requestCrawlers: PropTypes.func
};

CrawlersPage.defaultProps = {
  crawlers: [],
};

