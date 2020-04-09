import React from 'react';
import { shallow, mount } from 'enzyme';
import { spy, stub } from 'sinon';

import { OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT } from 'utils/constants';
import MiniVisualToken from 'components/pinboard-page/relevant/common/mini-officer-visual-token';
import PlusButton from 'components/pinboard-page/relevant/common/plus-button';
import BaseComplaintCard from 'components/pinboard-page/relevant/common/base-complaint-card';


describe('BaseComplaintCard component', function () {
  it('should render enough content', function () {
    const officers = [{
      id: 1,
      shortName: 'R. Sullivan',
      percentile: {
        year: 2015,
        items: [
          { axis: 'Use of Force Reports', value: 20.6 },
          { axis: 'Officer Allegations', value: 10.1 },
          { axis: 'Civilian Allegations', value: 52.5 },
        ],
        visualTokenBackground: '#ed7467',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      },
    }, {
      id: 2,
      shortName: 'E. May',
      percentile: { year: 2015, items: [] },
    }, {
      id: 3,
      shortName: 'B. Lopez',
      percentile: { year: 2015, items: [] },
    }, {
      id: 4,
      percentile: { year: 2015, items: [] },
    }, {
      id: 5,
      percentile: { year: 2015, items: [] },
    }, {
      id: 6,
      percentile: { year: 2015, items: [] },
    }, {
      id: 7,
      percentile: { year: 2015, items: [] },
    }, {
      id: 8,
      percentile: { year: 2015, items: [] },
    }];
    const addItemInPinboardPage = stub();
    const wrapper = shallow(
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

    wrapper.find('.test--left-child').exists().should.be.true();

    wrapper.find('.right-half').exists().should.be.true();
    wrapper.find('.incident-date').text().should.equal('Apr 4, 2015');
    wrapper.find('.category').text().should.equal('Unknown');

    const miniVisualTokens = wrapper.find(MiniVisualToken);
    miniVisualTokens.should.have.length(7);

    wrapper.find('.top-officer-row').should.have.length(2);
    wrapper.find('.top-officer-row-token').should.have.length(2);
    const topOfficerNames = wrapper.find('.top-officer-row-officer-name');
    topOfficerNames.should.have.length(2);
    topOfficerNames.at(0).text().should.equal('R. Sullivan');
    topOfficerNames.at(1).text().should.equal('E. May');
    miniVisualTokens.at(0).prop('className').should.equal('top-officer-row-token');
    miniVisualTokens.at(0).prop('percentile').should.eql({
      year: 2015,
      items: [
        { axis: 'Use of Force Reports', value: 20.6 },
        { axis: 'Officer Allegations', value: 10.1 },
        { axis: 'Civilian Allegations', value: 52.5 },
      ],
      visualTokenBackground: '#ed7467',
      textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
    });
    miniVisualTokens.at(1).prop('className').should.equal('top-officer-row-token');
    miniVisualTokens.at(1).prop('percentile').should.eql({ year: 2015, items: [] });

    miniVisualTokens.at(2).prop('className').should.equal('remaining-officer');
    miniVisualTokens.at(2).prop('percentile').should.eql({ year: 2015, items: [] });
    miniVisualTokens.at(3).prop('className').should.equal('remaining-officer');
    miniVisualTokens.at(3).prop('percentile').should.eql({ year: 2015, items: [] });
    miniVisualTokens.at(4).prop('className').should.equal('remaining-officer');
    miniVisualTokens.at(4).prop('percentile').should.eql({ year: 2015, items: [] });
    miniVisualTokens.at(5).prop('className').should.equal('remaining-officer');
    miniVisualTokens.at(5).prop('percentile').should.eql({ year: 2015, items: [] });
    miniVisualTokens.at(6).prop('className').should.equal('remaining-officer');
    miniVisualTokens.at(6).prop('percentile').should.eql({ year: 2015, items: [] });

    wrapper.find('.not-showing-officer-count').text().should.equal('1+');

    wrapper.find(PlusButton).exists().should.be.true();
  });

  it('should hide PlusButton if pinned', function () {
    const addItemInPinboardPage = stub();
    const wrapper = shallow(
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
    wrapper.find('.right-half').exists().should.be.true();
    wrapper.find(PlusButton).exists().should.be.false();
  });

  it('should call addItemInPinboardPage when clicking on PlusButton', function () {
    const addItemInPinboardPage = stub();
    const wrapper = mount(
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
        rawData={ {
          'crid': '123',
          'incident_date': 'Apr 4, 2015',
          'most_common_category': 'Unknown',
          'point': { 'lon': 1.0, 'lat': 2.0 },
        } }
      />
    );
    wrapper.find('.right-half').exists().should.be.true();
    const plusButton = wrapper.find(PlusButton);
    plusButton.simulate('click');
    addItemInPinboardPage.should.be.calledWith({
      type: 'CR',
      id: '123',
      rawData: {
        'crid': '123',
        'incident_date': 'Apr 4, 2015',
        'most_common_category': 'Unknown',
        'point': { 'lon': 1.0, 'lat': 2.0 },
      },
    });
  });

  it('should handle on focus', function () {
    const focusItem = spy();
    const wrapper = mount(
      <BaseComplaintCard
        crid='123'
        officers={ [] }
        focusItem={ focusItem }
      />
    );
    const rightHalf = wrapper.find('.right-half');
    rightHalf.simulate('click');
    focusItem.should.be.calledWith({ type: 'CR', 'id': '123' });

    focusItem.resetHistory();

    const leftHalf = wrapper.find('.left-half');
    leftHalf.simulate('click');
    focusItem.should.be.calledWith({ type: 'CR', 'id': '123' });
  });
});
