import React from 'react';
import { shallow } from 'enzyme';
import should from 'should';

import {
  getOfficerSecondRowContent, getCRSecondRowContent,
} from 'components/search-page/search-results/suggestion-group/suggestion-item/item-second-row';


describe('getOfficerSecondRowContent', function () {
  it('should return complaint and sustained', function () {
    const params = {
      suggestion: {
        complaintCount: 2,
        sustainedCount: 1,
      },
    };

    getOfficerSecondRowContent(params).should.equal('2 Complaints, 1 Sustained');
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

    getOfficerSecondRowContent(params).should.equal('30 year old, White, Male, 2 Complaints, 1 Sustained');
  });
});


describe('getCRSecondRowContent', function () {
  it('should return null if subText is empty', function () {
    const params = {
      suggestion: {},
    };

    should(getCRSecondRowContent(params)).be.null();
  });

  it('should return span with dangerouslySetInnerHTML setting', function () {
    const params = {
      suggestion: {
        subText: 'subText',
      },
    };

    function TestComponent(props) {
      return getCRSecondRowContent(params);
    }

    const wrapper = shallow(<TestComponent />);
    wrapper.find('span').exists().should.be.true();
  });
});
