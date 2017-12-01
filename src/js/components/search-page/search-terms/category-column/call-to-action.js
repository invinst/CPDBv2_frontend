import React, { PropTypes, Component } from 'react';
import { get } from 'lodash';

import { linkStyle } from './call-to-action.style';

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
      <a href={ item.link } style={ linkStyle }>
        Visit Data Tool
      </a>
    );
  }

  renderViewAll() {
    const { item } = this.props;

    return (
      <div style={ linkStyle }>
        View ALL { item.name }
      </div>
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
