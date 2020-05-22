import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import { OfficerSuggestion } from 'utils/test/factories/suggestion';
import SuggestionItem from 'components/search-page/search-results/suggestion-group/suggestion-item';
import RecentSuggestion from 'components/search-page/search-results/recent-suggestion';


describe('RecentSuggestion component', function () {
  it('should render correctly', function () {
    const suggestions = OfficerSuggestion.buildList(3);
    const pinboardUrl = '/pinboard/12f453/untitled-title';
    const visitPinButtonIntroductionSpy = spy();
    const wrapper = shallow(
      <RecentSuggestion
        pinboardUrl={ pinboardUrl }
        recentSuggestions={ suggestions }
        visitPinButtonIntroduction={ visitPinButtonIntroductionSpy }
        hide={ true }
      />
    );
    const suggestionItems = wrapper.find(SuggestionItem);
    suggestionItems.should.have.length(3);
    suggestionItems.at(0).prop('pinboardUrl').should.equal(pinboardUrl);
    suggestionItems.at(0).prop('visitPinButtonIntroduction').should.equal(visitPinButtonIntroductionSpy);
    suggestionItems.at(0).prop('hide').should.be.true();

    suggestionItems.at(1).prop('pinboardUrl').should.equal(pinboardUrl);
    suggestionItems.at(1).prop('visitPinButtonIntroduction').should.equal(visitPinButtonIntroductionSpy);
    suggestionItems.at(1).prop('hide').should.be.true();

    suggestionItems.at(2).prop('pinboardUrl').should.equal(pinboardUrl);
    suggestionItems.at(2).prop('visitPinButtonIntroduction').should.equal(visitPinButtonIntroductionSpy);
    suggestionItems.at(2).prop('hide').should.be.true();
  });
});
