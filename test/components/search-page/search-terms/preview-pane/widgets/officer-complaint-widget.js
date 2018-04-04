import React from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithClass } from 'react-addons-test-utils';

import OfficerComplaintWidget from 'components/search-page/search-terms/preview-pane/widgets/officer-complaint-widget';


describe('OfficerComplaintWidget componnent', () => {
  let instance;

  it('should display officer name and number of allegations', () => {
    const officers = [
      {
        'name': 'Jerome Finigan',
        'allegation_count': 90,
      },
      {
        'name': 'Sean Campbell',
        'allegation_count': 32,
      },
    ];
    instance = renderIntoDocument(
      <OfficerComplaintWidget officers={ officers }/>
    );
    const instanceDOM = findRenderedDOMComponentWithClass(instance, 'test--officer-complaint-widget');
    const listItems = instanceDOM.getElementsByTagName('li');
    listItems[0].textContent.should.containEql('Jerome Finigan90 allegations');
    listItems[1].textContent.should.containEql('Sean Campbell32 allegations');
  });
});
