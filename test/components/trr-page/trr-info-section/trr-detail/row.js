import React from 'react';

import Row from 'components/trr-page/trr-info-section/trr-detail/row';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test';
import Popup from 'components/common/popup';


describe('Row component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render popup', function () {
    const popup = {
      title: 'Force Category',
      text: 'Some force category explanation',
    };
    instance = renderIntoDocument(<Row popup={ popup } />);
    const rowPopup = findRenderedComponentWithType(instance, Popup);
    rowPopup.props.title.should.eql('Force Category');
    rowPopup.props.text.should.eql('Some force category explanation');
  });
});
