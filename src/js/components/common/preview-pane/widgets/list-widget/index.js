import React, { Component, PropTypes } from 'react';
import pluralize from 'pluralize';
import cx from 'classnames';
import { UnmountClosed } from 'react-collapse';
import { slice, isEmpty, isNil } from 'lodash';

import ListWidgetItem from './list-widget-item';
import styles from './list-widget.sass';
import 'react-collapse.css';

const ITEM_LIMIT = 3;


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
    return (
      <ListWidgetItem
        showAvatar={ showAvatar }
        showItemArrow={ showItemArrow }
        key={ item.id }
        name={ item.name }
        url={ item.url }
        radarAxes={ item.radarAxes }
        radarColor={ item.radarColor }
        subText={ !isNil(item.count) ? pluralize(typeName, item.count, true) : item.subText }
      />
    );
  }

  render() {
    const { wrapperClassName, items, title, collapsable } = this.props;
    const firstThreeItems = slice(items, 0, ITEM_LIMIT);
    const restItems = slice(items, ITEM_LIMIT);
    return (
      items && items.length > 0 ? (
        <div className={ cx(styles.listWidget, wrapperClassName) }>
          <h5 className='list-widget-header'>{ title }</h5>
          <ul className='list-widget-list'>
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
