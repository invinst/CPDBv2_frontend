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
import {
  CommunityPane,
  NeighborhoodPane,
} from 'components/search-page/preview-pane';


describe('PreviewPane component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
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

  it('should render NeighborhoodPane', function () {
    instance = renderIntoDocument(
      <PreviewPane
        type={ 'NEIGHBORHOOD' }
        data={ { name: 'Neighborhood' } }
      />
    );
    findRenderedComponentWithType(instance, NeighborhoodPane);
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
