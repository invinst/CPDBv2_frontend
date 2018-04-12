import React from 'react';
import { renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import CensusTrackPane from 'components/search-page/preview-pane/census-track-pane';
import {
  HeaderWidget,
  GeoInfoWidget,
  AllegationCountWidget,
  ListWidget,
  CallToActionWidget,
} from 'components/search-page/preview-pane/widgets';


describe('CensusTrackPane component', () => {
  let instance;

  it('should contain the sub components', () => {
    instance = renderIntoDocument(<CensusTrackPane/>);
    findRenderedComponentWithType(instance, HeaderWidget);
    findRenderedComponentWithType(instance, GeoInfoWidget);
    findRenderedComponentWithType(instance, AllegationCountWidget);
    scryRenderedComponentsWithType(instance, ListWidget).should.have.length(1);
    findRenderedComponentWithType(instance, CallToActionWidget);
  });
});
