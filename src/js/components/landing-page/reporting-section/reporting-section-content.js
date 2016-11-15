import React, { PropTypes, Component } from 'react';

import ConfiguredRadium from 'utils/configured-radium';
import { arrayOfN } from 'utils/prop-validators';
import ResponsiveComponent from 'components/responsive/responsive-component';
import Report from 'components/common/report/report';
import { storyWrapperStyle, smallStoryStyle, divideLineStyle } from './reporting-section-content.style';


class ReportingSectionContent extends Component {
  render() {
    const { reports, onStoryClick } = this.props;

    return (
      <ResponsiveComponent
        tabletChildren={
          <div className='pure-g'>
            <div className='pure-u-1-2'>
              <Report
                report={ reports[0] }
                wrapperStyle={ storyWrapperStyle }
                type={ 2 }
                onClick={ onStoryClick }/>
            </div>
            <div className='pure-u-1-2'>
              <div className='pure-u-1-1'>
                <Report
                  report={ reports[1] }
                  wrapperStyle={ { ...storyWrapperStyle, ...smallStoryStyle.tablet } }
                  type={ 3 }
                  onClick={ onStoryClick }/>
              </div>
              <div style={ divideLineStyle }/>
              <div className='pure-u-1-1'>
                <Report
                  report={ reports[2] }
                  wrapperStyle={ { ...storyWrapperStyle, ...smallStoryStyle.tablet } }
                  type={ 3 }
                  onClick={ onStoryClick }/>
              </div>
            </div>
          </div>
        }
        desktopChildren={
          <div className='pure-g'>
            <div className='pure-u-1-2'>
              <Report
                report={ reports[0] }
                wrapperStyle={ storyWrapperStyle }
                type={ 2 }
                onClick={ onStoryClick }/>
            </div>
            <div className='pure-u-1-2'>
              <div className='pure-u-1-2'>
                <Report
                  report={ reports[1] }
                  wrapperStyle={ { ...storyWrapperStyle, ...smallStoryStyle.desktop } }
                  type={ 3 }
                  onClick={ onStoryClick }/>
              </div>
              <div className='pure-u-1-2'>
                <Report
                  report={ reports[2] }
                  wrapperStyle={ { ...storyWrapperStyle, ...smallStoryStyle.desktop } }
                  type={ 3 }
                  onClick={ onStoryClick }/>
              </div>
            </div>
          </div>
        }
        extraWideChildren={
          <div className='pure-g'>
            <div className='pure-u-1-2'>
              <Report
                report={ reports[0] }
                wrapperStyle={ storyWrapperStyle }
                type={ 2 }
                onClick={ onStoryClick }/>
            </div>
            <div className='pure-u-1-2'>
              <div className='pure-u-1-2'>
                <Report
                  report={ reports[1] }
                  wrapperStyle={ { ...storyWrapperStyle, ...smallStoryStyle.desktop } }
                  type={ 3 }
                  onClick={ onStoryClick }/>
              </div>
              <div className='pure-u-1-2'>
                <Report
                  report={ reports[2] }
                  wrapperStyle={ { ...storyWrapperStyle, ...smallStoryStyle.desktop } }
                  type={ 3 }
                  onClick={ onStoryClick }/>
              </div>
            </div>
          </div>
        }/>
    );
  }
}

ReportingSectionContent.propTypes = {
  reports: arrayOfN(3),
  onStoryClick: PropTypes.func
};

export default ConfiguredRadium(ReportingSectionContent);
