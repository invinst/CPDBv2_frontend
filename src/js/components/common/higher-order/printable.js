import React, { Component, PropTypes } from 'react';
import styles from './printable.sass';


export default function (ComponentClass) {
  class Printable extends Component {
    constructor(props) {
      super(props);
      this._mediaPrintListener = this._mediaPrintListener.bind(this);
      this._beforePrint = this._beforePrint.bind(this);
      this._afterPrint = this._afterPrint.bind(this);
      this.state = {
        printMode: false
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

    _beforePrint() {
      if (!this.state.printMode)
        this.setState({ printMode: true });
    }

    _afterPrint() {
      if (this.state.printMode)
        this.setState({ printMode: false });
    }

    _mediaPrintListener(media) {
      if (this.state.printMode !== media.matches)
        this.setState({ printMode: media.matches });
    }

    render() {
      const { printMode } = this.state;
      const today = new Date().toLocaleDateString();

      return (
        printMode ?
          <table className={ styles.printable }>
            <thead>
              <tr>
                <th>
                  <div className='printable-header'>
                    <span className='left-header'>{ document.title }</span>
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
                  <ComponentClass printMode={ printMode } { ...this.props }/>
                </td>
              </tr>
            </tbody>
          </table>
          : <ComponentClass printMode={ printMode } { ...this.props }/>
      );
    }
  }

  Printable.childContextTypes = {
    printMode: PropTypes.bool,
  };

  return Printable;
}
