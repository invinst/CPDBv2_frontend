import React from 'react';
import { shallow, mount } from 'enzyme';
import browserHistory from 'utils/history';
import sinon from 'sinon';

import TextInput from 'components/common/input';
import SearchBox from 'components/search-page/search-box';
import * as PathEditor from 'utils/edit-path';


describe('SearchBox component', function () {
  it('should pass correct props to Input', function () {
    const onEscape = sinon.spy();
    const onChange = sinon.spy();
    const resetNavigation = sinon.spy();

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
    input.props().should.not.have.key('onBlur');
    resetNavigation.should.not.be.called();
    input.prop('keyPressWithBlurHandlers').down();
    resetNavigation.should.be.calledOnce();
  });

  it('should call resetNavigation when pressing down in the text input and make it blur', function () {
    const resetNavigation = sinon.spy();
    const wrapper = shallow(
      <SearchBox
        resetNavigation={ resetNavigation }
        focused={ true }
      />
    );

    const textInputInstance = mount(wrapper.find(TextInput).get(0)).instance();
    const blur = sinon.spy(textInputInstance.input, 'blur');

    textInputInstance.mousetrap.trigger('down');

    blur.should.be.called();
    resetNavigation.should.be.called();
  });

  it('should not call resetNavigation when the input.blur is called', function () {
    const resetNavigation = sinon.spy();
    const wrapper = shallow(
      <SearchBox
        resetNavigation={ resetNavigation }
        focused={ true }
      />
    );

    const textInput = mount(wrapper.find(TextInput).get(0));
    const textInputInstance = textInput.instance();
    const handleBlur = sinon.spy(textInputInstance, 'handleBlur');

    textInput.find('input').simulate('focus');
    textInput.find('input').simulate('blur');

    handleBlur.should.be.calledOnce();
    resetNavigation.should.not.be.called();
  });

  it('should render input with disabled spellcheck', function () {
    const wrapper = mount(<SearchBox />);

    const input = wrapper.find('input');
    input.getDOMNode().getAttribute('spellcheck').should.equal('false');
    input.getDOMNode().getAttribute('autoComplete').should.equal('off');
    input.getDOMNode().getAttribute('autoCorrect').should.equal('off');
    input.getDOMNode().getAttribute('autoCapitalize').should.equal('off');
  });

  it('should render close button when there is a search query', function () {
    const wrapper = shallow(
      <SearchBox value='sa'/>
    );
    wrapper.find('.test--search-close-button').exists().should.be.true();
  });

  it('should changeSearchQuery to empty and go to search page on click close button', function () {
    const changeSearchQuery = sinon.spy();
    const pushPathPreserveEditMode = sinon.stub(PathEditor, 'pushPathPreserveEditMode');

    const wrapper = shallow(
      <SearchBox
        value='sa'
        changeSearchQuery={ changeSearchQuery }
      />
    );

    const closeButton = wrapper.find('.test--search-close-button');
    closeButton.simulate('click');

    changeSearchQuery.should.be.calledWith('');
    pushPathPreserveEditMode.should.be.calledWith('/search/');
  });

  describe('Enter event handler', function () {
    beforeEach(function () {
      this.browserHistoryPush = sinon.stub(browserHistory, 'push');
    });

    it('should push first result to when user hit ENTER if to is set', function () {
      const saveToRecentSpy = sinon.spy();
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

      const textInput = mount(wrapper.find(TextInput).get(0));
      const textInputInstance = textInput.instance();

      textInputInstance.mousetrap.trigger('enter');
      this.browserHistoryPush.should.be.calledWith('to');
      saveToRecentSpy.should.be.calledWith({
        type: 'OFFICER',
        id: 1,
        data: recentItemData,
      });
    });
  });
});
