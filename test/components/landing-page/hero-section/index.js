import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import { HeroSection } from 'components/landing-page/hero-section';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import EditToggle from 'components/inline-editable/editable-section/edit-toggle';
import { unmountComponentSuppressError } from 'utils/test';


describe('HeroSection component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render three rich text fields and edit toggle', function () {
    instance = renderIntoDocument(<HeroSection/>);
    scryRenderedComponentsWithType(instance, RichTextEditable).length.should.eql(3);
    scryRenderedComponentsWithType(instance, EditToggle).length.should.eql(1);
  });
});
