import React from 'react';
import { stub } from 'sinon';
import { mount } from 'enzyme';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';

import ExamplePinboardLink from 'components/pinboard-page/empty-pinboard/example-pinboard-link';
import styles from 'components/pinboard-page/empty-pinboard/example-pinboard-link.sass';


describe('ExamplePinboardLink component', function () {
  it('should have enough contents', function () {
    const updatePinboardFromSourceStub = stub();

    function TestComponent(props) {
      return <ExamplePinboardLink { ...props }/>;
    }

    const wrapper = mount(
      <TestComponent
        id='66ef1561'
        title='Pinboard 1'
        description='**Description 1**'
        currentPinboardId='abcd1234'
        updatePinboardFromSource={ updatePinboardFromSourceStub }
      />
    );

    const link = wrapper.find('a');
    link.prop('className').should.equal(styles.examplePinboardLink);
    link.find('.title').text().should.equal('Pinboard 1');

    const description = wrapper.find(HTMLEllipsis);

    description.exists().should.be.true();
    description.prop('className').should.equal('description');
    description.prop('unsafeHTML').trim().should.equal('<p><strong>Description 1</strong></p>');

    wrapper.find('.arrow').exists().should.be.true();

    link.simulate('click');
    updatePinboardFromSourceStub.should.be.calledWith('abcd1234', '66ef1561');
  });
});
