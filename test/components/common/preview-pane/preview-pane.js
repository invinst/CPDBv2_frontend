import React from 'react';
import { shallow, mount } from 'enzyme';

import PreviewPane from 'components/common/preview-pane';
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
} from 'components/common/preview-pane/panes';
import styles from 'components/common/preview-pane/preview-pane.sass';


describe('PreviewPane component', function () {
  it('should render CommunityPane component', function () {
    const wrapper = shallow(
      <PreviewPane
        type='COMMUNITY'
        data={ { name: 'Community' } }
      />
    );
    wrapper.find(CommunityPane).exists().should.be.true();
  });

  it('should render NeighborhoodPane', function () {
    const wrapper = shallow(
      <PreviewPane
        type='NEIGHBORHOOD'
        data={ { name: 'Neighborhood' } }
      />
    );
    wrapper.find(NeighborhoodPane).exists().should.be.true();
  });

  it('should render OfficerPane', function () {
    const wrapper = shallow(
      <PreviewPane
        type='OFFICER'
        data={ { name: 'Officer' } }
      />
    );
    wrapper.find(OfficerPane).exists().should.be.true();
  });

  it('should render WardPane', function () {
    const wrapper = shallow(
      <PreviewPane
        type='WARD'
        data={ { name: 'Ward' } }
      />
    );
    wrapper.find(WardPane).exists().should.be.true();
  });

  it('should render PoliceBeatPane', function () {
    const wrapper = shallow(
      <PreviewPane
        type='BEAT'
        data={ { name: 'Beat' } }
      />
    );
    wrapper.find(PoliceBeatPane).exists().should.be.true();
  });

  it('should render PoliceDistrictPane', function () {
    const wrapper = shallow(
      <PreviewPane
        type='POLICE-DISTRICT'
        data={ { name: 'Police District' } }
      />
    );
    wrapper.find(PoliceDistrictPane).exists().should.be.true();
  });

  it('should render SchoolGroundPane', function () {
    const wrapper = shallow(
      <PreviewPane
        type='SCHOOL-GROUND'
        data={ { name: 'School Ground' } }
      />
    );
    wrapper.find(SchoolGroundPane).exists().should.be.true();
  });

  it('should render RankPane', function () {
    const wrapper = shallow(
      <PreviewPane
        type='RANK'
        data={ { name: 'Chief' } }
      />
    );
    wrapper.find(RankPane).exists().should.be.true();
  });

  it('should render SearchTermItemPane', function () {
    const wrapper = shallow(
      <PreviewPane
        type={ 'SEARCH-TERMS' }
        data={ { name: 'Search Terms' } }
      />
    );
    wrapper.find(SearchTermItemPane).exists().should.be.true();
  });

  it('should render CRPane', function () {
    const wrapper = shallow(
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
    wrapper.find(CRPane).exists().should.be.true();
  });

  it('should render CRPane for Date > CR', function () {
    const wrapper = shallow(
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
    wrapper.find(CRPane).exists().should.be.true();
  });

  it('should render CRPane for INVESTIGATOR > CR', function () {
    const wrapper = shallow(
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
    wrapper.find(CRPane).exists().should.be.true();
  });

  it('should render TRRPane for TRR', function () {
    const wrapper = shallow(
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
    wrapper.find(TRRPane).exists().should.be.true();
  });

  it('should render TRRPane for Date > TRR', function () {
    const wrapper = shallow(
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
    wrapper.find(TRRPane).exists().should.be.true();
  });

  it('should not display any component if the data is empty', function () {
    const wrapper = mount(
      <PreviewPane customClass='test--preview-pane'/>
    );
    wrapper.find('.test--preview-pane').exists().should.be.false();
  });

  it('should not display any component if isShown is false', function () {
    const wrapper = mount(
      <PreviewPane customClass='test--preview-pane' data={ { id: 123 } } isShown={ false }/>
    );
    wrapper.find('.test--preview-pane').exists().should.be.false();
  });

  it('should not render if type is not in the list', function () {
    const wrapper = mount(
      <PreviewPane
        data={ { name: 'Community' } }
        type='NOT_FOUND'
        customClass='test--preview-pane'
      />
    );
    const instanceDOM = wrapper.find('.test--preview-pane').getDOMNode();
    instanceDOM.childNodes.exists().should.be.false();
  });

  it('should add yScrollable class name to wrapper', function () {
    const wrapper = shallow(
      <PreviewPane
        type='OFFICER'
        data={ { name: 'Officer' } }
        yScrollable={ true }
      />
    );

    const previewPaneWrapper = wrapper.find(`.${styles.previewPaneWrapper}`);
    previewPaneWrapper.prop('className').should.containEql(styles.yScrollable);
  });

  it('should add dynamic-height class name to wrapper', function () {
    const wrapper = shallow(
      <PreviewPane
        type='OFFICER'
        data={ { name: 'Officer' } }
        dynamicHeight={ true }
      />
    );

    const previewPaneWrapper = wrapper.find(`.${styles.previewPaneWrapper}`);
    previewPaneWrapper.prop('className').should.containEql('dynamic-height');
  });
});
