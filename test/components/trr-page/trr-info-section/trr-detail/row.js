import React from 'react';

import Row from 'components/trr-page/trr-info-section/trr-detail/row';
import {
  renderIntoDocument, findRenderedComponentWithType, findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';
import { unmountComponentSuppressError } from 'utils/test';
import Popup from 'components/common/popup';


describe('Row component', function () {
  let instance;
  const popup = {
    title: 'Force Category',
    text: 'Some force category explanation',
  };

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render popup', function () {
    instance = renderIntoDocument(<Row popup={ popup } pathName='/trr/62131/'/>);
    const rowPopup = findRenderedComponentWithType(instance, Popup);
    rowPopup.props.title.should.eql('Force Category');
    rowPopup.props.text.should.eql('Some force category explanation');
    rowPopup.props.url.should.eql('/trr/62131/');
  });

  it(
    'should add inline-print class name to title and value to style differently if twoRowsWhenPrint is true',
    function () {
      instance = renderIntoDocument(<Row popup={ popup } pathName='/trr/62131/' twoRowsWhenPrint={ true }/>);
      findRenderedDOMComponentWithClass(instance, 'trr-detail-row-title').className.should.containEql('inline-print');
      findRenderedDOMComponentWithClass(instance, 'trr-detail-row-value').className.should.containEql('inline-print');
    }
  );

  it('should render empty DOM component with font-preload class name to preload bold font', function () {
    instance = renderIntoDocument(<Row popup={ popup } pathName='/trr/62131/'/>);
    findRenderedDOMComponentWithClass(instance, 'font-preload').textContent.should.eql(' ');
  });
});
