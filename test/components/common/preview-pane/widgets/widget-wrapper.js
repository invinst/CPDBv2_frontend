import React from 'react';
import { shallow } from 'enzyme';
import MediaQuery from 'react-responsive';

import WidgetWrapper, { TextWidget, CallToActionWidget } from 'components/common/preview-pane/widgets';


describe('WidgetWrapper component', function () {
  it('should contain children components', function () {
    const wrapper = shallow(
      <WidgetWrapper maxHeight={ 500 } callToAction={ { url: 'path', to: 'death', text: 'back' } }>
        <TextWidget title={ 'title' }/>
      </WidgetWrapper>
    );
    wrapper.find(TextWidget).exists().should.be.true();
    const callToAction = wrapper.find(CallToActionWidget);
    callToAction.prop('text').should.equal('back');

    const mediaQuery = wrapper.find(MediaQuery);
    mediaQuery.prop('maxHeight').should.equal(500);
  });

  it('should hide call to action if both url and to are missing', function () {
    const wrapper = shallow(
      <WidgetWrapper>
        <TextWidget title={ 'title' } />
      </WidgetWrapper>
    );
    wrapper.find(CallToActionWidget).exists().should.be.false();
  });

  it('should not display overlay at the bottom if yScrollable', function () {
    const wrapper = shallow(
      <WidgetWrapper yScrollable={ true }>
        <TextWidget title={ 'title' } />
      </WidgetWrapper>
    );
    wrapper.find(MediaQuery).exists().should.be.false();
  });
});
