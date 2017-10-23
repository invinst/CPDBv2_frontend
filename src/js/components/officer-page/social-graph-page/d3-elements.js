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
    this.props.simulation.on(`tick.${this.onTickCallbackName}`, null);
  }

  /* istanbul ignore next */
  updateElement() {
    const { data, elementName, staticAttrs, simulation, dynamicAttrs, text, click } = this.props;
    let element = select(`g.${this.groupClassName}`)
      .selectAll(elementName)
      .data(data);

    element.exit().remove();
    element = element
      .enter()
      .insert(elementName)
      .merge(element);
    each(staticAttrs, (v, k) => {
      element.attr(k, v);
    });
    element.text(text);

    if (click) {
      element.on('click', click);
    }

    if (simulation) {
      simulation.on(`tick.${this.onTickCallbackName}`, () => {
        each(dynamicAttrs, (v, k) => {
          element.attr(k, v);
        });
      });
    }
  }

  render() {
    return <g className={ this.groupClassName } />;
  }
}

D3Elements.propTypes = {
  simulation: PropTypes.object,
  data: PropTypes.array,
  elementName: PropTypes.string,
  staticAttrs: PropTypes.object,
  dynamicAttrs: PropTypes.object,
  text: PropTypes.func,
  click: PropTypes.func
};

D3Elements.defaultProps = {
  staticAttrs: {},
  dynamicAttrs: {}
};
