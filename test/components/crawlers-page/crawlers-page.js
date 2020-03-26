import React from 'react';
import { shallow } from 'enzyme';
import { stub } from 'sinon';

import CrawlersPage from 'components/crawlers-page';
import CrawlersTable from 'components/crawlers-page/crawlers-table';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';


describe('CrawlersPage component', function () {
  it('should render crawler page correctly', function () {
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

    const wrapper = shallow(
      <CrawlersPage
        crawlers={ crawlers }
        requestCrawlers={ requestCrawlersStub }
        nextParams={ nextParams }
      />
    );

    const shareableHeaderContainer = wrapper.find(ShareableHeaderContainer);
    const headerButton = shareableHeaderContainer.prop('headerButtons');
    headerButton.props.buttonText.should.equal('Documents');
    headerButton.props.to.should.equal('/documents/');

    const crawlersTable = wrapper.find(CrawlersTable);
    crawlersTable.prop('rows').should.eql(crawlers);
    crawlersTable.prop('nextParams').should.eql(nextParams);
    crawlersTable.prop('requestCrawlers').should.eql(requestCrawlersStub);
  });
});
