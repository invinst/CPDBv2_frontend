import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import CoaccusedList from 'components/cr-page/header/coaccused-list';
import CoaccusedListItem from 'components/cr-page/header/coaccused-list-item';


describe('CoaccusedList component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should display nothing if coaccused list is empty', function () {
    instance = renderIntoDocument(<CoaccusedList coaccused={ [] }/>);
    scryRenderedComponentsWithType(instance, CoaccusedListItem).should.have.length(0);
  });

  it('should render viewing officer on top of coaccused', function () {
    const coaccused = [{ id: 1, fullName: 'John' }, { id: 2, fullName: 'Alex' }, { id: 3, fullName: 'Boo' }];
    instance = renderIntoDocument(<CoaccusedList coaccused={ coaccused } currentOfficerId={ 2 }/>);

    const items = scryRenderedComponentsWithType(instance, CoaccusedListItem);
    items.should.have.length(3);
    items[0].props.id.should.be.eql(2);
  });
});
