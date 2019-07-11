import React, { PropTypes, Component } from 'react';

import styles from './empty-pinboard.sass';
import responsiveContainerStyles from 'components/common/responsive-container.sass';
import ExamplePinboardLink from 'components/pinboard-page/empty-pinboard/example-pinboard-link';


export default class EmptyPinboardPage extends Component {
  render() {
    const { examplePinboards } = this.props;
    return (
      <div className={ responsiveContainerStyles.responsiveContainer }>
        <div className={ styles.emptyPinboard }>
          <div className='empty-pinboard-title'>Get started</div>
          <div className='empty-pinboard-description'>
            Use search to find officers and individual complaint records and
            press the plus button to add cards to your pinboard.<br/><br/>
            Come back to the pinboard to give it a title and see a network map or discover relevant documents.
          </div>
          { examplePinboards.map(pinboard => (
            <ExamplePinboardLink
              key={ pinboard.id }
              id={ pinboard.id }
              title={ pinboard.title }
              description={ pinboard.description }
            />
          )) }
          <div className='arrow-head'/>
          <div className='arrow-shaft'/>
        </div>
      </div>
    );
  }
}

EmptyPinboardPage.propTypes = {
  examplePinboards: PropTypes.array,
};
