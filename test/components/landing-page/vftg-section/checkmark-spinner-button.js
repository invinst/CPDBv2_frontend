import React from 'react';
import { StyleRoot } from 'radium';
import { findDOMNode } from 'react-dom';
import { spy } from 'sinon';
import {
  renderIntoDocument, findRenderedComponentWithType, Simulate, findRenderedDOMComponentWithTag
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import CheckmarkSpinnerButton from 'components/landing-page/vftg-section/checkmark-spinner-button';
import Spinner from 'components/animation/spinner';
import Checkmark from 'components/animation/checkmark';
import Crossmark from 'components/animation/crossmark';
import { FORM_INITIAL, FORM_LOADING, FORM_SUCCESS, FORM_FAILURE } from 'utils/constants';


describe('CheckmarkSpinnerButton component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    CheckmarkSpinnerButton.should.be.renderable();
  });

  it('should render text if state is initial', function () {
    instance = renderIntoDocument(<CheckmarkSpinnerButton state={ FORM_INITIAL }>text</CheckmarkSpinnerButton>);
    findDOMNode(instance).textContent.should.containEql('text');
  });

  it('should render spinner if state is loading', function () {
    instance = renderIntoDocument(<StyleRoot><CheckmarkSpinnerButton state={ FORM_LOADING }/></StyleRoot>);
    findRenderedComponentWithType(instance, Spinner);
  });

  it('should render check mark if state is success', function () {
    instance = renderIntoDocument(<CheckmarkSpinnerButton state={ FORM_SUCCESS }/>);
    findRenderedComponentWithType(instance, Checkmark);
  });

  it('should render cross if state is failure', function () {
    instance = renderIntoDocument(<CheckmarkSpinnerButton state={ FORM_FAILURE }/>);
    findRenderedComponentWithType(instance, Crossmark);
  });

  it('should trigger onClick callback in initial state', function () {
    CheckmarkSpinnerButton.should.triggerCallbackWhenClick('onClick', null, { state: FORM_INITIAL });
  });

  it('should not trigger onClick callback in other states', function () {
    CheckmarkSpinnerButton.should.not.triggerCallbackWhenClick('onClick', null, { state: FORM_FAILURE });
    CheckmarkSpinnerButton.should.not.triggerCallbackWhenClick('onClick', null, { state: FORM_SUCCESS });
    const cb = spy();
    instance = renderIntoDocument(
      <StyleRoot>
        <CheckmarkSpinnerButton state={ FORM_LOADING } onClick={ cb }/>
      </StyleRoot>
      );
    const button = findRenderedDOMComponentWithTag(instance, 'button');
    Simulate.click(button);
    cb.called.should.not.be.true();
  });
});
