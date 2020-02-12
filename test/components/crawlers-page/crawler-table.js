import React from 'react';
import { shallow } from 'enzyme';
import { stub } from 'sinon';
import InfiniteScroll from 'react-infinite-scroller';

import CrawlerTable from 'components/crawlers-page/crawlers-table';
import CrawlerRow from 'components/crawlers-page/crawler-row';


describe('CrawlerTable component', function () {
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
    const wrapper = shallow(
      <CrawlerTable
        rows={ rows }
        requestCrawlers={ requestCrawlersStub }
        nextParams={ nextParams }
      />
    );

    const crawlerNameHeader = wrapper.find('.header-col.crawler-header');
    const recentRunAtHeader = wrapper.find('.header-col').at(1);
    const numNewDocumentsHeader = wrapper.find('.header-col').at(2);
    const numDocumentsHeader = wrapper.find('.header-col').at(3);

    crawlerNameHeader.text().should.equal('Crawler');
    recentRunAtHeader.text().should.equal('Recent Run');
    numNewDocumentsHeader.text().should.equal('New Documents');
    numDocumentsHeader.text().should.equal('Total Documents');

    const infiniteScroll = wrapper.find(InfiniteScroll);
    infiniteScroll.prop('initialLoad').should.be.false();
    infiniteScroll.prop('hasMore').should.be.true();
    infiniteScroll.prop('useWindow').should.be.true();
    infiniteScroll.prop('children').should.have.length(2);
    wrapper.find(CrawlerRow).should.have.length(2);
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

    const wrapper = shallow(
      <CrawlerTable
        rows={ rows }
        hasMore={ true }
        nextParams={ nextParams }
        requestCrawlers={ requestCrawlersStub }/>
    );
    wrapper.find(InfiniteScroll).prop('loadMore')();
    requestCrawlersStub.should.be.calledWith(nextParams);
  });

});
