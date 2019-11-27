import React from 'react';
import { shallow } from 'enzyme';

import NewCallToActionWidget from 'components/common/preview-pane/widgets/new-call-to-action-widget';


describe('NewCallToActionWidget component', function () {
  it('should render enough content', () => {
    const wrapper = shallow(
      <NewCallToActionWidget text={ 'Custom Text' }/>
    );

    const text = wrapper.find('.new-call-to-action-widget-text');
    text.text().should.equal('Custom Text');
    wrapper.find('.new-call-to-action-widget-button').exists().should.be.true();
  });

  it('should have default text', () => {
    const wrapper = shallow(<NewCallToActionWidget/>);

    const text = wrapper.find('.new-call-to-action-widget-text');
    text.text().should.equal('View on the Data Tool');
  });
});
