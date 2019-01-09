import React from 'react';
import ReactDOM from 'react-dom';
import { findRenderedDOMComponentWithTag, scryRenderedDOMComponentsWithTag } from 'react-addons-test-utils';

import { renderWithContext, unmountComponentSuppressError } from 'utils/test';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';


describe('HoverableEditWrapper component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  context('edit mode off', function () {
    it('should render children element', function () {
      instance = renderWithContext(
        { editModeOn: false },
        <HoverableEditWrapper>abc1234</HoverableEditWrapper>
      );

      ReactDOM.findDOMNode(instance).textContent.should.containEql('abc1234');
    });
  });

  context('edit mode on', function () {
    it('should render children element', function () {
      instance = renderWithContext(
        { editModeOn: true },
        <HoverableEditWrapper>abc1234</HoverableEditWrapper>
      );

      ReactDOM.findDOMNode(instance).textContent.should.containEql('abc1234');
    });

    context('section edit mode off', function () {
      it('should render Edit button', function () {
        instance = renderWithContext(
          {
            editModeOn: true,
            sectionEditModeOn: false
          },
          <HoverableEditWrapper />
        );

        const editButton = findRenderedDOMComponentWithTag(instance, 'a');
        ReactDOM.findDOMNode(editButton).textContent.should.equal('Edit');
      });
    });

    context('section edit mode on', function () {
      it('should render Save and Cancel button', function () {
        instance = renderWithContext(
          {
            editModeOn: true,
            sectionEditModeOn: true
          },
          <HoverableEditWrapper />
        );

        const buttons = scryRenderedDOMComponentsWithTag(instance, 'a');
        buttons.should.have.length(2);
        buttons.map((button) => ReactDOM.findDOMNode(button).textContent).should.eql(['Save', 'Cancel']);
      });
    });
  });
});
