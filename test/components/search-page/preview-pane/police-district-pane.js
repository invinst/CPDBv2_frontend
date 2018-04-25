import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import PoliceDistrictPane from 'components/search-page/preview-pane/police-district-pane';
import {
  HeaderWidget,
  SeparatorWidget,
  GeoInfoWidget,
  AllegationCountWidget,
  ListWidget,
  CallToActionWidget,
} from 'components/search-page/preview-pane/widgets';


describe('PoliceDistrictPane component', () => {
  let instance;

  it('should contain the sub components', () => {
    instance = renderIntoDocument(<PoliceDistrictPane name={ '1st' }/>);

    const header = findRenderedComponentWithType(instance, HeaderWidget);
    findDOMNode(header).textContent.should.containEql('POLICE DISTRICT #1');
    findRenderedComponentWithType(instance, SeparatorWidget);
    findRenderedComponentWithType(instance, GeoInfoWidget);
    findRenderedComponentWithType(instance, AllegationCountWidget);
    scryRenderedComponentsWithType(instance, ListWidget).should.have.length(2);
    findRenderedComponentWithType(instance, CallToActionWidget);
  });
});
