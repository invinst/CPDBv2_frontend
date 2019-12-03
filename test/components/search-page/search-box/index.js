import React from 'react';
import { shallow } from 'enzyme';
import { browserHistory } from 'react-router';
import { spy, stub } from 'sinon';

import TextInput from 'components/common/input';
import SearchBox from 'components/search-page/search-box';
import * as PathEditor from 'utils/edit-path';


describe('SearchBox component', function () {
  it('should pass correct props to Input', function () {
    const onEscape = spy();
    const onChange = spy();
    const resetNavigation = spy();

    const wrapper = shallow(
      <SearchBox
        onEscape={ onEscape }
        onChange={ onChange }
        resetNavigation={ resetNavigation }
        value='wa'
      />
    );

    const input = wrapper.find(TextInput);
    input.prop('value').should.equal('wa');
    input.prop('keyPressHandlers').esc.should.eql(onEscape);
    input.prop('onChange').should.equal(onChange);
    input.prop('keyPressWithBlurHandlers').should.have.key('down');
  });

  it('should call resetNavigation when pressing down in the text input and make it blur', function () {
    const resetNavigation = spy();
    const wrapper = shallow(
      <SearchBox
        resetNavigation={ resetNavigation }
        focused={ true }
      />
    );

    const textInput = wrapper.find(TextInput).dive();

    const blur = spy(textInput.instance().input, 'blur');

    textInput.mousetrap.trigger('down');

    blur.should.be.called();
    resetNavigation.should.be.called();
  });

  it('should not call resetNavigation when the input.blur is called', function () {
    const resetNavigation = spy();
    const wrapper = shallow(
      <SearchBox
        resetNavigation={ resetNavigation }
        focused={ true }
      />
    );

    const inputElement = wrapper.find('input');
    inputElement.simulate('blur');

    resetNavigation.called.should.be.false();
  });

  it('should render input with disabled spellcheck', function () {
    const wrapper = shallow(
      <SearchBox />
    );

    const input = wrapper.find('input');
    input.getAttribute('spellcheck').should.equal('false');
  });

  it('should render close button when there is a search query', function () {
    const wrapper = shallow(
      <SearchBox value='sa'/>
    );
    wrapper.find('.test--search-close-button').exists().should.be.true();
  });

  it('should changeSearchQuery to empty and go to search page on click close button', function () {
    const changeSearchQuery = spy();
    const pushPathPreserveEditMode = stub(PathEditor, 'pushPathPreserveEditMode');

    const wrapper = shallow(
      <SearchBox
        value='sa'
        changeSearchQuery={ changeSearchQuery }
      />
    );

    const closeButton = wrapper.find('.test--search-close-button');
    closeButton.simulate('click');

    changeSearchQuery.should.be.calledWith('');
    pushPathPreserveEditMode.should.be.calledWith('search/');

    pushPathPreserveEditMode.restore();
  });

  describe('Enter event handler', function () {
    beforeEach(function () {
      this.browserHistoryPush = stub(browserHistory, 'push');
    });

    afterEach(function () {
      this.browserHistoryPush.restore();
    });

    it('should push first result to when user hit ENTER if to is set', function () {
      const saveToRecentSpy = spy();
      const recentItemData = {
        'id': 123,
        'full_name': 'Jerome Finnigan',
        'rank': 'Officer',
        'complaint_count': 22,
        'percentile': {
          'percentile_trr': 20.6,
          'percentile_allegation_internal': 10.1,
          'percentile_allegation_civilian': 52.5,
        },
      };
      const firstSuggestionItem =
        {
          type: 'OFFICER',
          id: 1,
          url: 'url',
          to: 'to',
          text: 'officer 1',
          recentText: 'Kevin',
          recentItemData: recentItemData,
        };


      const wrapper = shallow(
        <SearchBox firstSuggestionItem={ firstSuggestionItem } saveToRecent={ saveToRecentSpy }/>
      );

      const input = wrapper.find(TextInput);
      input.mousetrap.trigger('enter');
      this.browserHistoryPush.should.be.calledWith('to');
      saveToRecentSpy.should.be.calledWith({
        type: 'OFFICER',
        id: 1,
        data: recentItemData,
      });
    });
  });
});
