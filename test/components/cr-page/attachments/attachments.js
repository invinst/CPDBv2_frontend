import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';

import { unmountComponentSuppressError } from 'utils/test';
import Attachments from 'components/cr-page/attachments';


describe('Attachments component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should show "no documents" message if no items', function () {
    instance = renderIntoDocument(<Attachments />);
    findDOMNode(instance).innerText.should.containEql(
      'There are no documents publicly available for this incident at this time.'
    );
  });

  it('should show "no documents" message if items is empty', function () {
    instance = renderIntoDocument(<Attachments items={ [] }/>);
    findDOMNode(instance).innerText.should.containEql(
      'There are no documents publicly available for this incident at this time.'
    );
  });

  it('should show custom "no document" message for each type', function () {
    instance = renderIntoDocument(<Attachments title='VIDEO' />);
    findDOMNode(instance).innerText.should.containEql(
      'There are no video clips publicly available for this incident at this time.'
    );
  });

  it('should render if has items and items is not empty', function () {
    const items = [{ title: 'abc', url: 'def' }];
    instance = renderIntoDocument(<Attachments items={ items }/>);
    scryRenderedComponentsWithType(instance, Attachments).should.have.length(1);
  });
});
