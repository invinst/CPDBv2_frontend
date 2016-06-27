import React from 'react';

import Toggleable from 'components/common/toggleable';


describe('Toggleable higher order component', function () {
  const ComposedComponent = Toggleable(props => (<div className='click-me'/>));

  it('should trigger onClose when click while active', function () {
    let identifier = '1';
    ComposedComponent.should.triggerCallbackWhenClick(
      'onClose', 'click-me', { active: true, identifier: identifier }, identifier
    );
  });

  it('should trigger onOpen when click while inactive', function () {
    let identifier = '1';
    ComposedComponent.should.triggerCallbackWhenClick(
      'onOpen', 'click-me', { active: false, identifier: identifier }, identifier
    );
  });
});
