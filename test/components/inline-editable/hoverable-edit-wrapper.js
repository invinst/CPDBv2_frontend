import React from 'react';
import { mount } from 'enzyme';

import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import { EditModeContext, EditWrapperStateContext } from 'contexts';


describe('HoverableEditWrapper component', function () {
  context('edit mode off', function () {
    it('should render children element', function () {
      const wrapper = mount(
        <EditModeContext.Provider value={ { editModeOn: false } }>
          <HoverableEditWrapper>abc1234</HoverableEditWrapper>
        </EditModeContext.Provider>
      );

      wrapper.text().should.containEql('abc1234');
    });
  });

  context('edit mode on', function () {
    it('should render children element', function () {
      const wrapper = mount(
        <EditModeContext.Provider value={ { editModeOn: true } }>
          <HoverableEditWrapper>abc1234</HoverableEditWrapper>
        </EditModeContext.Provider>
      );

      wrapper.text().should.containEql('abc1234');
    });

    context('section edit mode off', function () {
      it('should render Edit button', function () {
        const wrapper = mount(
          <EditWrapperStateContext.Provider value={ { sectionEditModeOn: false } }>
            <EditModeContext.Provider value={ { editModeOn: true } }>
              <HoverableEditWrapper />
            </EditModeContext.Provider>
          </EditWrapperStateContext.Provider>
        );

        const editButton = wrapper.find('a');
        editButton.text().should.equal('Edit');
      });
    });

    context('section edit mode on', function () {
      it('should render Save and Cancel button', function () {
        const wrapper = mount(
          <EditWrapperStateContext.Provider value={ { sectionEditModeOn: true } }>
            <EditModeContext.Provider value={ { editModeOn: true } }>
              <HoverableEditWrapper />
            </EditModeContext.Provider>
          </EditWrapperStateContext.Provider>
        );

        const buttons = wrapper.find('a');
        buttons.should.have.length(2);
        buttons.map((button) => button.text()).should.eql(['Save', 'Cancel']);
      });
    });
  });
});
