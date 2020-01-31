import React from 'react';
import { shallow, mount } from 'enzyme';
import MediaQuery from 'react-responsive';
import should from 'should';
import { mountWithRouter } from 'utils/test';

import { NewWidgetWrapper, TextWidget, NewCallToActionWidget } from 'components/common/preview-pane/widgets';
import WrapperLink from 'components/common/preview-pane/widgets/wrapper-link';


describe('NewWidgetWrapper component', function () {
  it('should contain child components', function () {
    const wrapper = mountWithRouter(
      <NewWidgetWrapper callToAction={ { url: 'path', to: 'death', text: 'back' } }>
        <TextWidget title='title'/>
      </NewWidgetWrapper>
    );
    wrapper.find(TextWidget).exists().should.be.true();
    const callToAction = wrapper.find(NewCallToActionWidget);
    callToAction.prop('text').should.equal('back');

    wrapper.find(MediaQuery).prop('maxHeight').should.equal(146);

    wrapper.setProps({ children: (
      <NewWidgetWrapper callToAction={ { callToAction: { text: 'back' } } }>
        <TextWidget title='title'/>
      </NewWidgetWrapper>) }
    );
    wrapper.update();

    wrapper.find(NewCallToActionWidget).exists().should.be.false();
    wrapper.find(MediaQuery).prop('maxHeight').should.equal(106);
  });

  it('should not display overlay gradient if scrollable', function () {
    const wrapper = mount(
      <NewWidgetWrapper yScrollable={ true }>
        <TextWidget title='title'/>
      </NewWidgetWrapper>
    );

    wrapper.find(MediaQuery).exists().should.be.false();
  });

  describe('WrapperLink', function () {
    it('should render with correct props', function () {
      const wrapper = shallow(
        <NewWidgetWrapper callToAction={ { text: 'back', to: '/internal/link/', url: 'https://external/link' } }>
          <TextWidget title='title'/>
        </NewWidgetWrapper>
      );

      const wrapperLink = wrapper.find(WrapperLink).at(0);
      wrapperLink.prop('url').should.equal('https://external/link');
      wrapperLink.prop('to').should.equal('/internal/link/');

      const callToActionWrapperLink = wrapper.find(WrapperLink).at(1);
      should(callToActionWrapperLink.props.url).be.undefined();
      should(callToActionWrapperLink.props.to).be.undefined();
    });

    it('should render with correct props when not clickable', function () {
      const wrapper = shallow(
        <NewWidgetWrapper
          callToAction={ { text: 'back', to: '/internal/link/', url: 'https://external/link' } }
          isClickable={ false }
        >
          <TextWidget title='title'/>
        </NewWidgetWrapper>
      );
      const wrapperLink = wrapper.find(WrapperLink).at(0);
      should(wrapperLink.props.url).be.undefined();
      should(wrapperLink.props.to).be.undefined();

      const callToActionWrapperLink = wrapper.find(WrapperLink).at(1);
      callToActionWrapperLink.prop('url').should.equal('https://external/link');
      callToActionWrapperLink.prop('to').should.equal('/internal/link/');
    });
  });
});
