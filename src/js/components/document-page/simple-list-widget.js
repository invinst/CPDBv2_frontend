import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { isEmpty } from 'lodash';

import styles from './simple-list-widget.sass';
import WrappedWithLink from 'components/common/wrapped-with-link';
import SimplePopup from 'components/common/simple-popup';
import { generatePopupId } from 'utils/popup';


export default function SimpleListWidget(props) {
  const { items, className } = props;

  return (
    items && items.length > 0 ? (
      <div className={ cx(styles.simpleListWidget, className) }>
        {
          items.map((item, index) => {
            const popupId = generatePopupId();
            return (
              <div key={ index }>
                {
                  item.tooltip ? (
                    <SimplePopup id={ popupId }>
                      { item.tooltip }
                    </SimplePopup>
                  ) : null
                }
                <WrappedWithLink className='list-item' url={ item.url } to={ item.to }>
                  <span className='list-item-name'>{ item.name }</span>
                  <span
                    className='list-item-value'
                    data-tip={ !isEmpty(item.tooltip) }
                    data-for={ popupId }
                    data-event='mouseover'
                    data-event-off='mouseleave'
                  >
                    { item.value }
                  </span>
                </WrappedWithLink>
              </div>
            );
          })
        }
      </div>
    ) : null
  );
}

SimpleListWidget.propTypes = {
  items: PropTypes.array,
  className: PropTypes.string,
};
