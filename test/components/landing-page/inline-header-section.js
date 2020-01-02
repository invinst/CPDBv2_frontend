import React from 'react';
import { shallow } from 'enzyme';

import InlineHeaderSection from 'components/landing-page/inline-header-section';
import LinkTextEditable from 'components/inline-editable/editable-section/link-text-editable';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import { CAROUSEL_TYPES } from 'utils/constants';


describe('Carousel Inline Edit Header components', function () {
  it('should render inline edit elements', function () {
    const wrapper = shallow(<InlineHeaderSection type={ CAROUSEL_TYPES.COMPLAINT }/>);
    wrapper.find(LinkTextEditable).exists().should.be.true();
    wrapper.find(RichTextEditable).exists().should.be.true();
  });

  it('should render a single div if type does not match', function () {
    const wrapper = shallow(<InlineHeaderSection type='abc'/>);
    wrapper.find(LinkTextEditable).exists().should.be.false();
  });
});
