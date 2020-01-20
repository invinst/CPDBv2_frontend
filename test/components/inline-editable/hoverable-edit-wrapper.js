import React from 'react';
import { shallow } from 'enzyme';

import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';


describe('HoverableEditWrapper component', function () {
  context('edit mode off', function () {
    it('should render children element', function () {
      const wrapper = shallow(
        <HoverableEditWrapper>abc1234</HoverableEditWrapper>,
        { context: { editModeOn: false } },
      );

      wrapper.text().should.containEql('abc1234');
    });
  });

  context('edit mode on', function () {
    it('should render children element', function () {
      const wrapper = shallow(
        <HoverableEditWrapper>abc1234</HoverableEditWrapper>,
        { context: { editModeOn: true } },
      );

      wrapper.text().should.containEql('abc1234');
    });

    context('section edit mode off', function () {
      it('should render Edit button', function () {
        const context = {
          editModeOn: true,
          sectionEditModeOn: false,
        };
        const wrapper = shallow(
          <HoverableEditWrapper />,
          { context },
        );

        const editButton = wrapper.find('a');
        editButton.text().should.equal('Edit');
      });
    });

    context('section edit mode on', function () {
      context('autoSave mode on', function () {
        it('should not render Save and Cancel button', function () {
          const context = {
            editModeOn: true,
            sectionEditModeOn: true,
            autoSave: true,
          };
          const wrapper = shallow(
            <HoverableEditWrapper />,
            { context },
          );

          const buttons = wrapper.find('a');
          buttons.should.have.length(0);
        });
      });

      context('autoSave mode off', function () {
        it('should render Save and Cancel button', function () {
          const context = {
            editModeOn: true,
            sectionEditModeOn: true,
            autoSave: false,
          };
          const wrapper = shallow(
            <HoverableEditWrapper />,
            { context },
          );

          const buttons = wrapper.find('a');
          buttons.should.have.length(2);
          buttons.map((button) => button.text()).should.eql(['Save', 'Cancel']);
        });
      });
    });
  });
});
