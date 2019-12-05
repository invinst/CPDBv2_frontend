import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';
import { date, lorem, random } from 'faker';
import moment from 'moment';

import { unmountComponentSuppressError } from 'utils/test';
import PinboardRow from 'components/pinboard-admin-page/pinboard-row';


describe('PinboardRow', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render info cells', function () {
    const id = random.word();
    const title = lorem.sentence(5);
    const pinnedCount = lorem.sentence(5);
    const childCount = random.number();
    const createdAt = moment(date.past()).format('MMM YY');

    instance = renderIntoDocument(
      <PinboardRow
        id={ id }
        title={ title }
        pinnedCount={ pinnedCount }
        childCount={ childCount }
        createdAt={ createdAt }
        isHeader={ false }
      />
    );
    findDOMNode(instance).getAttribute('class').should.containEql('row').and.not.containEql('header');

    const idCell = findRenderedDOMComponentWithClass(instance, 'pinboard-id');
    idCell.getAttribute('class').should.containEql('cell');
    idCell.textContent.should.equal(id);

    const titleCell = findRenderedDOMComponentWithClass(instance, 'pinboard-title');
    titleCell.getAttribute('class').should.containEql('cell');
    titleCell.textContent.should.equal(title);

    const pinnedCountCell = findRenderedDOMComponentWithClass(instance, 'pinboard-pinned');
    pinnedCountCell.getAttribute('class').should.containEql('cell');
    pinnedCountCell.textContent.should.equal(pinnedCount);

    const childCountCell = findRenderedDOMComponentWithClass(instance, 'pinboard-children');
    childCountCell.getAttribute('class').should.containEql('cell');
    childCountCell.textContent.should.equal(String(childCount));

    const dateCell = findRenderedDOMComponentWithClass(instance, 'pinboard-date');
    dateCell.getAttribute('class').should.containEql('cell');
    dateCell.textContent.should.equal(createdAt);
  });

  it('should add header class if isHeader is true', function () {
    const id = random.word();
    const title = lorem.sentence(5);
    const pinnedCount = lorem.sentence(5);
    const createdAt = moment(date.past()).format('MMM YY');

    instance = renderIntoDocument(
      <PinboardRow
        id={ id }
        title={ title }
        pinnedCount={ pinnedCount }
        createdAt={ createdAt }
        isHeader={ true }
      />
    );

    findDOMNode(instance).getAttribute('class').should.containEql('row').and.containEql('header');
  });
});
