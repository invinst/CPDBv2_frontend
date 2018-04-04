import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import HeaderWidget from 'components/search-page/search-terms/preview-pane/widgets/header-widget';


describe('HeaderWidget component', () => {
  let instance;

  it('should contains title', () => {
    instance = renderIntoDocument(
      <HeaderWidget title={ 'Community Name' }/>
    );
    const instanceDOM = findRenderedDOMComponentWithClass(instance, 'test--header-widget');
    instanceDOM.textContent.should.containEql('Community Name');
  });
});
