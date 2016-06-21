import React, { PropTypes } from 'react';
import classNames from 'classnames';

import ConfiguredRadium from 'utils/configured-radium';
import ArticleContent from 'components/common/article-content';
import ArticleHeader from 'components/common/article-header';
import ArticleFooter from 'components/common/article-footer';
import { footerStyle, leftBarStyle, rightBarStyle } from './story-full.style';
import { DESKTOP } from 'utils/constants';


class StoryFull extends React.Component {
  render() {
    let { story, style, className } = this.props;
    className = classNames('story-full pure-g', className);

    return (
      <div className={ className } style={ { outer: style } }>
        <div className='pure-u-1-4'>
          <div style={ leftBarStyle }>
            <ArticleHeader device={ DESKTOP }>{ story.newspaperName }</ArticleHeader>
            <ArticleContent device={ DESKTOP }>{ story.title }</ArticleContent>
          </div>
        </div>
        <div className='pure-u-3-4'>
          <div style={ rightBarStyle }>
            {
              story.paragraphs.map((paragraph, ind) => (
                <ArticleContent device={ DESKTOP } key={ ind }>{ paragraph }</ArticleContent>
              ))
            }
          </div>
        </div>
        <ArticleFooter device={ DESKTOP } className='pure-u-1-1' href={ story.canonicalUrl }
          style={ { wrapper: footerStyle } }>
          continued on { story.newspaperShortName }
        </ArticleFooter>
      </div>
    );
  }
}

StoryFull.propTypes = {
  story: PropTypes.shape({
    title: PropTypes.string,
    paragraphs: PropTypes.arrayOf(PropTypes.string),
    newspaperName: PropTypes.string,
    newspaperShortName: PropTypes.string,
    canonicalUrl: PropTypes.string
  }),
  style: PropTypes.object,
  className: PropTypes.string
};

StoryFull.defaultProps = {
  story: {
    title: 'Complaints against Chicago Police rarely result in discipline data shows.',
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
    newspaperName: 'New York Times',
    newspaperShortName: 'nyt.com'
  }
};

export default ConfiguredRadium(StoryFull);
