import React, {PropTypes} from 'react';
import Radium from 'radium';

import ArticleContent from 'components/common/article-content';
import ArticleHeader from 'components/common/article-header';
import ArticleFooter from 'components/common/article-footer';
import {outerWrapperStyle, storyWrapperStyle} from 'components/story-expanded.style';


class StoryExpanded extends React.Component {
  render() {
    return (
      <div className={ this.props.className } style={ [outerWrapperStyle, this.props.style] }>
        <div style={ storyWrapperStyle }>
          <ArticleHeader>{ this.props.story.date }</ArticleHeader>
          {
            this.props.story.paragraphs.map((paragraph, ind) => {
              return (
                <ArticleContent key={ ind }>{ paragraph }</ArticleContent>
              );
            })
          }
          <ArticleFooter>{ this.props.story.paper }</ArticleFooter>
        </div>
      </div>
    );
  }
}

StoryExpanded.propTypes = {
  story: PropTypes.shape({
    date: PropTypes.string,
    paragraphs: PropTypes.arrayOf(PropTypes.string),
    paper: PropTypes.string
  }),
  style: PropTypes.object,
  className: PropTypes.string
};

StoryExpanded.defaultProps = {
  story: {
    date: 'November 17, 2016',
    paragraphs: [
      [
        'By 2007, the department was engulfed in scandal over a surveillance video that showed',
        ' a drunken officer, Anthony Abbate, beating a female bartender, and allegations that ',
        'fellow officers covered up for him. That year, Mr. Emanuel’s predecessor, Mayor Richard',
        ' M. Daley, announced the creation of the Independent Police Review Authority — run by',
        ' civilians and overseen by the mayor — to replace the Office of Professional Standards.'
      ].join(''),
      [
        'Now the new system is accused of being little better than the old. From 2011 to 2015, ',
        '97 percent of more than 28,500 citizen complaints resulted in no officer being punished, ',
        'according to data recently released by the Invisible Institute, a nonprofit journalism ',
        'organization, and the Mandel Legal Aid Clinic of the University of Chicago Law School. ',
        'The Police Department and the review authority have questioned the data, though Mr. ',
        'Emanuel said last week that the low rates of disciplinary action “defy credibility.”'
      ].join('')
    ],
    paper: 'View On New York Times Website'
  }
};

export default Radium(StoryExpanded);
