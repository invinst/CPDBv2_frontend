import React from 'react';
import { Link } from 'react-router';
import { map } from 'lodash';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import Header from 'components/officer-page/header';


describe('Header component', function () {
  it('should render 3 links with different urls', function () {
    const instance = renderIntoDocument(<Header pathname='/officer/123/'/>);
    const links = scryRenderedComponentsWithType(instance, Link);
    links.should.have.length(3);
    map(links, link => link.props.to).should.eql([
      '/officer/123/', '/officer/123/timeline/', '/officer/123/social-graph/'
    ]);
  });
});
