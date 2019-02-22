import React from 'react';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';

import CrawlerRow from 'components/crawlers-page/crawler-row';
import { unmountComponentSuppressError } from 'utils/test';


describe('CrawlerRow component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render failed crawler row correctly', function () {
    instance = renderIntoDocument(
      <CrawlerRow
        crawlerName='PORTAL_COPA'
        status='Failed'
        numDocuments={ 10 }
        numNewDocuments={ 5 }
        recentRunAt='2019-02-20'
        numSuccessfulRun={ 2 }
      />
    );

    const crawlerName = findRenderedDOMComponentWithClass(instance, 'crawler-col crawler-name');
    const recentRunAt = findRenderedDOMComponentWithClass(instance, 'crawler-col recent-run failed');
    const numNewDocuments = scryRenderedDOMComponentsWithClass(instance, 'crawler-col')[2];
    const numDocuments = scryRenderedDOMComponentsWithClass(instance, 'crawler-col')[3];
    const numSuccessfulRun = scryRenderedDOMComponentsWithClass(instance, 'crawler-col')[4];

    crawlerName.textContent.should.eql('PORTAL_COPA');
    recentRunAt.textContent.should.eql('2019-02-20');
    numNewDocuments.textContent.should.eql('5');
    numDocuments.textContent.should.eql('10');
    numSuccessfulRun.textContent.should.eql('2');
  });

  it('should render success crawler row correctly', function () {
    instance = renderIntoDocument(
      <CrawlerRow
        crawlerName='PORTAL_COPA'
        status='Success'
        numDocuments={ 10 }
        numNewDocuments={ 5 }
        recentRunAt='2019-02-20'
        numSuccessfulRun={ 2 }
      />
    );

    const crawlerName = findRenderedDOMComponentWithClass(instance, 'crawler-col crawler-name');
    const recentRunAt = findRenderedDOMComponentWithClass(instance, 'crawler-col recent-run');
    const numNewDocuments = scryRenderedDOMComponentsWithClass(instance, 'crawler-col')[2];
    const numDocuments = scryRenderedDOMComponentsWithClass(instance, 'crawler-col')[3];
    const numSuccessfulRun = scryRenderedDOMComponentsWithClass(instance, 'crawler-col')[4];

    crawlerName.textContent.should.eql('PORTAL_COPA');
    recentRunAt.textContent.should.eql('2019-02-20');
    numNewDocuments.textContent.should.eql('5');
    numDocuments.textContent.should.eql('10');
    numSuccessfulRun.textContent.should.eql('2');
  });
});
