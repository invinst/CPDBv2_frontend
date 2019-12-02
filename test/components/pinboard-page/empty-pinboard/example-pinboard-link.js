import React, { Component } from 'react';
import { mount } from 'enzyme';
import { Link } from 'react-router';
import Truncate from 'react-truncate';

import ExamplePinboardLink from 'components/pinboard-page/empty-pinboard/example-pinboard-link';
import styles from 'components/pinboard-page/empty-pinboard/example-pinboard-link.sass';


describe('ExamplePinboardLink component', function () {
  it('should have enough contents', function () {
    class TestComponent extends Component {
      render() {
        return <ExamplePinboardLink { ...this.props }/>;
      }
    }

    const wrapper = mount(
      <TestComponent
        id='66ef1561'
        title='Pinboard 1'
        description='Description 1'
      />
    );

    const link = wrapper.find(Link);
    link.prop('to').should.equal('/pinboard/66ef1561/');
    link.prop('className').should.equal(styles.examplePinboardLink);
    link.find('.title').text().should.equal('Pinboard 1');

    const description = wrapper.find(Truncate);
    description.prop('className').should.equal('description');
    description.prop('lines').should.equal(3);
    description.prop('children').should.equal('Description 1');

    link.find('.arrow').exists().should.be.true();
  });
});
