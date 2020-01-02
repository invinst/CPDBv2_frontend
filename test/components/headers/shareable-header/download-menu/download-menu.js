import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';

import DownloadMenuItem from 'components/headers/shareable-header/download-menu/download-menu-item';
import DownloadMenuItemContainer from 'containers/headers/shareable-header/download-menu-container';
import { OFFICER_EDIT_TYPES } from 'utils/constants';


describe('DownloadMenu component', function () {
  const mockStore = MockStore();
  const store = mockStore({
    officerPage: {
      officerId: 123,
      summary: {},
      metrics: {},
      newTimeline: {},
      editModeOn: {
        [OFFICER_EDIT_TYPES.TRIANGLE]: false,
        [OFFICER_EDIT_TYPES.SCALE]: false,
        [OFFICER_EDIT_TYPES.NO_DATA_RADAR_CHART]: false,
      },
      zipFileUrl: { withDocs: 'lvh.me/file-with-docs.zip', withoutDocs: 'lvh.me/file.zip' },
    },
    breadcrumb: {
      breadcrumbs: [],
    },
    popups: [],
  });

  it('should render two DownloadMenuItems', function () {
    const wrapper = mount(
      <Provider store={ store }>
        <DownloadMenuItemContainer/>
      </Provider>
    );

    const downloadMenuItems = wrapper.find(DownloadMenuItem);

    downloadMenuItems.at(0).prop('officerId').should.equal(123);
    downloadMenuItems.at(0).prop('kind').should.equal('with_docs');
    downloadMenuItems.at(0).prop('zipFileUrl').should.equal('lvh.me/file-with-docs.zip');

    downloadMenuItems.at(1).prop('officerId').should.equal(123);
    downloadMenuItems.at(1).prop('kind').should.equal('without_docs');
    downloadMenuItems.at(1).prop('zipFileUrl').should.equal('lvh.me/file.zip');
  });
});
