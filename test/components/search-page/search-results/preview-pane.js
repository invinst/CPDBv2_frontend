import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import PreviewPane from 'components/search-page/search-results/preview-pane';
import ShortList from 'components/common/short-list';


describe('PreviewPane component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render correctly', function () {
    const data = [
      ['unit', '001'],
      ['rank', null],
      ['2017 salary', '$99,999'],
      ['race', 'White'],
      ['sex', 'Male']
    ];
    instance = renderIntoDocument(
      <PreviewPane
        data={ data }
        visualTokenImg={ 'http://test.img' }
        backgroundColor={ 'red' }
        title={ 'Tsumiki Miniwa' }
      />
    );

    const title = findRenderedDOMComponentWithClass(instance, 'test--preview-pane-title');
    title.textContent.should.eql('Tsumiki Miniwa');

    const visualToken = findRenderedDOMComponentWithClass(instance, 'test--previiew-pane-visual-token');
    visualToken.getAttribute('src').should.eql(
      'http://test.img'
    );

    const shortList = findRenderedComponentWithType(instance, ShortList);
    shortList.props.data.should.eql(data);
  });
});
