import React, { Component } from 'react';
import { stub } from 'sinon';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithTag,
  Simulate,
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
    const updatePinboardFromSourceStub = stub();
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
        currentPinboardId='abcd1234'
        updatePinboardFromSource={ updatePinboardFromSourceStub }
      />
    );

    const link = findRenderedDOMComponentWithTag(instance, 'a');
    link.className.should.equal(styles.examplePinboardLink);
    findRenderedDOMComponentWithClass(instance, 'title').textContent.should.equal('Pinboard 1');

    const description = findRenderedComponentWithType(instance, Truncate);
    description.props.className.should.equal('description');
    description.props.lines.should.equal(3);
    description.props.children.should.equal('Description 1');
    findRenderedDOMComponentWithClass(instance, 'arrow').should.be.ok();

    Simulate.click(link);
    updatePinboardFromSourceStub.should.be.calledWith('abcd1234', '66ef1561');
  });
});
