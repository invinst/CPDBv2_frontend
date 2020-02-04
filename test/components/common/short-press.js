import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import ShortPress from 'components/common/short-press';


describe('ShortPress component', function () {
  it('should render its children', function () {
    const wrapper = shallow(
      <ShortPress>
        <div className='test--classname' />
      </ShortPress>
    );

    wrapper.find('.test--classname').exists().should.be.true();
  });

  it('should call action when click on', function () {
    const action = sinon.spy();
    const wrapper = shallow(
      <ShortPress action={ action }>
        <div />
      </ShortPress>
    );

    wrapper.simulate('mouseDown', { screenX: 100, screenY: 200 });
    wrapper.simulate('mouseUp', { screenX: 100, screenY: 200 });

    action.should.be.called();
  });

  it('should call action when touch on', function () {
    const action = sinon.spy();
    const wrapper = shallow(
      <ShortPress action={ action }>
        <div />
      </ShortPress>
    );

    wrapper.simulate('touchStart', { screenX: 100, screenY: 200 });
    wrapper.simulate('touchEnd', { screenX: 100, screenY: 200 });

    action.should.be.called();
  });

  it('should not call action when dragging', function () {
    const action = sinon.spy();
    const wrapper = shallow(
      <ShortPress action={ action }>
        <div />
      </ShortPress>
    );

    wrapper.simulate('mouseDown', { screenX: 100, screenY: 200 });
    wrapper.simulate('mouseUp', { screenX: 200, screenY: 300 });

    action.called.should.be.false();
  });

  it('should not call action when dragging by touching', function () {
    const action = sinon.spy();
    const wrapper = shallow(
      <ShortPress action={ action }>
        <div />
      </ShortPress>
    );

    wrapper.simulate('touchStart', { screenX: 100, screenY: 200 });
    wrapper.simulate('touchEnd', { screenX: 200, screenY: 300 });

    action.called.should.be.false();
  });

  it('should call action with short click', function () {
    const action = sinon.spy();
    const wrapper = shallow(
      <ShortPress action={ action }>
        <div />
      </ShortPress>
    );

    const clock = sinon.useFakeTimers();
    wrapper.simulate('mouseDown', { screenX: 100, screenY: 200 });
    clock.tick(10);
    wrapper.simulate('mouseUp', { screenX: 100, screenY: 200 });

    action.should.be.called();
  });

  it('should not call action with long click', function () {
    const action = sinon.spy();
    const wrapper = shallow(
      <ShortPress action={ action }>
        <div />
      </ShortPress>
    );

    const clock = sinon.useFakeTimers();
    wrapper.simulate('mouseDown', { screenX: 100, screenY: 200 });
    clock.tick(500);
    wrapper.simulate('mouseUp', { screenX: 200, screenY: 300 });

    action.called.should.be.false();
  });
});
