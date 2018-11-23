import React, { Component } from 'react';
import styles from './printable.sass';


export default function (ComponentClass) {
  return class Printable extends Component {
    constructor(props) {
      super(props);
      this._mediaPrintListener = this._mediaPrintListener.bind(this);
      this._beforePrint = this._beforePrint.bind(this);
      this._afterPrint = this._afterPrint.bind(this);
      this.state = {
        isPrinting: false
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
      if (!this.state.isPrinting)
        this.setState({ isPrinting: true });
    }

    _afterPrint() {
      if (this.state.isPrinting)
        this.setState({ isPrinting: false });
    }

    _mediaPrintListener(media) {
      if (this.state.isPrinting !== media.matches)
        this.setState({ isPrinting: media.matches });
    }

    render() {
      const { isPrinting } = this.state;
      const today = new Date().toLocaleDateString();

      return (
        isPrinting ?
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
                    <div className='clearfix'></div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <ComponentClass isPrinting={ isPrinting } { ...this.props }/>
                </td>
              </tr>
            </tbody>
          </table>
          : <ComponentClass isPrinting={ isPrinting } { ...this.props }/>
      );
    }
  };
}
