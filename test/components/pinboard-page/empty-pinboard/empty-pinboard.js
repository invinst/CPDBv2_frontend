import React from 'react';
import { mount } from 'enzyme';
import { spy } from 'sinon';

import EmptyPinboard from 'components/pinboard-page/empty-pinboard';
import { buildEditStateFields } from 'utils/test/factories/draft';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';

describe('EmptyPinboard component', function () {
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

    const wrapper = mount(
      <EmptyPinboard
        examplePinboards={ examplePinboards }
        emptyPinboardTitleEditWrapperStateProps={ emptyPinboardTitleEditWrapperStateProps }
        emptyPinboardDescriptionEditWrapperStateProps={ emptyPinboardDescriptionEditWrapperStateProps }
      />
    );

    wrapper.getDOMNode().getAttribute('class').should.containEql('responsive-container');

    const editWrapperStateProviderTitle = wrapper.find(EditWrapperStateProvider).at(0);
    const hoverableEditWrapperTitle = editWrapperStateProviderTitle.find(HoverableEditWrapper);
    const editableTitle = hoverableEditWrapperTitle.find(RichTextEditable);
    editableTitle.prop('fieldname').should.equal('empty_pinboard_title');
    editableTitle.text().should.equal('Get started');

    const editWrapperStateProviderDescription = wrapper.find(EditWrapperStateProvider).at(1);
    const hoverableEditWrapperDescription = editWrapperStateProviderDescription.find(HoverableEditWrapper);
    const editableDescription = hoverableEditWrapperDescription.find(RichTextEditable);
    editableDescription.prop('fieldname').should.equal('empty_pinboard_description');
    editableDescription.text().should.containEql(
      'Use search to find officers and individual complaint records and ' +
      'press the plus button to add cards to your pinboard.'
    ).and.containEql(
      'Come back to the pinboard to give it a title and see a network map or discover relevant documents.'
    );

    const examplePinboardLinks = wrapper.find('a');
    examplePinboardLinks.should.have.length(2);

    const titles = wrapper.find('.title');
    const descriptions = wrapper.find('.description').hostNodes();
    titles.should.have.length(2);
    descriptions.should.have.length(2);

    titles.at(0).text().should.equal('Pinboard 1');
    descriptions.at(0).text().trim().should.equal('Description 1');

    titles.at(1).text().should.equal('Pinboard 2');
    descriptions.at(1).text().trim().should.equal('Description 2');

    wrapper.find('.arrow-head').exists().should.be.true();
    wrapper.find('.arrow-shaft').exists().should.be.true();
  });
});
