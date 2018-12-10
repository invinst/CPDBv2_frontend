import React from 'react';
import { renderIntoDocument, scryRenderedDOMComponentsWithClass, } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import Coaccusals from 'components/officer-page/tabbed-pane-section/coaccusals';
import officerStyles from 'components/common/officer-card.sass';


describe('Coaccusals component', function () {
  let instance;

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
        ]
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
          }
        ]
      },
    ];

    instance = renderIntoDocument(<Coaccusals coaccusalGroups={ coaccusalGroups }/>);

    const groups = scryRenderedDOMComponentsWithClass(instance, 'coaccusals-group-name');
    const coaccusalCards = scryRenderedDOMComponentsWithClass(instance, officerStyles.officerCard);

    groups.length.should.eql(2);
    coaccusalCards.length.should.eql(3);
    groups[0].textContent.should.eql('COACCUSED 2-4 TIMES');
    groups[1].textContent.should.eql('COACCUSED 1 TIME');
  });
});
