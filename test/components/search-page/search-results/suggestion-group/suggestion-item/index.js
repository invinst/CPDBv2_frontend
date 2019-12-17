import React from 'react';
import { shallow } from 'enzyme';

import SuggestionItem, { OfficerItem, CRItem, TRRItem, UnpinnableItem }
  from 'components/search-page/search-results/suggestion-group/suggestion-item';
import {
  OfficerSuggestion, CRSuggestion, DateOfficersSuggestion,
  UnitOfficersSuggestion, DateCRSuggestion, InvestigatorCRSuggestion,
  TRRSuggestion, DateTRRSuggestion,
} from 'utils/test/factories/suggestion';


describe('SuggestionItem component', function () {
  describe('shouldComponentUpdate', function () {
    it('should return true if props are changed', function () {
      const wrapper = shallow(<SuggestionItem suggestion={ { type: 'type', attr: 'value' } }/>);
      const instance = wrapper.instance();
      instance.shouldComponentUpdate({ isFocused: true }).should.be.true();
      instance.shouldComponentUpdate({ aliasEditModeOn: true }).should.be.true();
      instance.shouldComponentUpdate({ suggestion: { type: 'type', attr: 'new value' } }).should.be.true();
    });

    it('should return false if props are unchanged', function () {
      const wrapper = shallow(<SuggestionItem suggestion={ { type: 'type' } }/>);
      wrapper.instance().shouldComponentUpdate({ suggestion: { type: 'type' } }).should.be.false();
    });
  });

  describe('render', function () {
    it('should render OfficerItem if type is OFFICER', function () {
      const wrapper = shallow(<SuggestionItem suggestion={ OfficerSuggestion.build() }/>);
      wrapper.find(OfficerItem).exists().should.be.true();
    });

    it('should render OfficerItem if type is DATE > OFFICERS', function () {
      const wrapper = shallow(<SuggestionItem suggestion={ DateOfficersSuggestion.build() }/>);
      wrapper.find(OfficerItem).exists().should.be.true();
    });

    it('should render OfficerItem if type is UNIT > OFFICERS', function () {
      const wrapper = shallow(<SuggestionItem suggestion={ UnitOfficersSuggestion.build() }/>);
      wrapper.find(OfficerItem).exists().should.be.true();
    });

    it('should render CRItem if type is CR', function () {
      const wrapper = shallow(<SuggestionItem suggestion={ CRSuggestion.build() }/>);
      wrapper.find(CRItem).exists().should.be.true();
    });

    it('should render CRItem if type is DATE > CR', function () {
      const wrapper = shallow(<SuggestionItem suggestion={ DateCRSuggestion.build() }/>);
      wrapper.find(CRItem).exists().should.be.true();
    });

    it('should render CRItem if type is INVESTIGATOR > CR', function () {
      const wrapper = shallow(<SuggestionItem suggestion={ InvestigatorCRSuggestion.build() }/>);
      wrapper.find(CRItem).exists().should.be.true();
    });

    it('should render TRRItem if type is TRR', function () {
      const wrapper = shallow(<SuggestionItem suggestion={ TRRSuggestion.build() }/>);
      wrapper.find(TRRItem).exists().should.be.true();
    });

    it('should render TRRItem if type is DATE > TRR', function () {
      const wrapper = shallow(<SuggestionItem suggestion={ DateTRRSuggestion.build() }/>);
      wrapper.find(TRRItem).exists().should.be.true();
    });

    it('should render SuggestionItemBase otherwise', function () {
      const wrapper = shallow(<SuggestionItem suggestion={ { type: 'type' } }/>);
      wrapper.find(UnpinnableItem).exists().should.be.true();
    });
  });
});
