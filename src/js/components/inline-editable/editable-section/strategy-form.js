import React, { Component, PropTypes } from 'react';
import map from 'lodash/map';

import { strategyFormStyle, numberEntriesStyle, strategySelectStyle } from './strategy-form.style';


class StrategyForm extends Component {
  handlePoolSizeChange = evt => {
    this.handleValueChange({
      poolSize: parseInt(evt.target.value),
    });
  };

  handleStrategyChange = evt => {
    this.handleValueChange({
      selectedStrategyId: parseInt(evt.target.value),
    });
  };

  handleValueChange = updateValue => {
    const { value, onChange } = this.props;

    onChange({
      ...value,
      ...updateValue,
    });
  };

  render() {
    const { editModeOn, value } = this.props;
    const { poolSize, selectedStrategyId, strategies } = value;

    if (!editModeOn) {
      return null;
    }

    return (
      <div style={ strategyFormStyle }>
        <input
          style={ numberEntriesStyle }
          onChange={ this.handlePoolSizeChange }
          value={ poolSize }/>
        <select
          style={ strategySelectStyle }
          value={ selectedStrategyId }
          onChange={ this.handleStrategyChange }>
          {
            map(strategies, (strategy) => (
              <option
                key={ strategy.id }
                value={ strategy.id }>
                { strategy.name }
              </option>
            ))
          }
        </select>
      </div>
    );
  }
}

StrategyForm.propTypes = {
  editModeOn: PropTypes.bool,
  value: PropTypes.shape({
    poolSize: PropTypes.number,
    selectedStrategyId: PropTypes.number,
    strategies: PropTypes.array,
  }),
  onChange: PropTypes.func,
};

StrategyForm.defaultProps = {
  value: {},
};

export default StrategyForm;
