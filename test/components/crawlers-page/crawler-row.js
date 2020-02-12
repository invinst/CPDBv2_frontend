import React from 'react';
import { shallow } from 'enzyme';
import { stub } from 'sinon';

import CrawlerRow from 'components/crawlers-page/crawler-row';


describe('CrawlerRow component', function () {
  it('should render failed crawler row correctly', function () {
    const wrapper = shallow(
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

    const crawlerName = wrapper.find('.crawler-col.crawler-name');
    const recentRunAt = wrapper.find('.crawler-col.recent-run.failed');
    const numNewDocuments = wrapper.find('.crawler-col').at(2);
    const numDocuments = wrapper.find('.crawler-col').at(3);
    const numSuccessfulRun = wrapper.find('.crawler-col').at(4);

    crawlerName.text().should.equal('PORTAL_COPA');
    recentRunAt.text().should.equal('2019-02-20');
    numNewDocuments.text().should.equal('5');
    numDocuments.text().should.equal('10');
    numSuccessfulRun.text().should.equal('2');
  });

  it('should render success crawler row correctly', function () {
    const wrapper = shallow(
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

    const crawlerName = wrapper.find('.crawler-col.crawler-name');
    const recentRunAt = wrapper.find('.crawler-col.recent-run');
    const numNewDocuments = wrapper.find('.crawler-col').at(2);
    const numDocuments = wrapper.find('.crawler-col').at(3);
    const numSuccessfulRun = wrapper.find('.crawler-col').at(4);

    crawlerName.text().should.equal('PORTAL_COPA');
    recentRunAt.text().should.equal('2019-02-20');
    numNewDocuments.text().should.equal('5');
    numDocuments.text().should.equal('10');
    numSuccessfulRun.text().should.equal('2');
  });

  it('should call openLogFileModal action when click', function () {
    const openLogFileStub = stub();
    const wrapper = shallow(
      <CrawlerRow
        id={ 123 }
        logUrl='https://lvh.me/log'
        openLogFileModal={ openLogFileStub }
      />
    );
    wrapper.simulate('click');
    openLogFileStub.should.be.calledWith(123);
  });

  it('should not call openLogFileModal action when click if logUrl is empty', function () {
    const openLogFileStub = stub();
    const wrapper = shallow(
      <CrawlerRow
        id={ 123 }
        openLogFileModal={ openLogFileStub }
      />
    );
    wrapper.simulate('click');
    openLogFileStub.should.not.be.called();
  });
});
