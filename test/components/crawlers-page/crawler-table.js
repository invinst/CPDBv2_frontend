import React from 'react';
import { stub } from 'sinon';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';
import InfiniteScroll from 'react-infinite-scroller';

import CrawlerTable from 'components/crawlers-page/crawlers-table';
import CrawlerRow from 'components/crawlers-page/crawler-row';
import { unmountComponentSuppressError } from 'utils/test';


describe('CrawlerTable component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render crawler table correctly', function () {
    const requestCrawlersStub = stub();
    const rows = [{
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
    }];
    const nextParams = { limit: '20', offset: '20' };
    instance = renderIntoDocument(
      <CrawlerTable
        rows={ rows }
        requestCrawlers={ requestCrawlersStub }
        nextParams={ nextParams }
      />
    );

    const crawlerNameHeader = findRenderedDOMComponentWithClass(instance, 'header-col crawler-header');
    const recentRunAtHeader = scryRenderedDOMComponentsWithClass(instance, 'header-col')[1];
    const numNewDocumentsHeader = scryRenderedDOMComponentsWithClass(instance, 'header-col')[2];
    const numDocumentsHeader = scryRenderedDOMComponentsWithClass(instance, 'header-col')[3];

    crawlerNameHeader.textContent.should.eql('Crawler');
    recentRunAtHeader.textContent.should.eql('Recent Run');
    numNewDocumentsHeader.textContent.should.eql('New Documents');
    numDocumentsHeader.textContent.should.eql('Total Documents');

    const infiniteScroll = findRenderedComponentWithType(instance, InfiniteScroll);
    infiniteScroll.props.initialLoad.should.be.false();
    infiniteScroll.props.hasMore.should.be.true();
    infiniteScroll.props.useWindow.should.be.true();
    infiniteScroll.props.children.should.have.length(2);
    scryRenderedComponentsWithType(instance, CrawlerRow).should.have.length(2);
  });

  it('should load more on scroll to bottom', function () {
    const rows = [{
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
    }];
    const nextParams = {
      limit: 1,
      offset: 1,
    };

    const requestCrawlersStub = stub().returns({ catch: stub() });

    instance = renderIntoDocument(
      <CrawlerTable
        rows={ rows }
        hasMore={ true }
        nextParams={ nextParams }
        requestCrawlers={ requestCrawlersStub }/>
    );
    findRenderedComponentWithType(instance, InfiniteScroll).props.loadMore();
    requestCrawlersStub.calledWith(nextParams).should.be.true();
  });

});
