import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import HeaderWidget from 'components/search-page/preview-pane/widgets/header-widget';
import { unmountComponentSuppressError } from 'utils/test';


describe('HeaderWidget component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should contains title', () => {
    instance = renderIntoDocument(
      <HeaderWidget title={ 'Community Name' }/>
    );
    const instanceDOM = findRenderedDOMComponentWithClass(instance, 'test--header-widget');
    instanceDOM.textContent.should.containEql('Community Name');
  });
});
