import React from 'react';
import { shallow } from 'enzyme';

import RankPane from 'components/common/preview-pane/panes/rank-pane';
import {
  HeaderWidget,
  ListWidget,
  SeparatorWidget,
} from 'components/common/preview-pane/widgets';


describe('RankPane component', () => {
  it('should contain the sub components', () => {
    const wrapper = shallow(
      <RankPane
        name='Chief'
        activeOfficersCount={ 1 }
        officersMostComplaints={ [{ id: '1' }] }
      />
    );
    const header = wrapper.find(HeaderWidget);
    header.prop('title').should.equal('Chief');
    wrapper.find(SeparatorWidget).should.have.length(2);

    const officersMostComplaints = wrapper.find(ListWidget);
    officersMostComplaints.prop('items').should.eql([{ id: '1' }]);
    officersMostComplaints.prop('title').should.equal('Chief with most complaint');
    officersMostComplaints.prop('typeName').should.equal('allegation');

    wrapper.find('.active-ranks').text().should.eql(
      '1 active Chief'
    );

    wrapper.find('.rank-description').text().should.eql(
      'The Chicago Police Department is organized by rank. ' +
      'Police Officers make up the bulk of the department, ' +
      'patrolling neighborhoods and serving on specialized teams.'
    );
  });

  it('should pluralize content', function () {
    const wrapper = shallow(
      <RankPane
        name='Chief'
        activeOfficersCount={ 12 }
        officersMostComplaints={ [] }
      />
    );

    wrapper.find('.active-ranks').text().should.eql(
      '12 active Chiefs'
    );
  });
});
