import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';

import { linkStyle } from './call-to-action.style';
import ActionBar from 'components/search-page/search-terms/preview-pane/action-bar';
import OutboundLink from 'components/common/outbound-link';


export default class CallToAction extends Component {
  constructor(props) {
    super(props);

    this.renderLink = this.renderLink.bind(this);
    this.renderViewAll = this.renderViewAll.bind(this);
    this.renderDefault = this.renderDefault.bind(this);
    this.typeMapping = {
      'link': this.renderLink,
      'view_all': this.renderViewAll
    };
  }

  renderLink() {
    const { item } = this.props;

    return (
      <ActionBar>
        <OutboundLink href={ item.link } style={ linkStyle } className='test--call-to-action-link'>
          Enter Data Tool
        </OutboundLink>
      </ActionBar>
    );
  }

  renderViewAll() {
    const { item } = this.props;

    return (
      <ActionBar>
        <div style={ linkStyle }>
          View ALL { item.name }
        </div>
      </ActionBar>
    );
  }

  renderDefault() {
    return null;
  }

  render() {
    const { item } = this.props;

    const renderFunction = get(this.typeMapping, item['call_to_action_type'], this.renderDefault);

    return renderFunction();
  }
}

CallToAction.propTypes = {
  item: PropTypes.object
};
