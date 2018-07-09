import React from 'react';
import { Link } from 'react-router';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import LinkItem from 'components/trr-page/officer-section/link-item';
import NavigationButton from 'components/trr-page/officer-section/navigation-button';


describe('LinkItem component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render title and value only if navigationText are not passed in', function () {
    instance = renderIntoDocument(<LinkItem to='/path/to/' title='Some title' value='Some value'/>);
    findRenderedComponentWithType(instance, Link).props.to.should.eql('/path/to/');

    findRenderedDOMComponentWithClass(instance, 'test--link-item-title').textContent.should.containEql('Some title');
    findRenderedDOMComponentWithClass(instance, 'test--link-item-value').textContent.should.containEql('Some value');
    scryRenderedComponentsWithType(instance, NavigationButton).should.have.length(0);
  });

  it('should render NavigationButton if navigationText are available', function () {
    instance = renderIntoDocument(
      <LinkItem
        title='Some title'
        value='Some value'
        navigationText='Some navigation text'
        hideBorder={ true }
      />
    );
    findRenderedComponentWithType(instance, NavigationButton).props.text.should.eql('Some navigation text');
  });
});
