import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
} from 'react-addons-test-utils';

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
    tags.should.have.length(4);

    tags[0].getAttribute('class').should.equal('right-link top');
    tags[0].getAttribute('href').should.equal('http://cpdb.lvh.me');
    tags[0].textContent.should.equal('Data');

    tags[1].getAttribute('class').should.equal('right-link top');
    tags[1].getAttribute('href').should.equal('http://how.cpdp.works/');
    tags[1].textContent.should.equal('Q&A');

    tags[2].getAttribute('class').should.equal('right-link top');
    tags[2].getAttribute('href').should.equal('/documents/');
    tags[2].textContent.should.equal('Documents');

    tags[3].getAttribute('class').should.equal('right-link top');
    tags[3].getAttribute('href').should.equal('/pinboard/');
    tags[3].textContent.should.equal('Pinboards');
  });
});
