import React from 'react';
import { shallow, mount } from 'enzyme';
import PrintNotes from 'components/common/print-notes';


describe('PrintNotes component', function () {
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
        text: 'this is accused officer note.',
      },
    ];
    const wrapper = mount(<PrintNotes notes={ notes }/>);
    wrapper.find('.notes-title').text().should.equal('Notes');
    const noteContents = wrapper.find('.notes-content').hostNodes();
    noteContents.should.have.length(2);
    noteContents.at(0).text().should.equal('Investigator: this is investigator note.');
    noteContents.at(1).text().should.equal('Accused Officer: this is accused officer note.');
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
        text: 'this is trr note.',
      },
      {
        page: 'officer',
        title: 'trr',
        name: 'trr',
        text: 'this is trr note.',
      },
      {
        page: 'officer',
        title: 'Sustained',
        name: 'sustained',
        text: 'this is sustained note.',
      },
      {
        page: 'officer',
        title: 'Allegation',
        name: 'allegation',
        text: 'this is allegation note.',
      },
      {
        page: 'officer',
        title: 'Major Award',
        name: 'major_award',
        text: 'this is major award note.',
      },
    ];
    const wrapper = shallow(<PrintNotes notes={ notes }/>);
    wrapper.find('.notes-column').should.have.length(2);
    wrapper.find('.notes-content').should.have.length(6);
  });
});
