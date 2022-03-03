import React from 'react';
import {
  authorStyle,
  headerStyle,
  headLineStyle,
  sectionHeaderStyle,
} from '../questions-page.style';

class AboutTheDataPage extends React.PureComponent {
  render() {
    return (
      <div>
        <div>
          <h1 style={ headLineStyle }>
            Advice and answers from the CPDP Team
          </h1>
        </div>

        <div>
          <h1 style={ headerStyle }>
            About the Data
          </h1>
        </div>

        <div>
          <h2 style={ sectionHeaderStyle }>
            <a href='/data-public'>How did this data become public?</a>
          </h2>
          <p style={ authorStyle }>
            Written by Invisible Institute
          </p>
        </div>

        <div>
          <h2 style={ sectionHeaderStyle }>
            <a href='/current-data'>How current is the data?</a>
          </h2>
          <p style={ authorStyle }>
            Written by Invisible Institute
          </p>
        </div>

        <div>
          <h2 style={ sectionHeaderStyle }>
            <a href='/accurate-data'>How accurate is the data?</a>
          </h2>
          <p style={ authorStyle }>
            Written by Invisible Institute
          </p>
        </div>

        <div>
          <h2 style={ sectionHeaderStyle }>
            How do I report incorrect data?
          </h2>
          <p style={ authorStyle }>
            Written by Invisible Institute
          </p>
        </div>

        <div>
          <h2 style={ sectionHeaderStyle }>
            Can I download the whole dataset?
          </h2>
          <p style={ authorStyle }>
            Written by Invisible Institute
          </p>
        </div>

        <div>
          <h2 style={ sectionHeaderStyle }>
            Do you have the dataset organized by time?
          </h2>
          <p style={ authorStyle }>
            Written by Invisible Institute
          </p>
        </div>
      </div>
    );
  }
}

export default AboutTheDataPage;
