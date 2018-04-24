import React from 'react';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';

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

  it('should not display when content is empty', () => {
    instance = renderIntoDocument(
      <TextWidget title={ 'CURRENT ALDERMAN' } content={ '' }/>
    );
    scryRenderedDOMComponentsWithClass(instance, 'test--text-widget').should.have.length(0);
  });
});
