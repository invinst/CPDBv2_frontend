import React, { Component, PropTypes } from 'react';

import styles from './inline-header-section.sass';
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

    return (
      <EditWrapperStateProvider { ...editWrapperStateProps }>
        <HoverableEditWrapper>
          <h3 className={ styles.header }>
            <LinkTextEditable
              placeholder='Title'
              fieldname={ `carousel_${type.key.toLowerCase()}_title` }
            />
          </h3>
          <div className={ styles.headerText }>
            <RichTextEditable
              placeholder='Description'
              fieldname={ `carousel_${type.key.toLowerCase()}_desc` }
            />
          </div>
        </HoverableEditWrapper>
      </EditWrapperStateProvider>
    );
  }
}

InlineHeaderSection.propTypes = {
  type: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  editWrapperStateProps: PropTypes.object
};

export default InlineHeaderSection;
