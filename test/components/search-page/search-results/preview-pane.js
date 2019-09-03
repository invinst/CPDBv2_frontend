import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
  scryRenderedDOMComponentsWithClass,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import PreviewPane from 'components/search-page/search-results/preview-pane';
import {
  CommunityPane,
  NeighborhoodPane,
  WardPane,
  PoliceBeatPane,
  PoliceDistrictPane,
  SchoolGroundPane,
  OfficerPane,
  RankPane,
  SearchTermItemPane,
  CRPane,
  TRRPane,
} from 'components/common/preview-pane';


describe('PreviewPane component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render CommunityPane component', function () {
    instance = renderIntoDocument(
      <PreviewPane
        type='COMMUNITY'
        data={ { name: 'Community' } }
      />
    );
    findRenderedComponentWithType(instance, CommunityPane);
  });

  it('should render NeighborhoodPane', function () {
    instance = renderIntoDocument(
      <PreviewPane
        type='NEIGHBORHOOD'
        data={ { name: 'Neighborhood' } }
      />
    );
    findRenderedComponentWithType(instance, NeighborhoodPane);
  });

  it('should render OfficerPane', function () {
    instance = renderIntoDocument(
      <PreviewPane
        type='OFFICER'
        data={ { name: 'Officer' } }
      />
    );
    findRenderedComponentWithType(instance, OfficerPane).should.be.ok();
  });

  it('should render WardPane', function () {
    instance = renderIntoDocument(
      <PreviewPane
        type='WARD'
        data={ { name: 'Ward' } }
      />
    );
    findRenderedComponentWithType(instance, WardPane);
  });

  it('should render PoliceBeatPane', function () {
    instance = renderIntoDocument(
      <PreviewPane
        type='BEAT'
        data={ { name: 'Beat' } }
      />
    );
    findRenderedComponentWithType(instance, PoliceBeatPane);
  });

  it('should render PoliceDistrictPane', function () {
    instance = renderIntoDocument(
      <PreviewPane
        type='POLICE-DISTRICT'
        data={ { name: 'Police District' } }
      />
    );
    findRenderedComponentWithType(instance, PoliceDistrictPane);
  });

  it('should render SchoolGroundPane', function () {
    instance = renderIntoDocument(
      <PreviewPane
        type='SCHOOL-GROUND'
        data={ { name: 'School Ground' } }
      />
    );
    findRenderedComponentWithType(instance, SchoolGroundPane);
  });

  it('should render RankPane', function () {
    instance = renderIntoDocument(
      <PreviewPane
        type='RANK'
        data={ { name: 'Chief' } }
      />
    );
    findRenderedComponentWithType(instance, RankPane);
  });

  it('should render SearchTermItemPane', function () {
    instance = renderIntoDocument(
      <PreviewPane
        type={ 'SEARCH-TERMS' }
        data={ { name: 'Search Terms' } }
      />
    );
    findRenderedComponentWithType(instance, SearchTermItemPane);
  });

  it('should render CRPane', function () {
    instance = renderIntoDocument(
      <PreviewPane
        type='CR'
        data={ {
          to: '/complaint/123/',
          category: 'Use Of Force',
          subCategory: 'Excessive Force - Use Of Firearm / Off Duty - No Injury',
          incidentDate: 'JUL 2, 2012',
          address: '14XX W 63RD ST, CHICAGO IL 60636',
          victims: ['Hispanic, Female', 'Hispanic, Female, Age 48'],
          coaccused: [],
        } }
      />
    );
    findRenderedComponentWithType(instance, CRPane);
  });

  it('should render CRPane for Date > CR', function () {
    instance = renderIntoDocument(
      <PreviewPane
        type='DATE > CR'
        data={ {
          to: '/complaint/123/',
          category: 'Use Of Force',
          subCategory: 'Excessive Force - Use Of Firearm / Off Duty - No Injury',
          incidentDate: 'JUL 2, 2012',
          address: '14XX W 63RD ST, CHICAGO IL 60636',
          victims: ['Hispanic, Female', 'Hispanic, Female, Age 48'],
          coaccused: [],
        } }
      />
    );
    findRenderedComponentWithType(instance, CRPane);
  });

  it('should render CRPane for INVESTIGATOR > CR', function () {
    instance = renderIntoDocument(
      <PreviewPane
        type='INVESTIGATOR > CR'
        data={ {
          to: '/complaint/123/',
          category: 'Use Of Force',
          subCategory: 'Excessive Force - Use Of Firearm / Off Duty - No Injury',
          incidentDate: 'JUL 2, 2012',
          address: '14XX W 63RD ST, CHICAGO IL 60636',
          victims: ['Hispanic, Female', 'Hispanic, Female, Age 48'],
          coaccused: [],
        } }
      />
    );
    findRenderedComponentWithType(instance, CRPane);
  });

  it('should render TRRPane for TRR', function () {
    instance = renderIntoDocument(
      <PreviewPane
        type='TRR'
        data={ {
          subText: 'TRR # 123456 - February 3, 2017',
          category: 'Firearm',
          incidentDate: '2017-02-03',
          address: '14XX W 63RD ST, CHICAGO IL 60636',
          officer: {
            id: 16567,
            name: 'Baudilio Lopez',
            url: '/officer/16567/baudilio-lopez/',
            radarAxes: [
              { axis: 'Use of Force Reports', value: 72.1094 },
              { axis: 'Officer Allegations', value: 61.1521 },
              { axis: 'Civilian Allegations', value: 98.5549 },
            ],
            radarColor: '#f0201e',
            count: 93,
          },
          to: '/trr/123456/',
        } }
      />
    );
    findRenderedComponentWithType(instance, TRRPane).should.be.ok();
  });

  it('should render TRRPane for Date > TRR', function () {
    instance = renderIntoDocument(
      <PreviewPane
        type='DATE > TRR'
        data={ {
          subText: 'TRR # 123456 - February 3, 2017',
          category: 'Firearm',
          incidentDate: '2017-02-03',
          address: '14XX W 63RD ST, CHICAGO IL 60636',
          officer: {
            id: 16567,
            name: 'Baudilio Lopez',
            url: '/officer/16567/baudilio-lopez/',
            radarAxes: [
              { axis: 'Use of Force Reports', value: 72.1094 },
              { axis: 'Officer Allegations', value: 61.1521 },
              { axis: 'Civilian Allegations', value: 98.5549 },
            ],
            radarColor: '#f0201e',
            count: 93,
          },
          to: '/trr/123456/',
        } }
      />
    );
    findRenderedComponentWithType(instance, TRRPane).should.be.ok();
  });

  it('should not display any component if the data is empty', function () {
    instance = renderIntoDocument(
      <PreviewPane customClass='test--preview-pane'/>
    );
    scryRenderedDOMComponentsWithClass(instance, 'test--preview-pane').should.have.length(0);
  });

  it('should not render if type is not in the list', function () {
    instance = renderIntoDocument(
      <PreviewPane
        data={ { name: 'Community' } }
        type='NOT_FOUND'
        customClass='test--preview-pane'
      />
    );
    const instanceDOM = findRenderedDOMComponentWithClass(instance, 'test--preview-pane');
    instanceDOM.childNodes.should.have.length(0);
  });
});
