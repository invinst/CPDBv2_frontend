import React from 'react';
import {
  headerStyle, headLineStyle, sectionHeaderStyle, authorStyle,
} from '../questions-page.style';


class ComplaintProcessPage extends React.PureComponent {
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
            The Complaint Process
          </h1>
        </div>

        <div>
          <h2 style={ sectionHeaderStyle }>
            <a href='/complaint-investigate'>How do complaints get investigated?</a>
          </h2>
          <p style={ authorStyle }>
            Written by Invisible Institute
          </p>
        </div>

        <div>
          <h2 style={ sectionHeaderStyle }>
            <a href='/how-to-file-complaint'>How do I file a complaint?</a>
          </h2>
          <p style={ authorStyle }>
            Written by Invisible Institute
          </p>
        </div>

        <div>
          <h2 style={ sectionHeaderStyle }>
            <a href='/why-is-info-imperfect'>Why is this information imperfect?</a>
          </h2>
          <p style={ authorStyle }>
            Written by Invisible Institute
          </p>
        </div>

      </div>
    );
  }
}

export default ComplaintProcessPage;
