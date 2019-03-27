import React, { Component, PropTypes } from 'react';

import CrawlersTable from './crawlers-table';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import * as constants from 'utils/constants';


export default class CrawlersPage extends Component {
  render() {
    const { crawlers, requestCrawlers, nextParams, openLogFileModal } = this.props;

    return (
      <div>
        <ShareableHeaderContainer
          buttonType={ constants.SHAREABLE_HEADER_BUTTON_TYPE.LINK }
          buttonText='Documents'
          to='/documents/' />
        <CrawlersTable
          rows={ crawlers }
          nextParams={ nextParams }
          requestCrawlers={ requestCrawlers }
          openLogFileModal={ openLogFileModal }
        />
      </div>
    );
  }
}

CrawlersPage.propTypes = {
  crawlers: PropTypes.array,
  nextParams: PropTypes.object,
  requestCrawlers: PropTypes.func,
  openLogFileModal: PropTypes.func,
};

CrawlersPage.defaultProps = {
  crawlers: [],
};

