import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Items from 'components/social-graph-page/network/right-pane-section/timeline/item';
import Cr from 'components/social-graph-page/network/right-pane-section/timeline/item/cr';
import Year from 'components/social-graph-page/network/right-pane-section/timeline/item/year';


describe('Items component', function () {
  let instance;
  const allegationItem = {
    kind: 'CR',
    crid: '123456',
    incidentDate: 'OCT 8',
    year: 2006,
    category: 'Use of Force',
    attachments: [],
    key: '123456'
  };
  const yearItem = {
    kind: 'YEAR',
    year: 2005,
    hasData: true,
    key: '123456'
  };

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render allegation item correctly', function () {
    instance = renderIntoDocument(
      <Items
        item={ allegationItem }
      />
    );
    const allegationRow = scryRenderedComponentsWithType(instance, Cr);
    allegationRow.should.have.length(1);
  });

  it('should render year item correctly', function () {
    instance = renderIntoDocument(
      <Items
        item={ yearItem }
      />
    );
    const yearRow = scryRenderedComponentsWithType(instance, Year);
    yearRow.should.have.length(1);
  });
});
