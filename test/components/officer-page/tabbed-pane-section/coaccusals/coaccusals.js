import React from 'react';
import { shallow } from 'enzyme';
import { stub } from 'sinon';

import Coaccusals from 'components/officer-page/tabbed-pane-section/coaccusals';
import styles from 'components/officer-page/tabbed-pane-section/coaccusals/coaccusals.sass';
import OfficerCard from 'components/common/officer-card';
import OfficerCardFooter from 'components/officer-page/tabbed-pane-section/coaccusals/officer-card-footer';


describe('Coaccusals component', function () {
  const addOrRemoveItemInPinboard = stub();

  it('should render enough groups and coaccusal cards', function () {
    const coaccusalGroups = [
      {
        name: 'COACCUSED 2-4 TIMES',
        coaccusals: [
          {
            officerName: 'officerName 1',
            complaintCount: 15,
            sustainedCount: 1,
            allegationPercentile: 59.0,
            age: 40,
            race: 'white',
            gender: 'male',
            coaccusalCount: 4,
          },
          {
            officerName: 'officerName 2',
            complaintCount: 10,
            sustainedCount: 1,
            allegationPercentile: 39.0,
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
            allegationPercentile: 19.0,
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

    const wrapper = shallow(
      <Coaccusals
        coaccusalGroups={ coaccusalGroups }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboard }
      />)
    ;

    const groups = wrapper.find('.coaccusals-group-name');
    groups.should.have.length(2);
    groups.at(0).text().should.equal('COACCUSED 2-4 TIMES');
    groups.at(1).text().should.equal('COACCUSED 1 TIME');

    const coaccusalCards = wrapper.find(OfficerCard);
    coaccusalCards.should.have.length(3);
    coaccusalCards.forEach((card, index) => {
      card.prop('className').should.eql(styles.officerCard);
      card.prop('addOrRemoveItemInPinboard').should.eql(addOrRemoveItemInPinboard);
      card.prop('footer').type.should.eql(OfficerCardFooter);
      card.prop('footer').props.coaccusalCount.should.eql(coaccusalCounts[index]);
    });
  });
});
