import React from 'react';
import { shallow } from 'enzyme';

import OneLineListWidget from 'components/common/preview-pane/widgets/one-line-list-widget';


describe('OneLineListWidget component', function () {
  it('should render correctly', function () {
    const wrapper = shallow(
      <OneLineListWidget
        items={ [
          { title: 'Title 0', text: 'Text 0' },
          { text: 'Text 1' },
        ] }
      />
    );

    const list = wrapper.find('ul');

    const items = list.find('.list-item');
    items.should.have.length(2);

    items.at(0).find('.list-item-title').at(0).text().should.equal('Title 0');
    items.at(0).find('.list-item-text.has-title').at(0).text().should.equal('Text 0');
    items.at(0).children().last().prop('className').should.equal('clearfix');

    items.at(1).find('.list-item-text.has-title').should.have.length(0);
    items.at(1).find('.list-item-text').at(0).text().should.equal('Text 1');
    items.at(1).children().last().prop('className').should.equal('clearfix');
  });
});
