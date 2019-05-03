import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import PinnedType from 'components/pinboard-page/pinned-type';
import CRCard from 'components/pinboard-page/cards/cr-card';
import OfficerCard from 'components/pinboard-page/cards/officer-card';
import TRRCard from 'components/pinboard-page/cards/trr-card';


describe('PinnedType component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render CR cards', function () {
    const items = [{ 'id': '1' }, { 'id': '2' }];
    instance = renderIntoDocument(<PinnedType type='CR' items={ items } />);

    const crCards = scryRenderedComponentsWithType(instance, CRCard);
    crCards.should.have.length(2);
    crCards[0].props.item.id.should.eql('1');
    crCards[1].props.item.id.should.eql('2');
  });

  it('should render OFFICER cards', function () {
    const items = [{ 'id': '1' }, { 'id': '2' }];
    instance = renderIntoDocument(<PinnedType type='OFFICER' items={ items } />);

    const officerCards = scryRenderedComponentsWithType(instance, OfficerCard);
    officerCards.should.have.length(2);
    officerCards[0].props.item.id.should.eql('1');
    officerCards[1].props.item.id.should.eql('2');
  });

  it('should render TRR cards', function () {
    const items = [{ 'id': '1' }, { 'id': '2' }];
    instance = renderIntoDocument(<PinnedType type='TRR' items={ items } />);

    const trrCards = scryRenderedComponentsWithType(instance, TRRCard);
    trrCards.should.have.length(2);
    trrCards[0].props.item.id.should.eql('1');
    trrCards[1].props.item.id.should.eql('2');
  });

  it('should render newly added item with correct props', function () {
    const items = [{ 'id': '1' }, { 'id': '2' }];
    instance = renderIntoDocument(<PinnedType type='TRR' items={ items } />);
    const newItems = [{ 'id': '1' }, { 'id': '2' }, { 'id': '3' }];
    instance = reRender(<PinnedType type='TRR' items={ newItems } />, instance);

    const trrCards = scryRenderedComponentsWithType(instance, TRRCard);
    trrCards.should.have.length(3);
    trrCards[0].props.item.id.should.eql('1');
    trrCards[0].props.isAdded.should.be.false();
    trrCards[1].props.item.id.should.eql('2');
    trrCards[1].props.isAdded.should.be.false();
    trrCards[2].props.item.id.should.eql('3');
    trrCards[2].props.isAdded.should.be.true();
  });
});
