import React from 'react';
import { findDOMNode } from 'react-dom';
import { renderIntoDocument, findRenderedDOMComponentWithClass, Simulate } from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import OfficerRow from 'components/cr-page/involvement/officer-row';


describe('OfficerRow component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render abbrName and extraInfo', function () {
    instance = renderIntoDocument(<OfficerRow abbrName='Foo' extraInfo='male, white' />);
    findDOMNode(instance).innerHTML.should.containEql('Foo');
    findDOMNode(instance).innerHTML.should.containEql('male, white');
  });

  it('should handle onClick action', function () {
    const onClick = spy();
    instance = renderIntoDocument(<OfficerRow onClick={ onClick } officerId={ 1 }/>);
    const element = findRenderedDOMComponentWithClass(instance, 'test--officer-row');
    Simulate.click(element);
    onClick.calledWith(1).should.be.true();
  });
});
