import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
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

  it('should render into two columns if notes is greater than 4', function () {
    let notes = [
      {
        page: 'officer',
        title: 'Salary',
        name: 'salary',
        text: 'this is salary note.',
      },
      {
        page: 'officer',
        title: 'trr',
        name: 'trr',
        text: 'this is trr note.'
      },
      {
        page: 'officer',
        title: 'trr',
        name: 'trr',
        text: 'this is trr note.'
      },
      {
        page: 'officer',
        title: 'Sustained',
        name: 'sustained',
        text: 'this is sustained note.'
      },
      {
        page: 'officer',
        title: 'Allegation',
        name: 'allegation',
        text: 'this is allegation note.'
      },
      {
        page: 'officer',
        title: 'Major Award',
        name: 'major_award',
        text: 'this is major award note.'
      }
    ];
    instance = renderIntoDocument(<PrintNotes notes={ notes }/>);
    scryRenderedDOMComponentsWithClass(instance, 'notes-column').should.have.length(2);
    scryRenderedDOMComponentsWithClass(instance, 'notes-content').should.have.length(6);
  });
});
