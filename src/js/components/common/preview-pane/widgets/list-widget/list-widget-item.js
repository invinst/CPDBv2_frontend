import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import StaticRadarChart from 'components/common/radar-chart';
import styles from './list-widget-item.sass';


const wrapWithLink = (component, url) => (
  url ? (
    <Link
      className={ styles.listWidgetItem }
      to={ url }
      onClick={ e => e.stopPropagation() }
    >
      { component }
    </Link>
  ) :
    <div className={ styles.listWidgetItem }>
      { component }
    </div>
);

export default function ListWidgetItem(props) {
  const { name, url, subText, radarAxes, radarColor, showAvatar, showItemArrow } = props;

  return wrapWithLink(
    <React.Fragment>
      { (showAvatar) && (
        <div className='list-widget-list-item-chart-wrapper'>
          <StaticRadarChart
            width={ 38 }
            height={ 38 }
            radius={ 18 }
            hideAxisText={ true }
            data={ radarAxes }
            backgroundColor={ radarColor }
          />
        </div>
      ) }
      <div className={ cx('list-widget-list-item-info', { 'show-avatar': showAvatar }) }>
        <p className='list-widget-list-item-name'>{ name }</p>
        <p className='list-widget-list-item-count'>{ subText }</p>
      </div>
      { showItemArrow ? <div className='list-widget-list-item-arrow'/> : null }
    </React.Fragment>,
    url
  );
}

ListWidgetItem.defaultProps = {
  showAvatar: true,
  showItemArrow: false,
};

ListWidgetItem.propTypes = {
  name: PropTypes.string,
  subText: PropTypes.string,
  url: PropTypes.string,
  radarAxes: PropTypes.array,
  radarColor: PropTypes.string,
  showAvatar: PropTypes.bool,
  showItemArrow: PropTypes.bool,
};
