import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
} from 'react-addons-test-utils';

import OneLineListWidget from 'components/common/preview-pane/widgets/one-line-list-widget';
import { unmountComponentSuppressError } from 'utils/test';


describe('OneLineListWidget component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', () => {
    instance = renderIntoDocument(
      <OneLineListWidget
        items={ [
          { title: 'Title 0', text: 'Text 0' },
          { text: 'Text 1' },
        ] }
      />
    );

    const list = findRenderedDOMComponentWithTag(instance, 'ul');

    const items = list.getElementsByClassName('list-item');
    items.should.have.length(2);

    items[0].getElementsByClassName('list-item-title')[0].textContent.should.equal('Title 0');
    items[0].getElementsByClassName('list-item-text has-title')[0].textContent.should.equal('Text 0');
    items[0].lastChild.getAttribute('class').should.equal('clearfix');

    items[1].getElementsByClassName('list-item-text has-title').should.have.length(0);
    items[1].getElementsByClassName('list-item-text')[0].textContent.should.equal('Text 1');
    items[1].lastChild.getAttribute('class').should.equal('clearfix');
  });
});
