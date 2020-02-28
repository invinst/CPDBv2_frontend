import PropTypes from 'prop-types';
import React from 'react';

import CrawlersTable from './crawlers-table';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import LinkHeaderButton from 'components/headers/shareable-header/link-header-button';


export default function CrawlersPage(props) {
  const { crawlers, requestCrawlers, nextParams, openLogFileModal } = props;

  return (
    <div>
      <ShareableHeaderContainer
        headerButtons={
          <LinkHeaderButton buttonText='Documents' to='/documents/' />
        }
      />
      <CrawlersTable
        rows={ crawlers }
        nextParams={ nextParams }
        requestCrawlers={ requestCrawlers }
        openLogFileModal={ openLogFileModal }
      />
    </div>
  );
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

