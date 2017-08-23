import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import { ROOT_PATH, FAQ_PATH, COLLAB_PATH } from 'utils/constants';
import { editMode } from 'utils/edit-path';
import ConfiguredRadium from 'utils/configured-radium';
import PropsStateRerender from 'components/common/higher-order/props-state-rerender';
import LogOutButtonContainer from 'containers/log-out-container';
import {
  slimHeaderStyle,
  leftLinkStyle,
  rightLinkStyle,
  rightLinksWrapperStyle,
  outerStyle
} from './slim-header.style';

const links = [
  {
    name: 'Downloads',
    href: ROOT_PATH
  },
  {
    name: 'Legal Disclaimer',
    href: ROOT_PATH
  },
  {
    name: 'FAQ',
    href: '/' + FAQ_PATH
  },
  {
    name: 'Glossary',
    href: ROOT_PATH
  },
  {
    name: 'Collaborate',
    href: COLLAB_PATH
  },
];

class SlimHeader extends Component {
  render() {
    const { show, pathname } = this.props;
    const { editModeOn } = this.context;

    if (!show) {
      return null;
    }

    const rightLinks = links.map((link, index) => (
      <Link
        style={ rightLinkStyle }
        key={ index }
        to={ editModeOn ? editMode(link.href) : link.href }>{ link.name }
      </Link>
    ));

    return (
      <ResponsiveFixedWidthComponent style={ outerStyle }>
        <table style={ slimHeaderStyle } className='test--slim-header'>
          <tbody>
            <tr>
              <td>
                <Link
                  style={ leftLinkStyle }
                  to={ editModeOn ? editMode(ROOT_PATH) : ROOT_PATH }
                  className='test--header-logo'
                >
                  Citizens Police Data Project
                </Link>
              </td>
              <td>
                <div style={ rightLinksWrapperStyle }>
                  { rightLinks }
                  <LogOutButtonContainer pathname={ pathname }/>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </ResponsiveFixedWidthComponent>
    );
  }
}

SlimHeader.propTypes = {
  show: PropTypes.bool,
  pathname: PropTypes.string,
};

SlimHeader.defaultProps = {
  show: true
};

SlimHeader.contextTypes = {
  editModeOn: PropTypes.bool
};

export default PropsStateRerender(ConfiguredRadium(SlimHeader));
