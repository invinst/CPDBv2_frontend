import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  Simulate,
  findRenderedComponentWithType
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import { CoaccusedListItem } from 'components/cr-page/header/coaccused-list-item';
import LabeledIcon from 'components/common/labeled-icon';


describe('CoaccusedListItem component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render LabeledIcon', function () {
    instance = renderIntoDocument(<CoaccusedListItem fullName='Foo' badge='Bar'/>);
    const labeledIcon = findRenderedComponentWithType(instance, LabeledIcon);
    labeledIcon.props.label.should.eql('Foo');
    labeledIcon.props.sublabel.should.eql('Badge Bar');
  });

  context('viewing is true', function () {
    it('should not handle onClick', function () {
      const openBottomSheetWithComplaint = spy();
      instance = renderIntoDocument(
        <CoaccusedListItem viewing={ true }
          openBottomSheetWithComplaint={ openBottomSheetWithComplaint }/>
      );
      const item = findRenderedDOMComponentWithClass(instance, 'test--coaccused-list-item');
      Simulate.click(item);
      openBottomSheetWithComplaint.called.should.be.false();
    });

    it('should display "Viewing" text for currently active coaccused officer', function () {
      instance = renderIntoDocument(<CoaccusedListItem viewing={ true } />);
      findDOMNode(instance).innerHTML.should.containEql('Viewing');
    });

  });

  context('viewing is false', function () {
    it('should handle onClick', function () {
      const openBottomSheetWithComplaint = spy();
      instance = renderIntoDocument(
        <CoaccusedListItem viewing={ false } id={ 1 } crid={ '1' }
          openBottomSheetWithComplaint={ openBottomSheetWithComplaint }/>
      );
      const item = findRenderedDOMComponentWithClass(instance, 'test--coaccused-list-item');
      item.innerText.should.containEql('View');
      Simulate.click(item);
      openBottomSheetWithComplaint.calledWith({ officerId: 1, crid: '1' }).should.be.true();
    });
  });
});
