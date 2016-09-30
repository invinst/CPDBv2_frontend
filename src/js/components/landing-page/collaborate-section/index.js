import React, { PropTypes } from 'react';

import {
  paragraphStyle, underlinedLinkStyle, contentStyle, paragraphWrapperStyle, wrapperStyle, headerStyle,
  editLinkBaseStyle, editLinkHoverStyle, editLinkUnderlineBaseStyle, editLinkUnderlineHoverStyle,
  moreLinkWrapperStyle, editModeWrapperStyle, buttonStyle
} from './collaborate-section.style';
import ResponsiveStyleComponent, {
  DESKTOP, TABLET, EXTRA_WIDE
} from 'components/responsive/responsive-style-component';
import ConfiguredRadium from 'utils/configured-radium';
import MoreLink from 'components/common/more-link';
import PropsRerender from 'components/common/higher-order/props-rerender';
import { convertToRaw } from 'draft-js';
import CollaborateContent from './collaborate-content';
import CollaborateHeader from './collaborate-header';


class CollaborateSection extends ResponsiveStyleComponent {
  constructor(props) {
    super(props);
    const { bodyEditorState, headerEditorState } = props;
    this.state = {
      editModeOn: false,
      bodyEditorState,
      headerEditorState
    };

    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.handleHeaderChange = this.handleHeaderChange.bind(this);
    this.handleToggleEditable = this.handleToggleEditable.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
  }

  handleBodyChange(editorState) {
    this.setState({ bodyEditorState: editorState });
  }

  handleHeaderChange(editorState) {
    this.setState({ headerEditorState: editorState });
  }

  handleToggleEditable() {
    const { editModeOn } = this.state;

    this.setState({
      editModeOn: !editModeOn
    });
  }

  componentWillReceiveProps(nextProps) {
    const { bodyEditorState, headerEditorState } = nextProps;
    this.setState({
      bodyEditorState,
      headerEditorState
    });
  }

  handleUpdateClick() {
    const { handleUpdate } = this.props;
    const { bodyEditorState, editModeOn, headerEditorState } = this.state;
    const collaborateContent = convertToRaw(bodyEditorState.getCurrentContent());
    const collaborateHeader = headerEditorState
      .getCurrentContent()
      .getFirstBlock()
      .getText();

    handleUpdate({
      'collaborate_header': collaborateHeader,
      'collaborate_content': collaborateContent
    }).then(() => {
      this.setState({
        editModeOn: !editModeOn
      });
    });
  }

  responsiveStyle() {
    return {
      [EXTRA_WIDE]: {
        wrapper: paragraphWrapperStyle.extraWide,
        paragraph: { ...paragraphStyle.base, ...paragraphStyle.extraWide },
        underlineLink: { ...paragraphStyle.base, ...paragraphStyle.extraWide, ...underlinedLinkStyle },
        header: { ...headerStyle.base, ...headerStyle.extraWide }
      },
      [DESKTOP]: {
        wrapper: paragraphWrapperStyle.desktop,
        paragraph: { ...paragraphStyle.base, ...paragraphStyle.desktop },
        underlineLink: { ...paragraphStyle.base, ...underlinedLinkStyle },
        header: { ...headerStyle.base, ...headerStyle.desktop }
      },
      [TABLET]: {
        wrapper: paragraphWrapperStyle.tablet,
        paragraph: { ...paragraphStyle.base, ...paragraphStyle.tablet },
        underlineLink: { ...paragraphStyle.base, ...paragraphStyle.tablet, ...underlinedLinkStyle },
        header: { ...headerStyle.base, ...headerStyle.tablet }
      }
    };
  }

  renderEditToggle() {
    const { editModeOn } = this.context;

    if (!editModeOn) {
      return null;
    }

    return (
      <div style={ moreLinkWrapperStyle }>
        {
          !this.state.editModeOn ?
            <MoreLink
              style={ {
                base: { base: editLinkBaseStyle, hover: editLinkHoverStyle },
                underline: { base: editLinkUnderlineBaseStyle, hover: editLinkUnderlineHoverStyle }
              } }
              onClick={ this.handleToggleEditable }>
              Edit
            </MoreLink> :
            <div>
              <a onClick={ this.handleToggleEditable } style={ buttonStyle }>Cancel</a>
              <a style={ buttonStyle } onClick={ this.handleUpdateClick }>Update</a>
            </div>
        }
      </div>
    );
  }

  renderWithResponsiveStyle(style) {
    const { headerText, body } = this.props;
    const { editModeOn, bodyEditorState, headerEditorState } = this.state;

    return (
      <div style={ [wrapperStyle, editModeOn && editModeWrapperStyle] }>
        <div style={ style.header }>
          <CollaborateHeader
            headerText={ headerText }
            onChange={ this.handleHeaderChange }
            editModeOn={ editModeOn }
            editorState={ headerEditorState }/>
          { this.renderEditToggle() }
        </div>
        <div style={ contentStyle }>
          <CollaborateContent
            style={ style }
            onChange={ this.handleBodyChange }
            editModeOn={ editModeOn }
            editorState={ bodyEditorState }
            presenterContent={ body }/>
        </div>
      </div>
    );
  }
}

CollaborateSection.propTypes = {
  headerText: PropTypes.string,
  body: PropTypes.array,
  bodyEditorState: PropTypes.object,
  headerEditorState: PropTypes.object
};

CollaborateSection.defaultProps = {
  body: ['We are collecting and publishing information that sheds light on police misconduct.',
        'If you have documents or datasets you would like to publish, please email us, or learn more.']
};

CollaborateSection.contextTypes = {
  editModeOn: PropTypes.bool
};

export default PropsRerender(ConfiguredRadium(CollaborateSection));
