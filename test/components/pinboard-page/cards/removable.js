import React, { Component } from 'react';
import { renderIntoDocument } from 'react-addons-test-utils';
import { spy } from 'sinon';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError } from 'utils/test';
import Removable from 'components/pinboard-page/cards/removable';


describe('BaseCard component', function () {
  let instance;

  class EmptyCard extends Component {
    render() {
      return <div/>;
    }
  }

  const RemovableEmptyCard = Removable(EmptyCard);

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should fade in when added', function () {
    const item = {
      incidentDate: '10-10-2010',
      category: 'Use Of Force',
    };
    instance = renderIntoDocument(<RemovableEmptyCard item={ item } isAdded={ true }/>);

    const instanceDom = findDOMNode(instance);
    instanceDom.className.should.containEql('hide');
    instanceDom.className.should.containEql('fade-in');
  });

  it('should removeItemInPinboardPage when removeItem is invoked', function () {
    const removeItemInPinboardPage = spy();

    const item = {
      type: 'CR',
      isPinned: false,
      id: '123',
      incidentDate: '10-10-2010',
      category: 'Use Of Force',
    };
    instance = renderIntoDocument(
      <RemovableEmptyCard
        item={ item }
        removeItemInPinboardPage={ removeItemInPinboardPage }
      />
    );

    instance.removeItem();

    removeItemInPinboardPage.should.be.calledOnce();
    removeItemInPinboardPage.should.be.calledWith({
      type: 'CR',
      id: '123'
    });
  });
});
