import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test/index';
import PrintNotes from 'components/common/print-notes';


describe('PrintNotes component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render notes correctly', function () {
    let notes = [
      {
        page: 'complaint',
        title: 'Investigator',
        name: 'investigator',
        text: 'this is investigator note.',
      },
      {
        page: 'complaint',
        title: 'Accused Officer',
        name: 'accused officer',
        text: 'this is accused officer note.'
      }
    ];
    instance = renderIntoDocument(<PrintNotes notes={ notes }/>);
    findRenderedDOMComponentWithClass(instance, 'notes-title').textContent.should.eql('Notes');
    const noteContents = scryRenderedDOMComponentsWithClass(instance, 'notes-content');
    noteContents.should.have.length(2);
    noteContents[0].textContent.should.eql('Investigator: this is investigator note.');
    noteContents[1].textContent.should.eql('Accused Officer: this is accused officer note.');
  });
});
