import React, { Component, PropTypes } from 'react';
import styles from './printable.sass';


export default function (ComponentClass) {
  class Printable extends Component {
    constructor(props) {
      super(props);
      this.state = {
        printMode: false,
      };
    }

    getChildContext() {
      return {
        printMode: this.state.printMode,
      };
    }

    componentDidMount() {
      const query = window.matchMedia('print');
      this._mediaPrintListener(query);
      query.addListener(this._mediaPrintListener);
      window.onbeforeprint = this._beforePrint;
      window.onafterprint = this._afterPrint;
    }

    _beforePrint = () => {
      this._updatePrintMode(true);
    };

    _afterPrint = () => {
      this._updatePrintMode(false);
    };

    _mediaPrintListener = media => {
      this._updatePrintMode(media.matches);
    };

    _updatePrintMode(printMode) {
      if (this.state.printMode !== printMode)
        this.setState({ printMode: printMode });
    }

    render() {
      const { printMode } = this.state;
      const today = new Date().toLocaleDateString();
      const { printHeader } = this.props;

      return (
        printMode ?
          <table className={ styles.printable }>
            <thead>
              <tr>
                <th>
                  <div className='printable-header'>
                    <span className='left-header'>{ printHeader }</span>
                    <div className='right-header'>
                      <span className='printable-as-of'>AS OF</span>
                      <br/>
                      <span className='printable-date'>{ today }</span>
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='main-content'>
                  <ComponentClass { ...this.props }/>
                </td>
              </tr>
            </tbody>
          </table>
          : <ComponentClass { ...this.props }/>
      );
    }
  }

  Printable.childContextTypes = {
    printMode: PropTypes.bool,
  };

  return Printable;
}
