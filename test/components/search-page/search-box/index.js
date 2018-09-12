import React from 'react';
import { browserHistory } from 'react-router';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithTag,
  Simulate
} from 'react-addons-test-utils';
import { spy, stub } from 'sinon';

import TextInput from 'components/common/input';
import SearchBox from 'components/search-page/search-box';
import { unmountComponentSuppressError } from 'utils/test';


describe('SearchBox component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    SearchBox.should.be.renderable();
  });

  it('should pass correct props to Input', function () {
    const onEscape = spy();
    const onChange = spy();
    const resetNavigation = spy();

    instance = renderIntoDocument(
      <SearchBox
        onEscape={ onEscape }
        onChange={ onChange }
        resetNavigation={ resetNavigation }
        value='wa'
      />
    );

    const input = findRenderedComponentWithType(instance, TextInput);
    input.props.value.should.eql('wa');
    input.props.keyPressHandlers.esc.should.eql(onEscape);
    input.props.onChange.should.equal(onChange);
    input.props.keyPressWithBlurHandlers.should.have.key('down');
  });

  it('should call resetNavigation when pressing down in the text input and make it blur', function () {
    const resetNavigation = spy();
    instance = renderIntoDocument(
      <SearchBox
        resetNavigation={ resetNavigation }
        focused={ true }
      />
    );

    const textInput = findRenderedComponentWithType(instance, TextInput);
    const blur = spy(textInput.input, 'blur');

    textInput.mousetrap.trigger('down');

    blur.called.should.be.true();
    resetNavigation.called.should.be.true();
  });

  it('should not call resetNavigation when the input.blur is called', function () {
    const resetNavigation = spy();
    instance = renderIntoDocument(
      <SearchBox
        resetNavigation={ resetNavigation }
        focused={ true }
      />
    );

    const inputElement = findRenderedDOMComponentWithTag(instance, 'input');
    Simulate.blur(inputElement);

    resetNavigation.called.should.be.false();
  });

  it('should render input with disabled spellcheck', function () {
    instance = renderIntoDocument(
      <SearchBox />
    );

    const input = findRenderedDOMComponentWithTag(instance, 'input');
    input.getAttribute('spellcheck').should.eql('false');
  });

  describe('Enter event handler', function () {
    beforeEach(function () {
      this.browserHistoryPush = stub(browserHistory, 'push');
    });

    afterEach(function () {
      this.browserHistoryPush.restore();
    });

    it('should push first result to when user hit ENTER if to is set', function () {
      const trackRecentSuggestion = spy();
      const firstSuggestionItem =
        {
          type: 'OFFICER',
          url: 'url',
          to: 'to',
          text: 'officer 1',
          recentText: 'Kevin'
        };


      instance = renderIntoDocument(
        <SearchBox firstSuggestionItem={ firstSuggestionItem } trackRecentSuggestion={ trackRecentSuggestion }/>
      );

      const input = findRenderedComponentWithType(instance, TextInput);
      input.mousetrap.trigger('enter');
      this.browserHistoryPush.calledWith('to').should.be.true();
      trackRecentSuggestion.calledWith('OFFICER', 'Kevin', 'url', 'to').should.be.true();
    });
  });
});
