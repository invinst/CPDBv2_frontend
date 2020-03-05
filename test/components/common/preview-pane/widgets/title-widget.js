import React from 'react';
import { shallow } from 'enzyme';
import { lorem } from 'faker';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';

import TitleWidget from 'components/common/preview-pane/widgets/title-widget';


describe('OneLineListWidget component', () => {
  it('should render title and truncated subtitle', () => {
    const title = lorem.sentence(5);
    const subtitle = '**Test subtitle**';
    const wrapper = shallow(
      <TitleWidget
        title={ title }
        subtitle={ subtitle }
      />
    );

    wrapper.find('.title-widget-title').text().should.equal(title);
    const truncatedSubtitle = wrapper.find('.title-widget-subtitle');
    truncatedSubtitle.exists().should.be.true();
    const markdown = truncatedSubtitle.find(HTMLEllipsis);
    markdown.prop('unsafeHTML').trim().should.equal('<p><strong>Test subtitle</strong></p>');
  });
});
