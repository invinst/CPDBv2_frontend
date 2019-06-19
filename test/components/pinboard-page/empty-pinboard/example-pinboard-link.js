import React, { Component } from 'react';
import { Link } from 'react-router';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import Truncate from 'react-truncate';

import { unmountComponentSuppressError } from 'utils/test';
import ExamplePinboardLink from 'components/pinboard-page/empty-pinboard/example-pinboard-link';
import styles from 'components/pinboard-page/empty-pinboard/example-pinboard-link.sass';


describe('ExamplePinboardLink component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should have enough contents', function () {

    class TestComponent extends Component {
      render() {
        return <ExamplePinboardLink { ...this.props }/>;
      }
    }

    instance = renderIntoDocument(
      <TestComponent
        id='66ef1561'
        title='Pinboard 1'
        description='Description 1'
      />
    );

    const link = findRenderedComponentWithType(instance, Link);
    link.props.to.should.equal('/pinboard/66ef1561/');
    link.props.className.should.equal(styles.examplePinboardLink);
    findRenderedDOMComponentWithClass(link, 'title').textContent.should.equal('Pinboard 1');

    const description = findRenderedComponentWithType(instance, Truncate);
    description.props.className.should.equal('description');
    description.props.lines.should.equal(3);
    description.props.children.should.equal('Description 1');

    findRenderedDOMComponentWithClass(link, 'arrow').should.be.ok();
  });
});
