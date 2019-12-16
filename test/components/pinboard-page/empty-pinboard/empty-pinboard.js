import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  scryRenderedComponentsWithType,
  findRenderedComponentWithType,
  scryRenderedDOMComponentsWithTag,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import EmptyPinboard from 'components/pinboard-page/empty-pinboard';
import { findDOMNode } from 'react-dom';
import { buildEditStateFields } from 'utils/test/factories/draft';
import { spy } from 'sinon';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';

describe('EmptyPinboard component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should have enough contents', function () {
    const fields = buildEditStateFields({
      'empty_pinboard_title': ['Get started'],
      'empty_pinboard_description': [
        'Use search to find officers and individual complaint records and ' +
        'press the plus button to add cards to your pinboard.',
        '',
        'Come back to the pinboard to give it a title and see a network map or discover relevant documents.',
      ],
    });

    const emptyPinboardTitleEditWrapperStateProps = {
      fields,
      sectionEditModeOn: false,
      onSaveForm: spy(),
      turnOnSectionEditMode: spy(),
      turnOffSectionEditMode: spy(),
    };

    const emptyPinboardDescriptionEditWrapperStateProps = {
      fields,
      sectionEditModeOn: false,
      onSaveForm: spy(),
      turnOnSectionEditMode: spy(),
      turnOffSectionEditMode: spy(),
    };

    const examplePinboards = [{
      id: '66ef1561',
      title: 'Pinboard 1',
      description: 'Description 1',
    }, {
      id: '66ef1562',
      title: 'Pinboard 2',
      description: 'Description 2',
    }];

    instance = renderIntoDocument(
      <EmptyPinboard
        examplePinboards={ examplePinboards }
        emptyPinboardTitleEditWrapperStateProps={ emptyPinboardTitleEditWrapperStateProps }
        emptyPinboardDescriptionEditWrapperStateProps={ emptyPinboardDescriptionEditWrapperStateProps }
      />
    );

    findDOMNode(instance).className.should.containEql('responsive-container');

    const editWrapperStateProviderTitle = scryRenderedComponentsWithType(instance, EditWrapperStateProvider)[0];
    const hoverableEditWrapperTitle = findRenderedComponentWithType(
      editWrapperStateProviderTitle, HoverableEditWrapper
    );
    const editableTitle = findRenderedComponentWithType(hoverableEditWrapperTitle, RichTextEditable);
    editableTitle.props.fieldname.should.equal('empty_pinboard_title');
    findDOMNode(editableTitle).textContent.should.equal('Get started');

    const editWrapperStateProviderDescription = scryRenderedComponentsWithType(instance, EditWrapperStateProvider)[1];
    const hoverableEditWrapperDescription = findRenderedComponentWithType(
      editWrapperStateProviderDescription, HoverableEditWrapper
    );
    const editableDescription = findRenderedComponentWithType(hoverableEditWrapperDescription, RichTextEditable);
    editableDescription.props.fieldname.should.equal('empty_pinboard_description');
    findDOMNode(editableDescription).textContent.should.containEql(
      'Use search to find officers and individual complaint records and ' +
      'press the plus button to add cards to your pinboard.'
    ).and.containEql(
      'Come back to the pinboard to give it a title and see a network map or discover relevant documents.'
    );

    const examplePinboardLinks = scryRenderedDOMComponentsWithTag(instance, 'a');
    examplePinboardLinks.should.have.length(2);

    const titles = scryRenderedDOMComponentsWithClass(instance, 'title');
    const descriptions = scryRenderedDOMComponentsWithClass(instance, 'description');
    titles.should.have.length(2);
    descriptions.should.have.length(2);

    titles[0].textContent.should.equal('Pinboard 1');
    descriptions[0].textContent.should.equal('Description 1…');

    titles[1].textContent.should.equal('Pinboard 2');
    descriptions[1].textContent.should.equal('Description 2…');

    findRenderedDOMComponentWithClass(instance, 'arrow-head');
    findRenderedDOMComponentWithClass(instance, 'arrow-shaft');
  });
});
