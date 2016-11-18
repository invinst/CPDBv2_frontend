import React, { PropTypes } from 'react';
import { renderIntoDocument, findRenderedComponentWithType } from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import ContextWrapper from 'utils/test/components/context-wrapper';
import EditToggle from 'components/inline-editable/editable-section/edit-toggle';
import MoreLink from 'components/common/more-link';
import CancelUpdateButtons from 'components/inline-editable/editable-section/edit-toggle/cancel-update-buttons';


class LinkContextWrapper extends ContextWrapper {}
LinkContextWrapper.childContextTypes = {
  editModeOn: PropTypes.bool
};

describe('EditToggle component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render edit link when section edit mode not on', function () {
    const turnOnSectionEditMode = spy();
    instance = renderIntoDocument(
      <LinkContextWrapper context={ { editModeOn: true } }>
        <EditToggle sectionEditModeOn={ false } turnOnSectionEditMode={ turnOnSectionEditMode }/>
      </LinkContextWrapper>
    );
    const link = findRenderedComponentWithType(instance, MoreLink);
    link.props.onClick();
    turnOnSectionEditMode.calledOnce.should.be.true();
  });

  it('should render nothing when edit mode off', function () {
    instance = renderIntoDocument(
      <LinkContextWrapper context={ { editModeOn: false } }>
        <EditToggle/>
      </LinkContextWrapper>
    );
    instance.should.displayNothing();
  });

  it('should render buttons when section edit mode on', function () {
    const onSaveForm = spy();
    const turnOffSectionEditMode = spy();
    instance = renderIntoDocument(
      <LinkContextWrapper context={ { editModeOn: true } }>
        <EditToggle
          sectionEditModeOn={ true }
          onSaveForm={ onSaveForm }
          turnOffSectionEditMode={ turnOffSectionEditMode }/>
      </LinkContextWrapper>
    );
    const buttons = findRenderedComponentWithType(instance, CancelUpdateButtons);
    buttons.props.onUpdateClick.should.eql(onSaveForm);
    buttons.props.onCancelClick.should.eql(turnOffSectionEditMode);
  });
});
