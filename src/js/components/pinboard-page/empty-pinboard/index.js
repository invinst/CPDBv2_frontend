import React, { PropTypes, Component } from 'react';

import styles from './empty-pinboard.sass';
import responsiveContainerStyles from 'components/common/responsive-container.sass';
import ExamplePinboardLink from 'components/pinboard-page/empty-pinboard/example-pinboard-link';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';


export default class EmptyPinboardPage extends Component {
  render() {
    const {
      examplePinboards,
      emptyPinboardTitleEditWrapperStateProps,
      emptyPinboardDescriptionEditWrapperStateProps,
    } = this.props;
    return (
      <div className={ responsiveContainerStyles.responsiveContainer }>
        <div className={ styles.emptyPinboard }>
          <EditWrapperStateProvider { ...emptyPinboardTitleEditWrapperStateProps }>
            <HoverableEditWrapper className='empty-pinboard-title'>
              <RichTextEditable
                placeholder='Get started'
                fieldname='empty_pinboard_title'
              />
            </HoverableEditWrapper>
          </EditWrapperStateProvider>
          <EditWrapperStateProvider { ...emptyPinboardDescriptionEditWrapperStateProps }>
            <HoverableEditWrapper className='empty-pinboard-description'>
              <RichTextEditable
                placeholder='Description'
                fieldname='empty_pinboard_description'
              />
            </HoverableEditWrapper>
          </EditWrapperStateProvider>
          { examplePinboards.map(pinboard => (
            <ExamplePinboardLink
              key={ pinboard.id }
              id={ pinboard.id }
              title={ pinboard.title }
              description={ pinboard.description }
            />
          )) }
          <div className='arrow-head'/>
          <div className='arrow-shaft'/>
        </div>
      </div>
    );
  }
}

EmptyPinboardPage.propTypes = {
  examplePinboards: PropTypes.array,
  emptyPinboardTitleEditWrapperStateProps: PropTypes.object,
  emptyPinboardDescriptionEditWrapperStateProps: PropTypes.object,
};
