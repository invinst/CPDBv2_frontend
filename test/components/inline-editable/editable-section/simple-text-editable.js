import React from 'react';
import {
  findRenderedComponentWithType,
  findRenderedDOMComponentWithTag,
  Simulate
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import { renderWithContext } from 'utils/test';
import SimpleTextEditable from 'components/inline-editable/editable-section/simple-text-editable';
import Editable from 'components/inline-editable/editable';


describe('SimpleTextEditable component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render with given context', function () {
    const onChangeSpy = spy();
    instance = renderWithContext(
      {
        fieldContexts: {
          'title': {
            editModeOn: true,
            value: 'CRID 1083633 CR CRID 1083633 CR Tactical Response Report 2 (Glim)',
            onChange: onChangeSpy,
          }
        }
      },
      <SimpleTextEditable className='simple-text-editable' fieldName='title' placeholder='Title'/>
    );

    const editable = findRenderedComponentWithType(instance, Editable);
    editable.props.editModeOn.should.be.true();

    editable.props.presenterElement.props.className.should.containEql('simple-text-editable');
    editable.props.presenterElement.props.placeholder.should.eql('Title');
    editable.props.presenterElement.props.children.should.eql(
      'CRID 1083633 CR CRID 1083633 CR Tactical Response Report 2 (Glim)'
    );

    editable.props.presenterElement.props.className.should.eql('simple-text-editable');
    editable.props.presenterElement.props.placeholder.should.eql('Title');
    editable.props.presenterElement.props.children.should.eql(
      'CRID 1083633 CR CRID 1083633 CR Tactical Response Report 2 (Glim)'
    );

    const textArea = findRenderedDOMComponentWithTag(instance, 'textarea');
    textArea.value = 'New Title';
    Simulate.change(textArea);
    onChangeSpy.should.be.calledWith('New Title');
  });
});
