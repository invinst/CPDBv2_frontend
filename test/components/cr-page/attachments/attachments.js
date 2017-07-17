import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Attachments from 'components/cr-page/attachments';


describe('Attachments component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should not render if not items', function () {
    instance = renderIntoDocument(<Attachments/>);
    instance.should.displayNothing();
  });

  it('should not render if items is empty', function () {
    const items = [];
    instance = renderIntoDocument(<Attachments items={ items }/>);
    instance.should.displayNothing();
  });

  it('should render if has items and items is not empty', function () {
    const items = [{ title: 'abc', url: 'def' }];
    instance = renderIntoDocument(<Attachments items={ items }/>);
    scryRenderedComponentsWithType(instance, Attachments).should.have.length(1);
  });
});
