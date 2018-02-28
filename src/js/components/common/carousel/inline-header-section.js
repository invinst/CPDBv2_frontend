import React, { Component, PropTypes } from 'react';

import { headerStyle, headerTextStyle } from './inline-header-section.style';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import LinkTextEditable from 'components/inline-editable/editable-section/link-text-editable';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import { CAROUSEL_TYPES } from 'utils/constants';


class InlineHeaderSection extends Component {
  render() {
    const { type, editWrapperStateProps } = this.props;
    if (!CAROUSEL_TYPES.isDefined(type)) {
      return <div/>;
    }

    return <EditWrapperStateProvider { ...editWrapperStateProps }>
      <HoverableEditWrapper>
        <h3 style={ headerStyle }>
          <LinkTextEditable
            placeholder='Title'
            fieldname={ `carousel_${type.key.toLowerCase()}_title` }
          />
        </h3>
        <div style={ headerTextStyle }>
          <RichTextEditable
            placeholder='Description'
            fieldname={ `carousel_${type.key.toLowerCase()}_desc` }
          />
        </div>
      </HoverableEditWrapper>
    </EditWrapperStateProvider>;
  }
}

InlineHeaderSection.propTypes = {
  type: PropTypes.object,
  editWrapperStateProps: PropTypes.object
};

export default InlineHeaderSection;
