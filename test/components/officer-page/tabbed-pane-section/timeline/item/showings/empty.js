import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Empty from 'components/officer-page/tabbed-pane-section/timeline/item/showings/empty';
import styles from 'components/officer-page/tabbed-pane-section/timeline/item/showings/empty/empty.sass';


describe('Empty component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });


  it('should render item with no text in showing part', function () {
    const emptyItem = {
      date: '1994',
      hasData: true,
      isFirstRank: false,
      isLastRank: false,
      isFirstUnit: false,
      isLastUnit: false,
      kind: 'EMPTY',
      rank: 'Police Officer',
      unitName: '153',
    };

    instance = renderIntoDocument(<Empty item={ emptyItem } hasBorderBottom={ false } />);

    const showing = findRenderedDOMComponentWithClass(instance, styles.empty);
    showing.textContent.should.eql('');
  });
});
