import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { FAQ_PATH } from 'utils/constants';
import { editMode } from 'utils/edit-path';

export default class RightLinks extends Component {
  render() {
    const { editModeOn, rightLinkStyle } = this.props;
    const links = [
      {
        name: 'Data',
        externalHref: 'https://beta.cpdb.co/'
      },
      {
        name: 'FAQ',
        href: '/' + FAQ_PATH
      },
      {
        name: 'Glossary',
        externalHref: 'https://beta.cpdb.co/glossary/'
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

      const href = link.href && (editModeOn ? editMode(link.href) : link.href);

      return (
        <Link
          style={ rightLinkStyle }
          key={ index }
          to={ href }
          onClick={ link.onClick }
        >
          { link.name }
        </Link>
      );
    });

    return <div>{ tags }</div>;
  }
}

RightLinks.propTypes = {
  editModeOn: PropTypes.bool,
  rightLinkStyle: PropTypes.object
};
