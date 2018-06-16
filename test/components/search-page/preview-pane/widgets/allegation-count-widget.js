import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import AllegationCountWidget from 'components/search-page/preview-pane/widgets/allegation-count-widget';
import { unmountComponentSuppressError } from 'utils/test';


describe('AllegationCountWidget component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should contains number of allegations', () => {
    instance = renderIntoDocument(
      <AllegationCountWidget numOfAllegations={ 465 }/>
    );
    const instanceDOM = findRenderedDOMComponentWithClass(instance, 'test--allegation-widget');
    instanceDOM.textContent.should.containEql('465 allegations');
  });
});
