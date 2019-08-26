import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import pluralize from 'pluralize';
import cx from 'classnames';

import StaticRadarChart from 'components/common/radar-chart';
import styles from './list-widget.sass';


export default class ListWidget extends Component {
  render() {
    const { wrapperClassName, items, title, typeName, showAvatar, showItemArrow } = this.props;

    const wrapWithLink = (component, url, key) => (
      url ? (
        <Link
          className='list-widget-item-link'
          to={ url }
          key={ key }
          onClick={ e => e.stopPropagation() }
        >
          { component }
        </Link>
      ): component
    );

    return (
      items && items.length > 0 ? (
        <div className={ cx(styles.listWidget, wrapperClassName) }>
          <h5 className='list-widget-header'>{ title }</h5>
          <ul className='list-widget-list'>
            { items.map((item) => (
              wrapWithLink(
                (
                  <li key={ item.id } className='list-widget-list-item'>
                    { (showAvatar) && (
                      <div className='list-widget-list-item-chart-wrapper'>
                        <StaticRadarChart
                          width={ 38 }
                          height={ 38 }
                          radius={ 18 }
                          hideAxisText={ true }
                          data={ item.radarAxes }
                          backgroundColor={ item.radarColor }
                        />
                      </div>
                    ) }
                    <div className='list-widget-list-item-info'>
                      <p className='list-widget-list-item-name'>{ item.name }</p>
                      <p className='list-widget-list-item-count'>{ pluralize(typeName, item.count, true) }</p>
                    </div>
                    { showItemArrow ? <div className='list-widget-list-item-arrow'/> : null }
                  </li>
                ),
                item.url, item.id
              )
            )) }
          </ul>
        </div>
      ) : <div/>
    );
  }
}

ListWidget.defaultProps = {
  typeName: 'allegation',
  showAvatar: true,
  showItemArrow: false,
};

ListWidget.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    count: PropTypes.number,
    image: PropTypes.string.optional,
    url: PropTypes.string.optional,
  })),
  title: PropTypes.string,
  typeName: PropTypes.string,
  showAvatar: PropTypes.bool,
  wrapperClassName: PropTypes.string,
  showItemArrow: PropTypes.bool,
};
