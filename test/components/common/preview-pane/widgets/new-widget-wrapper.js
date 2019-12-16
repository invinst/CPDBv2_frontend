import React from 'react';
import MediaQuery from 'react-responsive';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';
import should from 'should';

import { NewWidgetWrapper, TextWidget, NewCallToActionWidget } from 'components/common/preview-pane/widgets';
import { unmountComponentSuppressError, reRender } from 'utils/test';
import WrapperLink from 'components/common/preview-pane/widgets/wrapper-link';


describe('NewWidgetWrapper component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should contain child components', () => {
    instance = renderIntoDocument(
      <NewWidgetWrapper callToAction={ { url: 'path', to: 'death', text: 'back' } }>
        <TextWidget title='title'/>
      </NewWidgetWrapper>
    );
    findRenderedComponentWithType(instance, TextWidget);
    const callToAction = findRenderedComponentWithType(instance, NewCallToActionWidget);
    callToAction.props.text.should.equal('back');

    findRenderedComponentWithType(instance, MediaQuery).props.maxHeight.should.equal(146);

    instance = reRender(
      <NewWidgetWrapper callToAction={ { text: 'back' } }>
        <TextWidget title='title'/>
      </NewWidgetWrapper>,
      instance
    );

    scryRenderedComponentsWithType(instance, NewCallToActionWidget).should.have.length(0);
    findRenderedComponentWithType(instance, MediaQuery).props.maxHeight.should.equal(106);
  });

  it('should not display overlay gradient if scrollable', function () {
    instance = renderIntoDocument(
      <NewWidgetWrapper yScrollable={ true }>
        <TextWidget title='title'/>
      </NewWidgetWrapper>
    );

    scryRenderedComponentsWithType(instance, MediaQuery).should.have.length(0);
  });

  describe('WrapperLink', function () {
    it('should render with correct props', function () {
      instance = renderIntoDocument(
        <NewWidgetWrapper callToAction={ { text: 'back', to: '/internal/link/', url: 'https://external/link' } }>
          <TextWidget title='title'/>
        </NewWidgetWrapper>
      );

      const wrapperLink = scryRenderedComponentsWithType(instance, WrapperLink)[0];
      wrapperLink.props.url.should.eql('https://external/link');
      wrapperLink.props.to.should.eql('/internal/link/');

      const callToActionWrapperLink = scryRenderedComponentsWithType(instance, WrapperLink)[1];
      should(callToActionWrapperLink.props.url).be.undefined();
      should(callToActionWrapperLink.props.to).be.undefined();
    });

    it('should render with correct props when not clickable', function () {
      instance = renderIntoDocument(
        <NewWidgetWrapper
          callToAction={ { text: 'back', to: '/internal/link/', url: 'https://external/link' } }
          isClickable={ false }
        >
          <TextWidget title='title'/>
        </NewWidgetWrapper>
      );
      const wrapperLink = scryRenderedComponentsWithType(instance, WrapperLink)[0];
      should(wrapperLink.props.url).be.undefined();
      should(wrapperLink.props.to).be.undefined();

      const callToActionWrapperLink = scryRenderedComponentsWithType(instance, WrapperLink)[1];
      callToActionWrapperLink.props.url.should.eql('https://external/link');
      callToActionWrapperLink.props.to.should.eql('/internal/link/');
    });
  });
});
