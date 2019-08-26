import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  findRenderedDOMComponentWithClass,
  Simulate,
} from 'react-addons-test-utils';
import { stub } from 'sinon';

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
        logUrl='https://lvh.me/cpdp-crawler-logs-develop/summary_reports_copa-2019-02-27-100330.txt'
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
        logUrl='https://lvh.me/cpdp-crawler-logs-develop/summary_reports_copa-2019-02-27-100330.txt'
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

  it('should call openLogFileModal action when click', function () {
    const openLogFileStub = stub();
    instance = renderIntoDocument(
      <CrawlerRow
        id={ 123 }
        logUrl='https://lvh.me/log'
        openLogFileModal={ openLogFileStub }
      />
    );
    const crawlerRow = findDOMNode(instance);
    Simulate.click(crawlerRow);
    openLogFileStub.calledWith(123).should.be.true();
  });

  it('should not call openLogFileModal action when click if logUrl is empty', function () {
    const openLogFileStub = stub();
    instance = renderIntoDocument(
      <CrawlerRow
        id={ 123 }
        openLogFileModal={ openLogFileStub }
      />
    );
    const crawlerRow = findDOMNode(instance);
    Simulate.click(crawlerRow);
    openLogFileStub.should.not.be.called();
  });
});
