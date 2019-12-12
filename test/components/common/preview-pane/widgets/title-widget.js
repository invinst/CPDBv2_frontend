import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';
import { lorem } from 'faker';
import Truncate from 'react-truncate';

import TitleWidget from 'components/common/preview-pane/widgets/title-widget';
import { unmountComponentSuppressError } from 'utils/test';


describe('OneLineListWidget component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render title and truncated subtitle', () => {
    const title = lorem.sentence(5);
    const subtitle = lorem.sentence(100);
    instance = renderIntoDocument(
      <TitleWidget
        title={ title }
        subtitle={ subtitle }
      />
    );

    findRenderedDOMComponentWithClass(instance, 'title-widget-title').textContent.should.equal(title);
    const truncatedSubtitle = findRenderedComponentWithType(instance, Truncate);
    truncatedSubtitle.props.className.should.equal('title-widget-subtitle');
    truncatedSubtitle.props.lines.should.equal(3);
    truncatedSubtitle.props.trimWhitespace.should.be.true();
    truncatedSubtitle.props.children.should.equal(subtitle);
  });
});
