import React, { Component, PropTypes } from 'react';
import pluralize from 'pluralize';
import { isEmpty } from 'lodash';

import { NewWidgetWrapper, ListWidget } from './widgets';
import Demographics from 'components/common/demographics';
import styles from './cr-pane.sass';


export default class CRPane extends Component {
  render() {
    const {
      category,
      subCategory,
      incidentDate,
      address,
      victims,
      coaccused,
      to,
      yScrollable,
    } = this.props;
    return (
      <NewWidgetWrapper callToAction={ { to, text: 'View Complaint Record' } } yScrollable={ yScrollable }>
        <div className={ styles.crPane }>
          <div className='cr-preview-pane-info-wrapper'>
            <div className='cr-preview-pane-title'>
              <div className='cr-preview-pane-title-title'>{ category }</div>
              <div className='cr-preview-pane-title-subtitle'>{ subCategory }</div>
            </div>
            <div className='cr-preview-pane-info-row'>{ incidentDate }</div>
            { !isEmpty(address) && <div className='cr-preview-pane-info-row cr-preview-pane-address'>{ address }</div> }
            {
              !isEmpty(victims) && (
                <div>
                  <div className='cr-preview-pane-victims-text'>{ pluralize('VICTIM', victims.length) }</div>
                  <Demographics className='cr-preview-pane-victims' persons={ victims } />
                </div>
              )
            }
          </div>
          <ListWidget
            typeName='allegation'
            title={ pluralize('ACCUSED OFFICER', coaccused.length) }
            showItemArrow={ false }
            items={ coaccused }
            wrapperClassName='cr-preview-pane-accused'
          />
        </div>
      </NewWidgetWrapper>
    );
  }
}

CRPane.propTypes = {
  category: PropTypes.string,
  subCategory: PropTypes.string,
  incidentDate: PropTypes.string,
  address: PropTypes.string,
  victims: PropTypes.array,
  coaccused: PropTypes.array,
  to: PropTypes.string,
  yScrollable: PropTypes.bool,
};

CRPane.defaultProps = {
  yScrollable: false,
};
