import React from 'react';
import {
  headerStyle, headLineStyle, smallTextStyle,
} from 'components/questions-page/questions-page.style';

class DataPublicPage extends React.PureComponent {
  render() {
    return (
      <div>
        <div>
          <h1 style={ headLineStyle }>
            Advice and answers from the CPDP Team
          </h1>
        </div>

        <div>
          <h2 style={ headerStyle }>
            How did this data become public?
          </h2>
        </div>

        <div>
          <p style={ smallTextStyle }>
          In 2007, <a  href='https://invisible.institute/jamie-kalven/' target='_blank'
          rel='noopener noreferrer'>Jamie Kalven</a> and
            <a href='https://www.law.uchicago.edu/faculty/futterman' target='_blank' 
            rel='noopener noreferrer'>Craig Futterman</a>filed a lawsuit
          to force the city to release<br/>
          complaint records against the Chicago Police Department. A team of civil rights<br/>
          attorneys and advocates fought in court for the next seven years.<br/><br/>
          </p>
        </div>
      </div>
    );
  }
}

export default DataPublicPage;
