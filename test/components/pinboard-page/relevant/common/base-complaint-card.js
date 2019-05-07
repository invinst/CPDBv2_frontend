import React from 'react';
import { Link } from 'react-router';
import { stub } from 'sinon';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  scryRenderedComponentsWithType,
  Simulate,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import { OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT } from 'utils/constants';
import MiniVisualToken from 'components/pinboard-page/relevant/common/mini-officer-visual-token';
import PlusButton from 'components/pinboard-page/relevant/common/plus-button';
import BaseComplaintCard from 'components/pinboard-page/relevant/common/base-complaint-card';
import { findDOMNode } from 'react-dom';


describe('BaseComplaintCard component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render enough content', function () {
    const officers = [{
      id: 1,
      shortName: 'R. Sullivan',
      percentile: {
        year: 2015,
        items: [
          { axis: 'Use of Force Reports', value: 20.6, },
          { axis: 'Officer Allegations', value: 10.1, },
          { axis: 'Civilian Allegations', value: 52.5, },
        ],
        visualTokenBackground: '#ed7467',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      }
    }, {
      id: 2,
      shortName: 'E. May',
      percentile: { year: 2015, items: [] }
    }, {
      id: 3,
      shortName: 'B. Lopez',
      percentile: { year: 2015, items: [] }
    }, {
      id: 4,
      percentile: { year: 2015, items: [] }
    }, {
      id: 5,
      percentile: { year: 2015, items: [] }
    }, {
      id: 6,
      percentile: { year: 2015, items: [] }
    }, {
      id: 7,
      percentile: { year: 2015, items: [] }
    }, {
      id: 8,
      percentile: { year: 2015, items: [] }
    }];
    const addItemInPinboardPage = stub();
    instance = renderIntoDocument(
      <BaseComplaintCard
        leftChild={ <div className='test--left-child'/> }
        url='lvh.me'
        previewImageUrl='img.lvh.me'
        crid='123'
        incidentDate='Apr 4, 2015'
        category='Unknown'
        officers={ officers }
        addItemInPinboardPage={ addItemInPinboardPage }
        pinned={ false }
      />
    );

    findRenderedDOMComponentWithClass(instance, 'test--left-child');

    const rightHalf = findRenderedComponentWithType(instance, Link);
    rightHalf.props.to.should.eql('/complaint/123/');

    findRenderedDOMComponentWithClass(rightHalf, 'incident-date').textContent.should.eql('Apr 4, 2015');
    findRenderedDOMComponentWithClass(rightHalf, 'category').textContent.should.eql('Unknown');

    const miniVisualTokens = scryRenderedComponentsWithType(rightHalf, MiniVisualToken);
    miniVisualTokens.should.have.length(7);

    scryRenderedDOMComponentsWithClass(rightHalf, 'top-officer-row').should.have.length(2);
    scryRenderedDOMComponentsWithClass(rightHalf, 'top-officer-row-token').should.have.length(2);
    const topOfficerNames = scryRenderedDOMComponentsWithClass(rightHalf, 'top-officer-row-officer-name');
    topOfficerNames.should.have.length(2);
    topOfficerNames[0].textContent.should.eql('R. Sullivan');
    topOfficerNames[1].textContent.should.eql('E. May');
    miniVisualTokens[0].props.className.should.eql('top-officer-row-token');
    miniVisualTokens[0].props.percentile.should.eql({
      year: 2015,
      items: [
        { axis: 'Use of Force Reports', value: 20.6, },
        { axis: 'Officer Allegations', value: 10.1, },
        { axis: 'Civilian Allegations', value: 52.5, },
      ],
      visualTokenBackground: '#ed7467',
      textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
    });
    miniVisualTokens[1].props.className.should.eql('top-officer-row-token');
    miniVisualTokens[1].props.percentile.should.eql({ year: 2015, items: [] });

    miniVisualTokens[2].props.className.should.eql('remaining-officer');
    miniVisualTokens[2].props.percentile.should.eql({ year: 2015, items: [] });
    miniVisualTokens[3].props.className.should.eql('remaining-officer');
    miniVisualTokens[3].props.percentile.should.eql({ year: 2015, items: [] });
    miniVisualTokens[4].props.className.should.eql('remaining-officer');
    miniVisualTokens[4].props.percentile.should.eql({ year: 2015, items: [] });
    miniVisualTokens[5].props.className.should.eql('remaining-officer');
    miniVisualTokens[5].props.percentile.should.eql({ year: 2015, items: [] });
    miniVisualTokens[6].props.className.should.eql('remaining-officer');
    miniVisualTokens[6].props.percentile.should.eql({ year: 2015, items: [] });

    findRenderedDOMComponentWithClass(rightHalf, 'not-showing-officer-count').textContent.should.eql('1+');

    findRenderedComponentWithType(rightHalf, PlusButton);
  });

  it('should hide PlusButton if pinned', function () {
    const addItemInPinboardPage = stub();
    instance = renderIntoDocument(
      <BaseComplaintCard
        leftChild={ <div className='test--left-child'/> }
        url='lvh.me'
        previewImageUrl='img.lvh.me'
        crid='123'
        incidentDate='Apr 4, 2015'
        category='Unknown'
        officers={ [] }
        addItemInPinboardPage={ addItemInPinboardPage }
        pinned={ true }
      />
    );
    const rightHalf = findRenderedComponentWithType(instance, Link);
    scryRenderedComponentsWithType(rightHalf, PlusButton).should.have.length(0);
  });

  it('should call addItemInPinboardPage when clicking on PlusButton', function () {
    const addItemInPinboardPage = stub();
    instance = renderIntoDocument(
      <BaseComplaintCard
        leftChild={ <div className='test--left-child'/> }
        url='lvh.me'
        previewImageUrl='img.lvh.me'
        crid='123'
        incidentDate='Apr 4, 2015'
        category='Unknown'
        officers={ [] }
        addItemInPinboardPage={ addItemInPinboardPage }
        pinned={ false }
      />
    );
    const rightHalf = findRenderedComponentWithType(instance, Link);
    const plusButton = findRenderedComponentWithType(rightHalf, PlusButton);
    Simulate.click(findDOMNode(plusButton));
    addItemInPinboardPage.should.be.calledWith({ type: 'CR', id: '123' });
  });
});
