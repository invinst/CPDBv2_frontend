import React from 'react';
import should from 'should';
import { spy } from 'sinon';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import MinimapItem from 'components/officer-page/timeline-page/minimap-item';
import Minimap from 'components/officer-page/timeline-page/minimap';


describe('Minimap component', function () {
  let instance;
  const props = {
    minimap: [
      { year: '2015', items: [{ kind: 'CR', index: 3 }] }
    ]
  };

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    Minimap.should.be.renderable();
  });

  it('should invoke onItemClick when click on an item', function () {
    Minimap.should.triggerCallbackWhenClick('onItemClick', 'test--minimapitem', props, 3);
  });

  it('should set selectedItemIndex when click on an item', function () {
    instance = renderIntoDocument(<Minimap { ...props }/>);
    should.not.exists(instance.state.selectedItemIndex);
    scryRenderedComponentsWithType(instance, MinimapItem)[0].props.onClick();
    instance.state.selectedItemIndex.should.eql(3);
  });

  it('should set selectedItemIndex to null when receive different sort order', function () {
    instance = renderIntoDocument(<Minimap sortDescending={ true }/>);
    instance.setState({ selectedItemIndex: 10 });
    instance.state.selectedItemIndex.should.eql(10);
    instance = reRender(<Minimap sortDescending={ false }/>, instance);
    should.not.exists(instance.state.selectedItemIndex);
  });

  it('should invoke onItemHover when hover on an item', function () {
    const onItemHover = spy();
    instance = renderIntoDocument(<Minimap { ...props } onItemHover={ onItemHover }/>);
    scryRenderedComponentsWithType(instance, MinimapItem)[0].props.onHover(true);
    onItemHover.calledWith(3).should.be.true();
    scryRenderedComponentsWithType(instance, MinimapItem)[0].props.onHover(false);
    onItemHover.calledWith(null).should.be.true();
  });
});
