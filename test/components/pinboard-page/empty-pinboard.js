import React, { Component } from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import EmptyPinboard from 'components/pinboard-page/empty-pinboard';
import { findDOMNode } from 'react-dom';

describe('EmptyPinboard element', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should have enough contents', function () {
    class TestComponent extends Component {
      render() {
        return EmptyPinboard;
      }
    }

    instance = renderIntoDocument(<TestComponent/>);

    findDOMNode(instance).className.should.containEql('responsive-container');

    findRenderedDOMComponentWithClass(instance, 'empty-pinboard-title').textContent.should.equal('Add');
    findRenderedDOMComponentWithClass(instance, 'empty-pinboard-description').textContent.should.containEql(
      'Add officers, or complaint records through search.'
    ).and.containEql('Or use an example pinboard as a baseline to get started.');

    scryRenderedDOMComponentsWithClass(instance, 'helper-row').should.have.length(2);
    const helperHeaders = scryRenderedDOMComponentsWithClass(instance, 'helper-header');
    const helperTexts = scryRenderedDOMComponentsWithClass(instance, 'helper-text');
    const helperArrows = scryRenderedDOMComponentsWithClass(instance, 'helper-arrow');
    helperHeaders.should.have.length(2);
    helperTexts.should.have.length(2);
    helperArrows.should.have.length(2);

    helperHeaders[0].textContent.should.equal('Repeaters');
    helperHeaders[1].textContent.should.equal('Skullcap crew');
    helperTexts[0].textContent.should.equal(
      'Officers with at least 10 complaints against them generate 64% of all complaints.'
    );
    helperTexts[1].textContent.should.equal(
      'Dogged by allegations of abuse, members of the group have been named in more than 20 federal lawsuits – yet h…'
    );

    findRenderedDOMComponentWithClass(instance, 'arrow-head');
    findRenderedDOMComponentWithClass(instance, 'arrow-shaft');
  });
});
