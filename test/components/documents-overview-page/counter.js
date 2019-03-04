import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Counter from 'components/documents-overview-page/document-row/counter';


describe('DocumentsOverviewPage Counter component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render counts', function () {
    instance = renderIntoDocument(
      <Counter viewsCount={ 3000 } downloadsCount={ 20000 }/>
    );

    findRenderedDOMComponentWithClass(instance, 'view-count').textContent.should.eql('3,000');
    findRenderedDOMComponentWithClass(instance, 'download-count').textContent.should.eql('20,000');
  });
});
