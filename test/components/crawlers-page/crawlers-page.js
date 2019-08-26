import React from 'react';
import { Provider } from 'react-redux';
import { stub } from 'sinon';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import MockStore from 'redux-mock-store';

import CrawlersPage from 'components/crawlers-page';
import CrawlersTable from 'components/crawlers-page/crawlers-table';
import { unmountComponentSuppressError } from 'utils/test';
import ShareableHeader from 'components/headers/shareable-header';


describe('CrawlersPage component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render crawler page correctly', function () {
    const mockStore = MockStore();
    const store = mockStore({
      breadcrumb: {
        breadcrumbs: [],
      },
    });
    const requestCrawlersStub = stub();
    const crawlers = [{
      id: 109,
      crawlerName: 'SUMMARY_REPORTS_COPA',
      numDocuments: 5,
      numNewDocuments: 1,
      recentRunAt: '2019-02-20',
    }, {
      id: 110,
      crawlerName: 'SUMMARY_REPORTS_COPA',
      numDocuments: 7,
      numNewDocuments: 2,
      recentRunAt: '2019-02-20',
    }, {
      id: 111,
      crawlerName: 'PORTAL_COPA',
      numDocuments: 15,
      numNewDocuments: 6,
      recentRunAt: '2019-02-20',
    }];
    const nextParams = { limit: '20', offset: '20' };

    instance = renderIntoDocument(
      <Provider store={ store }>
        <CrawlersPage
          crawlers={ crawlers }
          requestCrawlers={ requestCrawlersStub }
          nextParams={ nextParams }
        />
      </Provider>
    );

    findRenderedComponentWithType(instance, ShareableHeader);
    const crawlersTable = findRenderedComponentWithType(instance, CrawlersTable);
    crawlersTable.props.rows.should.eql(crawlers);
    crawlersTable.props.nextParams.should.eql(nextParams);
    crawlersTable.props.requestCrawlers.should.eql(requestCrawlersStub);
  });
});
