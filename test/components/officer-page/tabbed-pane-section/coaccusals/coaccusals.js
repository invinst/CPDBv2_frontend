import React from 'react';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';
import { stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import Coaccusals from 'components/officer-page/tabbed-pane-section/coaccusals';
import styles from 'components/officer-page/tabbed-pane-section/coaccusals/coaccusals.sass';
import OfficerCard from 'components/common/officer-card';
import OfficerCardFooter from 'components/officer-page/tabbed-pane-section/coaccusals/officer-card-footer';


describe('Coaccusals component', function () {
  let instance;
  const addOrRemoveItemInPinboard = stub();

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render enough groups and coaccusal cards', function () {
    const coaccusalGroups = [
      {
        name: 'COACCUSED 2-4 TIMES',
        coaccusals: [
          {
            officerName: 'officerName 1',
            complaintCount: 15,
            sustainedCount: 1,
            complaintPercentile: 59.0,
            age: 40,
            race: 'white',
            gender: 'male',
            coaccusalCount: 4,
          },
          {
            officerName: 'officerName 2',
            complaintCount: 10,
            sustainedCount: 1,
            complaintPercentile: 39.0,
            age: 40,
            race: 'white',
            gender: 'male',
            coaccusalCount: 2,
          },
        ],
      },
      {
        name: 'COACCUSED 1 TIME',
        coaccusals: [
          {
            officerName: 'officerName 3',
            complaintCount: 5,
            sustainedCount: 1,
            complaintPercentile: 19.0,
            age: 40,
            race: 'white',
            gender: 'male',
            coaccusalCount: 1,
          },
        ],
      },
    ];

    const coaccusalCounts = [
      coaccusalGroups[0].coaccusals[0].coaccusalCount,
      coaccusalGroups[0].coaccusals[1].coaccusalCount,
      coaccusalGroups[1].coaccusals[0].coaccusalCount,
    ];

    instance = renderIntoDocument(
      <Coaccusals
        coaccusalGroups={ coaccusalGroups }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
      />)
    ;

    const groups = scryRenderedDOMComponentsWithClass(instance, 'coaccusals-group-name');
    groups.length.should.eql(2);
    groups[0].textContent.should.eql('COACCUSED 2-4 TIMES');
    groups[1].textContent.should.eql('COACCUSED 1 TIME');

    const coaccusalCards = scryRenderedComponentsWithType(instance, OfficerCard);
    coaccusalCards.length.should.eql(3);
    coaccusalCards.forEach((card, index) => {
      card.props.className.should.eql(styles.officerCard);
      card.props.addOrRemoveItemInPinboard.should.eql(addOrRemoveItemInPinboard);
      card.props.footer.type.should.eql(OfficerCardFooter);
      card.props.footer.props.coaccusalCount.should.eql(coaccusalCounts[index]);
    });
  });
});
