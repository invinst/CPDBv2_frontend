import React from 'react';
import { shallow } from 'enzyme';

import Empty from 'components/officer-page/tabbed-pane-section/timeline/item/showings/empty';
import styles from 'components/officer-page/tabbed-pane-section/timeline/item/showings/empty/empty.sass';


describe('Empty component', function () {
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

    const wrapper = shallow(<Empty item={ emptyItem } hasBorderBottom={ false } />);

    const showing = wrapper.find(`.${styles.empty}`);
    showing.text().should.equal('');
  });
});
