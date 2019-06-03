import React, { Component } from 'react';
import { Link } from 'react-router';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import config from 'config';
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

    const links = scryRenderedComponentsWithType(instance, Link);
    links.should.have.length(2);

    links[0].props.className.should.equal('helper-row');
    links[0].props.to.should.equal(`/pinboard/${config.WattsCrewPinboardId}/`);
    findRenderedDOMComponentWithClass(links[0], 'helper-header').textContent.should.equal('Repeaters');
    findRenderedDOMComponentWithClass(links[0], 'helper-text').textContent.should.equal(
      'Officers with at least 10 complaints against them generate 64% of all complaints.'
    );
    findRenderedDOMComponentWithClass(links[0], 'helper-arrow');

    links[1].props.className.should.equal('helper-row');
    links[1].props.to.should.equal(`/pinboard/${config.SkullcapCrewPinboardId}/`);
    findRenderedDOMComponentWithClass(links[1], 'helper-header').textContent.should.equal('Skullcap crew');
    findRenderedDOMComponentWithClass(links[1], 'helper-text').textContent.should.equal(
      'Dogged by allegations of abuse, members of the group have been named in more than 20 federal lawsuits – yet h…'
    );
    findRenderedDOMComponentWithClass(links[1], 'helper-arrow');

    findRenderedDOMComponentWithClass(instance, 'arrow-head');
    findRenderedDOMComponentWithClass(instance, 'arrow-shaft');
  });
});
