import React from 'react';
import { shallow } from 'enzyme';
import { lorem } from 'faker';
import Truncate from 'react-truncate';

import TitleWidget from 'components/common/preview-pane/widgets/title-widget';


describe('OneLineListWidget component', () => {
  it('should render title and truncated subtitle', () => {
    const title = lorem.sentence(5);
    const subtitle = lorem.sentence(100);
    const wrapper = shallow(
      <TitleWidget
        title={ title }
        subtitle={ subtitle }
      />
    );

    wrapper.find('.title-widget-title').text().should.equal(title);
    const truncatedSubtitle = wrapper.find(Truncate);
    truncatedSubtitle.prop('className').should.equal('title-widget-subtitle');
    truncatedSubtitle.prop('lines').should.equal(3);
    truncatedSubtitle.prop('trimWhitespace').should.be.true();
    truncatedSubtitle.prop('children').should.equal(subtitle);
  });
});
