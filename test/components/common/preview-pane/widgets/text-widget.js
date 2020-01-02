import React from 'react';
import { shallow } from 'enzyme';
import should from 'should';

import TextWidget from 'components/common/preview-pane/widgets/text-widget';


describe('TextWidget component', () => {
  it('should display text', () => {
    const wrapper = shallow(
      <TextWidget title={ 'CURRENT ALDERMAN' } content={ 'Firstname Lastname' }/>
    );
    const text = wrapper.find('p');
    text.at(0).text().should.containEql('CURRENT ALDERMAN');
    text.at(1).text().should.containEql('Firstname Lastname');
  });

  it('should not display when content is empty', () => {
    const wrapper = shallow(
      <TextWidget title={ 'CURRENT ALDERMAN' } content={ '' }/>
    );
    should(wrapper.type()).be.null();
  });
});
