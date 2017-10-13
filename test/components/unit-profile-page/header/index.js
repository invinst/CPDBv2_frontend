import React from 'react';
import { Link } from 'react-router';
import { map } from 'lodash';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import Header from 'components/unit-profile-page/header';


describe('Header component', function () {
  it('should render 3 links with different urls', function () {
    const instance = renderIntoDocument(<Header pathname='/unit/123/'/>);
    const links = scryRenderedComponentsWithType(instance, Link);
    links.should.have.length(3);
    map(links, link => link.props.to).should.eql([
      '/unit/123/', '/unit/123/timeline/', '/unit/123/social/'
    ]);
  });
});
