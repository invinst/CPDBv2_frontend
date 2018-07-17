import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedComponentWithType
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import InvolvementItem from 'components/cr-page/involvement/involvement-item';
import OfficerRow from 'components/cr-page/involvement/officer-row';
import Popup from 'components/common/popup';


describe('InvolvementItem component', function () {
  let instance;
  const officers = [{ id: 1, abbrName: 'Foo' }, { id: 2, abbrName: 'Bar' }];

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render list of officers', function () {
    instance = renderIntoDocument(<InvolvementItem officers={ officers } involvedType='investigator' />);
    scryRenderedComponentsWithType(instance, OfficerRow).should.have.length(2);
  });

  it('should render investigator popup', function () {
    const popup = {
      'investigator': {
        title: 'Investigator',
        text: 'Some investigator explanation',
      },
    };
    instance = renderIntoDocument(
      <InvolvementItem officers={ officers } involvedType='investigator' popup={ popup } />
    );
    const involvementItemPopup = findRenderedComponentWithType(instance, Popup);
    involvementItemPopup.props.title.should.eql('Investigator');
    involvementItemPopup.props.text.should.eql('Some investigator explanation');
  });

  it('should render policeWitness popup', function () {
    const popup = {
      'policeWitness': {
        title: 'Police Witness',
        text: 'Some police witness explanation',
      },
    };
    instance = renderIntoDocument(
      <InvolvementItem officers={ officers } involvedType='police_witness' popup={ popup } />
    );
    const involvementItemPopup = findRenderedComponentWithType(instance, Popup);
    involvementItemPopup.props.title.should.eql('Police Witness');
    involvementItemPopup.props.text.should.eql('Some police witness explanation');
  });
});
