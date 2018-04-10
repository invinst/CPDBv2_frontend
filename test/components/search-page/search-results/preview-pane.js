import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import PreviewPane from 'components/search-page/search-results/preview-pane';
import ShortList from 'components/common/short-list';
import CommunityPane from 'components/search-page/preview-pane/community-pane';


describe('PreviewPane component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render OfficerPane component', function () {
    const data = {
      officerInfo: {
        unit: '001',
        rank: null,
        salary: '$99,999',
        race: 'White',
        sex: 'Male',
      },
      title: 'Tsumiki Miniwa',
      visualTokenImg: 'http://test.img'
    };
    const convertedData = [
      ['unit', '001'],
      ['rank', null],
      ['salary', '$99,999'],
      ['race', 'White'],
      ['sex', 'Male'],
    ];
    instance = renderIntoDocument(
      <PreviewPane
        data={ data }
        type={ 'OFFICER' }
      />
    );

    const title = findRenderedDOMComponentWithClass(instance, 'test--preview-pane-title');
    title.textContent.should.eql('Tsumiki Miniwa');

    const visualToken = findRenderedDOMComponentWithClass(instance, 'test--preview-pane-visual-token');
    visualToken.getAttribute('src').should.eql(
      'http://test.img'
    );

    const shortList = findRenderedComponentWithType(instance, ShortList);
    shortList.props.data.should.eql(convertedData);
  });

  it('should render CommunityPane component', function () {
    instance = renderIntoDocument(
      <PreviewPane
        type={ 'COMMUNITY' }
        data={ { name: 'Community' } }
      />
    );
    findRenderedComponentWithType(instance, CommunityPane);
  });

  it('should not display any component if the data is empty', function () {
    instance = renderIntoDocument(
      <PreviewPane/>
    );
    scryRenderedDOMComponentsWithClass(instance, 'test--preview-pane').should.have.length(0);
  });

  it('should not render if type is not in the list', function () {
    instance = renderIntoDocument(
      <PreviewPane
        data={ { name: 'Community' } }
        type={ 'NOT_FOUND' }
      />
    );
    const instanceDOM = findRenderedDOMComponentWithClass(instance, 'test--preview-pane');
    instanceDOM.childNodes.should.have.length(0);
  });
});
