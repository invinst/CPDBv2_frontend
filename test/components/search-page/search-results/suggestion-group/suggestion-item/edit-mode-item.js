import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router';

import EditModeItem from 'components/search-page/search-results/suggestion-group/suggestion-item/edit-mode-item';


describe('EditModeItem component', function () {
  context('aliasEditModeOn', function () {
    it('should be wrapped in <div>', function () {
      const wrapper = shallow(
        <EditModeItem aliasEditModeOn={ true }>
          <span />
        </EditModeItem>
      );

      wrapper.find('div').exists().should.be.true();
    });
  });

  context('aliasEditModeOff', function () {
    it('should render Link if redirectLink exist', function () {
      const wrapper = shallow(
        <EditModeItem aliasEditModeOn={ false } redirectLink='/officer/123' >
          <span />
        </EditModeItem>
      );

      const suggestionLink = wrapper.find(Link);
      suggestionLink.prop('to').should.equal('/officer/123');
    });

    it('should be wrapped in <a> if redirectLink does not exist', function () {
      const wrapper = shallow(
        <EditModeItem aliasEditModeOn={ false } redirectUrl='https://example.com/' >
          <span />
        </EditModeItem>
      );

      const suggestionLink = wrapper.find('a');
      suggestionLink.prop('href').should.equal('https://example.com/');
    });
  });
});
