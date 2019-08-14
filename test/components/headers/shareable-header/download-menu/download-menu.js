import React from 'react';
import { Provider } from 'react-redux';
import MockStore from 'redux-mock-store';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
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
      zipFileUrl: { withDocs: 'lvh.me/file-with-docs.zip', withoutDocs: 'lvh.me/file.zip' }
    },
    breadcrumb: {
      breadcrumbs: []
    },
    popups: [],
  });
  let element;

  afterEach(function () {
    unmountComponentSuppressError(element);
  });

  it('should render two DownloadMenuItems', function () {
    element = renderIntoDocument(
      <Provider store={ store }>
        <DownloadMenuItemContainer/>
      </Provider>
    );

    const downloadMenuItems = scryRenderedComponentsWithType(element, DownloadMenuItem);

    downloadMenuItems[0].props.officerId.should.eql(123);
    downloadMenuItems[0].props.kind.should.eql('with_docs');
    downloadMenuItems[0].props.zipFileUrl.should.eql('lvh.me/file-with-docs.zip');

    downloadMenuItems[1].props.officerId.should.eql(123);
    downloadMenuItems[1].props.kind.should.eql('without_docs');
    downloadMenuItems[1].props.zipFileUrl.should.eql('lvh.me/file.zip');
  });
});
