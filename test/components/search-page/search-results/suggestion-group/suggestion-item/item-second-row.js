import React, { Component } from 'react';
import { renderIntoDocument, findRenderedDOMComponentWithTag } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import {
  getOfficerSecondRowContent, getCRSecondRowContent
} from 'components/search-page/search-results/suggestion-group/suggestion-item/item-second-row';


describe('getOfficerSecondRowContent', function () {
  it('should return complaint and sustained', function () {
    const params = {
      suggestion: {
        complaintCount: 2,
        sustainedCount: 1,
      },
    };

    getOfficerSecondRowContent(params).should.be.equal('2 Complaints, 1 Sustained');
  });

  it('should return demographic, complaint and sustained', function () {
    const params = {
      suggestion: {
        age: 30,
        race: 'White',
        gender: 'Male',
        complaintCount: 2,
        sustainedCount: 1,
      },
    };

    getOfficerSecondRowContent(params).should.be.equal('30 year old, White, Male, 2 Complaints, 1 Sustained');
  });
});


describe('getCRSecondRowContent', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should return span with dangerouslySetInnerHTML setting', function () {
    const params = {
      suggestion: {
        subText: 'subText'
      }
    };

    class TestComponent extends Component {
      render() {
        return getCRSecondRowContent(params);
      }
    }

    instance = renderIntoDocument(<TestComponent />);
    findRenderedDOMComponentWithTag(instance, 'span').should.be.ok();
  });
});
