import React, { Component, PropTypes } from 'react';
import config from 'config';

import { QA_LINK } from 'utils/constants';

export default class RightLinks extends Component {
  render() {
    const { rightLinkStyle } = this.props;
    const links = [
      {
        name: 'Data',
        externalHref: config.v1Url
      },
      {
        name: 'Q&A',
        externalHref: QA_LINK
      },
      {
        name: 'Glossary',
        externalHref: `${config.v1Url}/glossary/`
      }
    ];

    const tags = links.map((link, index) => {
      if (link.externalHref) {
        return (
          <a
            className='test--right-external-link'
            onClick={ (e) => {
              e.stopPropagation();
            } }
            style={ rightLinkStyle }
            key={ index }
            href={ link.externalHref }
          >
            { link.name }
          </a>
        );
      }
    });

    return <div>{ tags }</div>;
  }
}

RightLinks.propTypes = {
  editModeOn: PropTypes.bool,
  rightLinkStyle: PropTypes.object
};
