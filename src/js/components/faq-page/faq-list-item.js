import React, { Component, PropTypes } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import ExpandTransition from 'components/animation/expand-transition';
import FAQItemContent from './faq-item-content';
import { faqItemWrapperStyle, faqItemExpandedStyle, dropPreviewStyle } from './faq-list-item.style';
import FAQItem from 'components/common/faq/faq-item';


class FAQListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.onStarredToggle = this.onStarredToggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      expanded: nextProps.expandedId === nextProps.faqId
    });
  }

  onStarredToggle(starred) {
    const { faqId, updateFAQ } = this.props;

    updateFAQ(faqId, { meta: { starred: starred } });
  }

  render() {
    const { faqId, handleClick, fieldProps, isDragging, starred } = this.props;
    const { expanded } = this.state;
    const { editModeOn } = this.context;

    if (isDragging) {
      return <div style={ dropPreviewStyle }/>;
    }

    return (
      <div style={ faqItemWrapperStyle }>
        <FAQItem
          fieldProps={ fieldProps } faqId={ faqId } starred={ starred }
          showStar={ editModeOn } onStarredToggle={ this.onStarredToggle }
          onClick={ handleClick } wrapperStyle={ [expanded && faqItemExpandedStyle] }/>
        <ExpandTransition
          childKey={ expanded ? faqId : null }
          onFullyClosed={
            /* istanbul ignore next */
            (key) => {this.setState({ expanded: false });}
          }
          onExpansionBegin={
            /* istanbul ignore next */
            (key) => {this.setState({ expanded: true });}
          }>
          <FAQItemContent fieldProps={ fieldProps } expanded={ expanded }/>
        </ExpandTransition>
      </div>
    );
  }
}

FAQListItem.propTypes = {
  fieldProps: PropTypes.object,
  faqId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleClick: PropTypes.func,
  isDragging: PropTypes.bool,
  expandedId: PropTypes.number,
  starred: PropTypes.bool,
  updateFAQ: PropTypes.func
};

FAQListItem.contextTypes = {
  editModeOn: PropTypes.bool
};

export default ConfiguredRadium(FAQListItem);
