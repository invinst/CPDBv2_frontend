import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import pluralize from 'pluralize';
import cx from 'classnames';
import { UnmountClosed } from 'react-collapse';
import { slice, isEmpty, isNil } from 'lodash';

import StaticRadarChart from 'components/common/radar-chart';
import styles from './list-widget.sass';
import 'react-collapse.css';

const ITEM_LIMIT = 3;

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
  ) : component
);

export default class ListWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
    };

    this.toggleCollapsed = this.toggleCollapsed.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  toggleCollapsed() {
    const { collapsed } = this.state;
    this.setState({ collapsed: !collapsed });
  }

  renderItem(item) {
    const { typeName, showAvatar, showItemArrow } = this.props;
    return wrapWithLink(
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
            {
              !isNil(item.count) && (
                <p className='list-widget-list-item-count'>{ pluralize(typeName, item.count, true) }</p>
              )
            }
            <p className='list-widget-list-item-count'>{ item.subText }</p>
          </div>
          { showItemArrow ? <div className='list-widget-list-item-arrow'/> : null }
        </li>
      ),
      item.url, item.id,
    );
  }

  render() {
    const { wrapperClassName, items, title, showAvatar, collapsable } = this.props;
    const firstThreeItems = slice(items, 0, ITEM_LIMIT);
    const restItems = slice(items, ITEM_LIMIT);
    return (
      items && items.length > 0 ? (
        <div className={ cx(styles.listWidget, wrapperClassName) }>
          <h5 className='list-widget-header'>{ title }</h5>
          <ul className={ cx('list-widget-list', { 'show-avatar': showAvatar }) }>
            { firstThreeItems.map(this.renderItem) }
            <UnmountClosed isOpened={ !this.state.collapsed }>
              { restItems.map(this.renderItem) }
            </UnmountClosed>
          </ul>
          {
            collapsable && !isEmpty(restItems) && (
              <div className='collapsed-toggle' onClick={ this.toggleCollapsed }>
                View { this.state.collapsed ? 'more' : 'less' }
              </div>
            )
          }
        </div>
      ) : <div/>
    );
  }
}

ListWidget.defaultProps = {
  typeName: 'allegation',
  showAvatar: true,
  showItemArrow: false,
  collapsable: false,
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
  collapsable: PropTypes.bool,
};
