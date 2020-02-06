import React from 'react';
import { spy } from 'sinon';

import SimpleTagsEditable from 'components/inline-editable/editable-section/simple-tag-editable';
import styles from 'components/inline-editable/editable-section/simple-tag-editable.sass';
import Editable from 'components/inline-editable/editable';
import { shallow, mount } from 'enzyme';


describe('SimpleTagsEditable component', function () {
  it('should render with given context', function () {
    const onChangeSpy = spy();
    const context = {
      fieldContexts: {
        'tags': {
          editModeOn: true,
          value: ['tag1', 'tag2'],
          onChange: onChangeSpy,
        },
      },
    };
    const wrapper = shallow(
      <SimpleTagsEditable fieldName='tags'/>, { context }
    );

    const editable = wrapper.find(Editable);
    editable.prop('editModeOn').should.be.true();

    editable.prop('editorElement').props.value.should.eql(['tag1', 'tag2']);
    editable.prop('editorElement').props.className.should.eql(styles.editableTagsinputInput);
    editable.prop('editorElement').props.onChange.should.eql(onChangeSpy);
    editable.prop('editorElement').props.inputProps.should.eql(
      { className: 'react-tagsinput-input', placeholder: 'Enter tags' }
    );
    editable.prop('editorElement').props.onlyUnique.should.be.true();
    editable.prop('editorElement').props.addKeys.should.eql([13, 188]);
    editable.prop('editorElement').props.addOnBlur.should.be.true();

    editable.prop('presenterElement').props.value.should.eql(['tag1', 'tag2']);
    editable.prop('presenterElement').props.className.should.eql(styles.editableTagsinputInput);
    editable.prop('presenterElement').props.inputProps.should.eql(
      { className: 'react-tagsinput-input', placeholder: '' }
    );
    editable.prop('presenterElement').props.disabled.should.be.true();
  });

  context('Autosuggest', function () {
    let wrapper;
    let onChangeSpy;

    beforeEach(function () {
      onChangeSpy = spy();
      const context = {
        fieldContexts: {
          'tags': {
            editModeOn: true,
            value: ['tag1', 'tag2'],
            onChange: onChangeSpy,
          },
        },
      };
      wrapper = mount(
        <SimpleTagsEditable
          fieldName='tags'
          suggestionTags={ ['tag1', 'tag2', 'tag3', 'tag4', 'other tag'] }
        />,
        { context }
      );
    });

    it('should render suggestion tags correctly', function () {
      let tagsInput = wrapper.find('TagsInput');
      tagsInput.prop('value').should.eql(['tag1', 'tag2']);

      let autosuggest = wrapper.find('Autosuggest');

      autosuggest.exists().should.be.true();
      autosuggest.prop('suggestions').should.eql(['tag3', 'tag4', 'other tag']);
    });

    it('should update suggestion tags on input change', function () {
      const autosuggest = wrapper.find('Autosuggest');
      const inputField = wrapper.find('input.react-tagsinput-input');

      inputField.simulate('change', { target: { value: 't' } });
      inputField.simulate('focus');
      autosuggest.prop('suggestions').should.eql(['tag3', 'tag4']);
    });
  });
});
