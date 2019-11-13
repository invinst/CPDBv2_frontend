import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithTag,
} from 'react-addons-test-utils';
import { Link } from 'react-router';

import { unmountComponentSuppressError } from 'utils/test';
import RightLinks from 'components/headers/slim-header/slim-header-content/right-links';
import styles from 'components/headers/slim-header/slim-header-content/right-links.sass';


describe('RightLinks component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    instance = renderIntoDocument(<RightLinks position='top'/>);

    findDOMNode(instance).getAttribute('class').should.equal(styles.rightLinks);

    const tags = scryRenderedDOMComponentsWithTag(instance, 'a');
    const links = scryRenderedComponentsWithType(instance, Link);

    tags[0].getAttribute('class').should.equal('right-link top');
    tags[0].getAttribute('href').should.equal('http://cpdb.lvh.me');
    tags[0].textContent.should.equal('Data');

    tags[1].getAttribute('class').should.equal('right-link top');
    tags[1].getAttribute('href').should.equal('http://how.cpdp.works/');
    tags[1].textContent.should.equal('Q&A');

    links[0].props.className.should.equal('right-link top');
    links[0].props.to.should.equal('/documents/');
    links[0].props.children.should.equal('Documents');

    links[1].props.className.should.equal('right-link top');
    links[1].props.to.should.equal('/pinboard/');
    links[1].props.children.should.equal('Pinboards');
  });
});
