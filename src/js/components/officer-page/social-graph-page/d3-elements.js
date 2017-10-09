import React, { Component, PropTypes } from 'react';
import { select } from 'd3-selection';
import uuid from 'uuid/v4';
import { each } from 'lodash';


export default class D3Elements extends Component {
  constructor(props) {
    super(props);
    this.groupClassName = `_${uuid()}`;
    this.onTickCallbackName = uuid();
  }

  componentDidMount() {
    this.updateElement();
  }

  componentDidUpdate() {
    this.updateElement();
  }

  componentWillUnmount() {
    this.props.ticker.on(`tick.${this.onTickCallbackName}`, null);
  }

  updateElement() {
    const { data, elementName, staticAttrs, ticker, dynamicAttrs, text } = this.props;
    let element = select(`g.${this.groupClassName}`)
      .selectAll(`.${staticAttrs.className}`)
      .data(data);

    element.exit().remove();
    element = element
      .enter()
      .insert(elementName)
      .attr('class', staticAttrs.className)
      .merge(element);
    each(staticAttrs, (v, k) => {
      element.attr(k, v);
    });
    element.text(text);

    ticker.on(`tick.${this.onTickCallbackName}`, () => {
      each(dynamicAttrs, (v, k) => {
        element.attr(k, v);
      });
    });
  }

  render() {
    return <g className={ this.groupClassName } />;
  }
}

D3Elements.propTypes = {
  ticker: PropTypes.object,
  data: PropTypes.array,
  elementName: PropTypes.string,
  staticAttrs: PropTypes.object,
  dynamicAttrs: PropTypes.object,
  text: PropTypes.func
};
