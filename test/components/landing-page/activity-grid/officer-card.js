import React from 'react';
import { Link } from 'react-router';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedComponentWithType
} from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test/index';

import OfficerCard from 'components/landing-page/activity-grid/officer-card';
import { CURRENT_YEAR } from 'utils/constants';

describe('OfficerCard component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    instance = renderIntoDocument(
      <OfficerCard
        officerId={ 1 }
        fullName='someone'
        visualTokenBackgroundColor='red'
        complaintCount={ 10 }
        sustainedCount={ 5 }
        complaintRate={ 20 }
        birthYear={ 1980 }
        race='white'
        gender='male'
      />
    );
    const link = findRenderedComponentWithType(instance, Link);
    link.props.to.should.eql('/officer/1/');
    const visualTokenElement = link.props.children[0];
    visualTokenElement.props.officerId.should.eql(1);
    visualTokenElement.props.backgroundColor.should.eql('red');

    const text = findDOMNode(instance).innerText;
    text.should.containEql('Officersomeone');
    text.should.containEql('10 Complaints, 5 Sustained');
    text.should.containEql('Less than 20% of other officers');

    const age = CURRENT_YEAR - 1980;
    text.should.containEql(`${age - 1}/${age} years old, white, male.`);
  });
});
