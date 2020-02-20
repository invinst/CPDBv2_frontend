import React from 'react';
import { shallow } from 'enzyme';
import { lorem } from 'faker';
import ReactMarkdown from 'react-markdown';

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
    const truncatedSubtitle = wrapper.find('.title-widget-subtitle');
    truncatedSubtitle.exists().should.be.true();
    const markdown = truncatedSubtitle.find(ReactMarkdown);
    markdown.prop('source').should.equal(subtitle);
  });
});
