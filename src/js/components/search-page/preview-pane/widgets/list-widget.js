import React, { Component, PropTypes } from 'react';
import pluralize from 'pluralize';

import StaticRadarChart from 'components/common/radar-chart';
import HoverableLink from 'components/common/hoverable-link';


import {
  containerStyle,
  headerStyle,
  itemCountStyle,
  listItemFirstStyle,
  listItemStyle,
  listStyle,
  itemNameStyle,
  chartWrapperStyle,
  linkStyle,
} from './list-widget.style';


export default class ListWidget extends Component {
  render() {
    const { items, title, typeName, showAvatar } = this.props;

    const wrapWithLink = (component, url) => (
      url ? (
        <HoverableLink
          className='test--list-widget-item-link'
          style={ linkStyle }
          to={ url }
        >
          { component }
        </HoverableLink>
      ): component
    );

    return (
      items && items.length > 0 ? (
        <div className='test--list-widget' style={ containerStyle }>
          <h5 style={ headerStyle }>{ title }</h5>
          <ul style={ listStyle }>
            { items.map((item, index) => (
              wrapWithLink(
                (
                  <li key={ item.id } style={ listItemStyle(index === items.length - 1) }>
                    { (showAvatar) && (
                      <div style={ listItemFirstStyle }>
                        <div style={ chartWrapperStyle } className='test--preview-pane-thumbnail'>
                          <StaticRadarChart
                            width={ 38 }
                            height={ 38 }
                            radius={ 18 }
                            hideAxisText={ true }
                            data={ item.radarAxes }
                            key={ index }
                            { ...item.radarColor } />
                        </div>
                      </div>
                    ) }
                    <div>
                      <p style={ itemNameStyle }>{ item.name }</p>
                      <p style={ itemCountStyle }>{ pluralize(typeName, item.count, true) }</p>
                    </div>
                  </li>
                ),
                item.url
              )
            )) }
          </ul>
        </div>
      ) : null
    );
  }
}

ListWidget.defaultProps = {
  typeName: 'allegation',
  showAvatar: true
};

ListWidget.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    count: PropTypes.number,
    image: PropTypes.string.optional,
    url: PropTypes.string.optional
  })),
  title: PropTypes.string,
  typeName: PropTypes.string,
  showAvatar: PropTypes.bool,
};
