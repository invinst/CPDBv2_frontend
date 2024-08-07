import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import { InvolvedOfficerFactory } from 'utils/test/factories/officer';
import InvolvedOfficers from 'components/lawsuit-page/involved-officers';
import InvolvedOfficerCard from 'components/lawsuit-page/involved-officer-card';


describe('InvolvedOfficers component', function () {
  it('should render InvolvedOfficerCard', function () {
    const addOrRemoveItemInPinboardSpy = spy();
    const officers = InvolvedOfficerFactory.buildList(2);
    const wrapper = shallow(
      <InvolvedOfficers
        officers={ officers }
        addOrRemoveItemInPinboard={ addOrRemoveItemInPinboardSpy }
      />
    );
    const officerCard = wrapper.find(InvolvedOfficerCard);
    officerCard.should.have.length(2);
    officerCard.at(0).props().should.eql({
      addOrRemoveItemInPinboard: addOrRemoveItemInPinboardSpy,
      officer: officers[0],
    });
    officerCard.at(1).props().should.eql({
      addOrRemoveItemInPinboard: addOrRemoveItemInPinboardSpy,
      officer: officers[1],
    });
  });

  it('should display show more button when accused list is not expanded', function () {
    const wrapper = shallow(<InvolvedOfficers />);
    wrapper.setState({ expanded: false });

    wrapper.text().should.containEql('Show ALL Involved Officers (Defendants)');
  });

  it('should expand accused officers when click on show more button', function () {
    const wrapper = shallow(<InvolvedOfficers />);

    const showMoreButton = wrapper.find('.show-more-button');
    showMoreButton.simulate('click');

    wrapper.state('expanded').should.be.true();
  });
});
