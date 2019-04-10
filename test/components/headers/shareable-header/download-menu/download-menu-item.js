import React from 'react';
import { findDOMNode } from 'react-dom';
import { stub, spy } from 'sinon';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  Simulate
} from 'react-addons-test-utils';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import DownloadMenuItem from 'components/headers/shareable-header/download-menu/download-menu-item';
import * as GATracking from 'utils/google_analytics_tracking';


describe('DownloadMenu component', function () {
  let element;

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it(
    'should render download image by default and change to downloading after being clicked',
    function () {
      const fetchOfficerZipFileUrlStub = stub();

      element = renderIntoDocument(
        <DownloadMenuItem
          officerId={ 123 }
          kind='without_docs'
          zipFileUrl=''
          fetchOfficerZipFileUrl={ fetchOfficerZipFileUrlStub }
        />
      );

      const text = findRenderedDOMComponentWithClass(element, 'request-download');
      text.textContent.should.eql('Data only');

      const downloadImg = findRenderedDOMComponentWithClass(element, 'download-menu-item-img');
      downloadImg.src.should.containEql('/img/download.svg');
      downloadImg.alt.should.eql('download');

      Simulate.click(findDOMNode(element));

      const downloadingImg = findRenderedDOMComponentWithClass(element, 'download-menu-item-img');
      downloadingImg.src.should.containEql('/img/loading.svg');
      downloadingImg.alt.should.eql('downloading');

      fetchOfficerZipFileUrlStub.should.be.calledWith(123);
    }
  );

  it('should start download when being clicked if zipFileUrl is available', function () {
    const fetchOfficerZipFileUrlStub = stub();
    const triggerDownloadSpy = spy(DownloadMenuItem.prototype, 'triggerDownload');

    element = renderIntoDocument(
      <DownloadMenuItem
        officerId={ 123 }
        kind='without_docs'
        zipFileUrl='lvh.me/file.zip'
        fetchOfficerZipFileUrl={ fetchOfficerZipFileUrlStub }
      />
    );

    triggerDownloadSpy.should.not.be.called();
    element.state.requested.should.be.false();

    Simulate.click(findDOMNode(element));

    triggerDownloadSpy.should.be.calledWith('lvh.me/file.zip');

    triggerDownloadSpy.restore();
  });

  it('should throttle continues download requests', function () {
    const fetchOfficerZipFileUrlStub = stub();
    const triggerDownloadSpy = spy(DownloadMenuItem.prototype, 'triggerDownload');

    element = renderIntoDocument(
      <DownloadMenuItem
        officerId={ 123 }
        kind='without_docs'
        zipFileUrl='lvh.me/file.zip'
        fetchOfficerZipFileUrl={ fetchOfficerZipFileUrlStub }
      />
    );

    triggerDownloadSpy.should.not.be.called();

    Simulate.click(findDOMNode(element));
    Simulate.click(findDOMNode(element));
    Simulate.click(findDOMNode(element));

    triggerDownloadSpy.should.be.calledOnce();

    triggerDownloadSpy.restore();
  });

  it('should start download when zipFileUrl is ready', function () {
    const fetchOfficerZipFileUrlStub = stub();
    const triggerDownloadSpy = spy(DownloadMenuItem.prototype, 'triggerDownload');

    element = renderIntoDocument(
      <DownloadMenuItem
        officerId={ 123 }
        kind='without_docs'
        zipFileUrl=''
        fetchOfficerZipFileUrl={ fetchOfficerZipFileUrlStub }
      />
    );

    Simulate.click(findDOMNode(element));
    element.state.requested.should.be.true();
    triggerDownloadSpy.should.not.be.called();

    element = reRender(
      <DownloadMenuItem
        officerId={ 123 }
        kind='without_docs'
        zipFileUrl='lvh.me/file.zip'
        fetchOfficerZipFileUrl={ fetchOfficerZipFileUrlStub }
      />,
      element
    );

    triggerDownloadSpy.should.be.calledWith('lvh.me/file.zip');
    element.state.requested.should.be.false();

    triggerDownloadSpy.restore();
  });

  it('should send google analytics when clicked', function () {
    const fetchOfficerZipFileUrlStub = stub();
    const triggerDownloadSpy = spy(DownloadMenuItem.prototype, 'triggerDownload');
    const stubTrackOfficerDownload = stub(GATracking, 'trackOfficerDownload');

    element = renderIntoDocument(
      <DownloadMenuItem
        officerId={ 123 }
        kind='without_docs'
        zipFileUrl=''
        fetchOfficerZipFileUrl={ fetchOfficerZipFileUrlStub }
      />
    );

    Simulate.click(findDOMNode(element));
    element.state.requested.should.be.true();
    triggerDownloadSpy.should.not.be.called();
    stubTrackOfficerDownload.should.be.calledWith(123, 'request_download_urls', 'without_docs');

    element = reRender(
      <DownloadMenuItem
        officerId={ 123 }
        kind='without_docs'
        zipFileUrl='lvh.me/file.zip'
        fetchOfficerZipFileUrl={ fetchOfficerZipFileUrlStub }
      />,
      element
    );

    triggerDownloadSpy.should.be.calledWith('lvh.me/file.zip');
    stubTrackOfficerDownload.should.be.calledWith(123, 'download', 'without_docs');
    element.state.requested.should.be.false();

    triggerDownloadSpy.restore();
    stubTrackOfficerDownload.restore();
  });
});
