import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import OfficerCard from 'components/pinboard-page/cards/officer-card';
import ItemUnpinButton from 'components/pinboard-page/item-unpin-button';
import StaticRadarChart from 'components/common/radar-chart';


describe('OfficerCard component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    const item = {
      rank: 'Officer as Detective',
      fullName: 'James David',
      complaintCount: '10',
    };
    instance = renderIntoDocument(<OfficerCard item={ item } />);

    findRenderedComponentWithType(instance, ItemUnpinButton).should.be.ok();
    findRenderedComponentWithType(instance, StaticRadarChart).should.be.ok();

    findRenderedDOMComponentWithClass(instance, 'officer-rank').textContent.should.eql('Officer as Detective');
    findRenderedDOMComponentWithClass(instance, 'officer-name').textContent.should.eql('James David');
    findRenderedDOMComponentWithClass(instance, 'officer-complaints-count').textContent.should.eql('10 complaints');
  });
});
