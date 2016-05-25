import React, { PropTypes } from 'react';
import Radium from 'radium';
import classNames from 'classnames';

import ArticleContent from 'components/common/article-content';
import ArticleHeader from 'components/common/article-header';
import ArticleFooter from 'components/common/article-footer';
import ArticleExpanded from 'components/common/article-expanded';


class StoryFull extends React.Component {
  render() {
    let className = classNames('story-full', this.props.className);
    return (
      <ArticleExpanded className={ className } style={ { outer: this.props.style } }>
        <ArticleHeader>{ this.props.story.date }</ArticleHeader>
        {
          this.props.story.paragraphs.map((paragraph, ind) => (
            <ArticleContent key={ ind }>{ paragraph }</ArticleContent>
          ))
        }
        <ArticleFooter>{ this.props.story.newspaperName }</ArticleFooter>
      </ArticleExpanded>
    );
  }
}

StoryFull.propTypes = {
  story: PropTypes.shape({
    date: PropTypes.string,
    paragraphs: PropTypes.arrayOf(PropTypes.string),
    newspaperName: PropTypes.string
  }),
  style: PropTypes.object,
  className: PropTypes.string
};

StoryFull.defaultProps = {
  story: {
    date: 'November 17, 2016',
    paragraphs: [
      [
        'By 2007, the department was engulfed in scandal over a surveillance video that showed',
        ' a drunken officer, Anthony Abbate, beating a female bartender, and allegations that ',
        'fellow officers covered up for him. That year, Mr. Emanuel\'s predecessor, Mayor Richard',
        ' M. Daley, announced the creation of the Independent Police Review Authority - run by',
        ' civilians and overseen by the mayor - to replace the Office of Professional Standards.'
      ].join(''),
      [
        'Now the new system is accused of being little better than the old. From 2011 to 2015, ',
        '97 percent of more than 28,500 citizen complaints resulted in no officer being punished, ',
        'according to data recently released by the Invisible Institute, a nonprofit journalism ',
        'organization, and the Mandel Legal Aid Clinic of the University of Chicago Law School. ',
        'The Police Department and the review authority have questioned the data, though Mr. ',
        'Emanuel said last week that the low rates of disciplinary action "defy credibility."'
      ].join('')
    ],
    newspaperName: 'View On New York Times Website'
  }
};

export default Radium(StoryFull);
