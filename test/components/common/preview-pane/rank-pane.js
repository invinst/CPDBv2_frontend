import React from 'react';
import { renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import RankPane from 'components/common/preview-pane/rank-pane';
import {
  HeaderWidget,
  ListWidget,
  SeparatorWidget,
} from 'components/common/preview-pane/widgets';
import { unmountComponentSuppressError } from 'utils/test';


describe('RankPane component', () => {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should contain the sub components', () => {
    instance = renderIntoDocument(
      <RankPane
        name='Chief'
        activeOfficersCount={ 1 }
        officersMostComplaints={ [{ id: '1' }] }
      />
    );
    const header = findRenderedComponentWithType(instance, HeaderWidget);
    header.props.title.should.eql('Chief');
    scryRenderedComponentsWithType(instance, SeparatorWidget).should.have.length(2);

    const officersMostComplaints = findRenderedComponentWithType(instance, ListWidget);
    officersMostComplaints.props.items.should.eql([{ id: '1' }]);
    officersMostComplaints.props.title.should.eql('Chief with most complaint');
    officersMostComplaints.props.typeName.should.eql('allegation');

    findRenderedDOMComponentWithClass(instance, 'active-ranks').textContent.should.eql(
      '1 active Chief'
    );

    findRenderedDOMComponentWithClass(instance, 'rank-description').textContent.should.eql(
      'The Chicago Police Department is organized by rank. ' +
      'Police Officers make up the bulk of the department, ' +
      'patrolling neighborhoods and serving on specialized teams.'
    );
  });

  it('should pluralize content', function () {
    instance = renderIntoDocument(
      <RankPane
        name='Chief'
        activeOfficersCount={ 12 }
        officersMostComplaints={ [] }
      />
    );

    findRenderedDOMComponentWithClass(instance, 'active-ranks').textContent.should.eql(
      '12 active Chiefs'
    );
  });
});
