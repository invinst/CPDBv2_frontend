import React, { Component } from 'react';


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
      if (this.state.isPrinting != media.matches)
        this.setState({ isPrinting: media.matches });
    }

    render() {
      const { isPrinting } = this.state;

      return <ComponentClass isPrinting={ isPrinting } { ...this.props }/>;
    }
  };
}
