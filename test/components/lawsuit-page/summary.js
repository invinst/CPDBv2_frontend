import React from 'react';
import { shallow } from 'enzyme';

import Summary from 'components/lawsuit-page/summary';


describe('Summary component', function () {
  it('should render correctly', function () {
    const summaryText = 'Hutchinson was shot and killed outside a bar near the Addison Red Line stop.';

    const wrapper = shallow(
      <Summary
        summary={ summaryText }
        className='summary-info'
      />
    );

    const summaryInfo = wrapper.find('.summary-info');
    summaryInfo.exists().should.be.true();
    summaryInfo.find('.summary-text').text().should.equal(summaryText);
  });

  it('should display show full summary when summary is not expanded', function () {
    const wrapper = shallow(<Summary />);
    wrapper.setState({ expanded: false });

    wrapper.text().should.containEql('Show full summary');
  });

  it('should not display show full summary when summary is expanded', function () {
    const wrapper = shallow(<Summary />);

    const showMoreButton = wrapper.find('.show-more-button');
    showMoreButton.simulate('click');

    wrapper.state('expanded').should.be.true();
  });
});
