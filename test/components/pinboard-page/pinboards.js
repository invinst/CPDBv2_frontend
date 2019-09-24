import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import Pinboards from 'components/pinboard-page/pinboards';


describe('Pinboards component', function () {
  let instance;

  const pinboards = [
    {
      id: '1',
      title: 'Pinboard Title',
      createdAt: 'Sep 12, 2019',
      url: '/pinboard/1/pinboard-title/',
    },
    {
      id: '2',
      title: '',
      createdAt: 'Oct 15, 2019',
      url: '/pinboard/2/untitled-pinboard/',
    },
  ];

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render pinboard items', function () {
    instance = renderIntoDocument(
      <Pinboards pinboards={ pinboards } isShown={ true } />
    );

    findRenderedDOMComponentWithClass(instance, 'pinboards-title').textContent.should.eql('Pinboards');

    const pinboardItems = scryRenderedDOMComponentsWithClass(instance, 'pinboard-item');
    pinboardItems.should.have.length(2);

    const pinboardTitles = scryRenderedDOMComponentsWithClass(instance, 'pinboard-title');
    const pinboardCreatedAts = scryRenderedDOMComponentsWithClass(instance, 'pinboard-created-at');

    pinboardItems[0].getAttribute('href').should.eql('/pinboard/1/pinboard-title/');
    pinboardTitles[0].textContent.should.eql('Pinboard Title');
    pinboardCreatedAts[0].textContent.should.eql('Created Sep 12, 2019');

    pinboardItems[1].getAttribute('href').should.eql('/pinboard/2/untitled-pinboard/');
    pinboardTitles[1].textContent.should.eql('');
    pinboardCreatedAts[1].textContent.should.eql('Created Oct 15, 2019');
  });

  it('should not render pinboard list if isShown is false', function () {
    instance = renderIntoDocument(
      <Pinboards pinboards={ pinboards } isShown={ false } />
    );

    scryRenderedDOMComponentsWithClass(instance, 'pinboards-title').should.have.length(0);
    scryRenderedDOMComponentsWithClass(instance, 'pinboard-item').should.have.length(0);
  });

  describe('componentWillReceiveProps', function () {
    it('should fetchPinboards if isShow change from false to true', function () {
      const fetchPinboardsSpy = spy();

      instance = renderIntoDocument(
        <Pinboards pinboards={ pinboards } isShown={ false } fetchPinboards={ fetchPinboardsSpy } />
      );

      fetchPinboardsSpy.should.not.be.called();

      instance = reRender(
        <Pinboards pinboards={ pinboards } isShown={ true } fetchPinboards={ fetchPinboardsSpy } />,
        instance,
      );

      fetchPinboardsSpy.should.be.called();
    });
  });
});
