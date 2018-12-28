import React from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import SuggestionItem from 'components/search-page/search-results/suggestion-group/suggestion-item';
import OfficerItem from 'components/search-page/search-results/suggestion-group/suggestion-item/officer';
import CRItem from 'components/search-page/search-results/suggestion-group/suggestion-item/cr';
import SuggestionItemBase from 'components/search-page/search-results/suggestion-group/suggestion-item/base';
import { OfficerSuggestion, CRSuggestion } from 'utils/test/factories/suggestion';


describe('SuggestionItem component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render OfficerItem if type is OFFICER', function () {
    instance = renderIntoDocument(<SuggestionItem suggestion={ OfficerSuggestion.build() }/>);
    findRenderedComponentWithType(instance, OfficerItem).should.be.ok();
  });

  it('should render CRItem if type is CR', function () {
    instance = renderIntoDocument(<SuggestionItem suggestion={ CRSuggestion.build() }/>);
    findRenderedComponentWithType(instance, CRItem).should.be.ok();
  });

  it('should render SuggestionItemBase otherwise', function () {
    instance = renderIntoDocument(<SuggestionItem/>);
    findRenderedComponentWithType(instance, SuggestionItemBase).should.be.ok();
  });

  describe('shouldComponentUpdate', function () {
    it('should return true if props are changed', function () {
      instance = renderIntoDocument(<SuggestionItem/>);
      instance.shouldComponentUpdate({ hovering: true }).should.be.true();
      instance.shouldComponentUpdate({ isFocused: true }).should.be.true();
      instance.shouldComponentUpdate({ aliasEditModeOn: true }).should.be.true();
      instance.shouldComponentUpdate({ suggestion: { uniqueKey: 'OFFICER-123' } }).should.be.true();
    });

    it('should return false if props are unchanged', function () {
      instance = renderIntoDocument(<SuggestionItem/>);
      instance.shouldComponentUpdate({}).should.be.false();
    });
  });
});
