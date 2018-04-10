import React from 'react';
import { renderIntoDocument, scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils';

import TextWidget from 'components/search-page/preview-pane/widgets/text-widget';


describe('TextWidget component', () => {
  let instance;

  it('should display text', () => {
    instance = renderIntoDocument(
      <TextWidget title={ 'CURRENT ALDERMAN' } content={ 'Firstname Lastname' }/>
    );
    const text = scryRenderedDOMComponentsWithTag(instance, 'p');
    text[0].textContent.should.containEql('CURRENT ALDERMAN');
    text[1].textContent.should.containEql('Firstname Lastname');
  });
});
