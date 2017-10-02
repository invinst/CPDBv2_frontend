import React from 'react';
import { Link } from 'react-router';
import {
  renderIntoDocument,
  findRenderedComponentWithType
} from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test/index';

import OfficerCard from 'components/landing-page/activity-grid/officer-card';

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
      />
    );
    const link = findRenderedComponentWithType(instance, Link);
    link.props.to.should.eql('/officer/1/');
    const visualTokenElement = link.props.children[0];
    visualTokenElement.props.width.should.eql(216);
    visualTokenElement.props.height.should.eql(216);
    visualTokenElement.props.officerId.should.eql(1);
    visualTokenElement.props.backgroundColor.should.eql('red');
  });
});
