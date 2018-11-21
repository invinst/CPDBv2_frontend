import React, { Component } from 'react';


export default function (ComponentClass) {
  return class Printable extends Component {
    constructor(props) {
      super(props);
      this._mediaPrintListener = this._mediaPrintListener.bind(this);
      this.state = {
        isPrinting: false
      };
    }

    componentDidMount() {
      const query = window.matchMedia('print');
      this._mediaPrintListener(query);
      query.addListener(this._mediaPrintListener);
    }

    _mediaPrintListener(media) {
      this.setState({ isPrinting: media.matches });
    }

    render() {
      const { isPrinting } = this.state;

      return <ComponentClass isPrinting={ isPrinting } { ...this.props }/>;
    }
  };
}
