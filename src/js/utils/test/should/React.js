import React, { createElement } from 'react';
import should from 'should';
import { Provider } from 'react-redux';
import { each, assign } from 'lodash';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';

import { MOBILE, TABLET, DESKTOP, EXTRA_WIDE } from 'utils/constants';


function assertRender(obj, props) {
  let wrapper;
  if (props && props.store) {
    const { store, ...otherProps } = props;
    wrapper = mount(
      <Provider store={ store }>
        { createElement(obj, otherProps) }
      </Provider>
    );
  } else {
    wrapper = mount(createElement(obj, props));
  }

  wrapper.exists().should.be.true();
}

should.Assertion.add('renderable', function (props) {
  this.params = { operator: 'to be rendered' };
  assertRender(this.obj, props);
});


should.Assertion.add('responsiveRenderable', function (props) {
  this.params = { operator: 'to be responsive-rendered' };
  let devices = [MOBILE, TABLET, DESKTOP, EXTRA_WIDE];

  each(devices, (device) => {
    assertRender(this.obj, assign({}, props, { device: device }));
  });
});

should.Assertion.add('triggerCallbackWhenClick', function (callbackProp, target=null, props={}, expectedArg=null) {
  const callback = spy();
  let wrapper = mount(createElement(this.obj, assign({}, props, { [callbackProp]: callback })));

  if (typeof target === 'string') {
    wrapper.find(target).simulate('click');
  } else {
    wrapper.simulate('click');
  }

  if (expectedArg !== null) {
    callback.calledWith(...expectedArg).should.be.true();
  } else {
    callback.called.should.be.true();
  }
});

should.Assertion.add('renderSubComponent', function () {
  function Dummy(props) {
    return <div/>;
  }

  const DecoratedDummy = this.obj(Dummy);
  const wrapper = shallow(<DecoratedDummy a='b'/>);
  wrapper.find(Dummy).prop('a').should.equal('b');
});
