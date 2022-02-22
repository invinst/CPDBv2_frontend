import React, { Component } from 'react';
import {
  headLineStyle, sectionHeaderStyle, smallSubHeaderStyle,
} from './questions-page.style';

class QuestionsPage extends Component {
  render() {
    return (
      <div>
        <div>
          <h1 style={ headLineStyle }>
            Advice and answers from the CPDP Team
          </h1>
        </div>
        
        <div>
          <h2 style={ sectionHeaderStyle }>
            <a href="/complaint-process">The Complaint Process</a>
          </h2>
          <h3 style={ smallSubHeaderStyle }>
            Can you help me file a complaint? How do complaints get investigated?
            <br></br>How do I file a complaint? Why is this information imperfect?
          </h3>
        </div>

        <div>
          <h2 style={ sectionHeaderStyle }>
            About the Data
          </h2>
          <h3 style={ smallSubHeaderStyle }>
            How did this data become public? How current is the data? How accurate is the data?
            <br></br>How do I report incorrect data? Can I download the whole dataset?
          </h3>
        </div>

        <div>
          <h2 style={ sectionHeaderStyle }>
            How does CPDP work?
          </h2>
          <h3 style={ smallSubHeaderStyle }>
            Who made this website? How does CPDP get its data? <br></br> How are the datasets organized?
          </h3>
        </div>

        <div>
          <h2 style={ sectionHeaderStyle }>
            What can I search?
          </h2>
          <h3 style={ smallSubHeaderStyle }>
            How do I search for someone? Can I search by race,<br></br>or gender, or other categories?
            How are your percentiles calculated?
          </h3>
        </div>

        <div>
          <h2 style={ sectionHeaderStyle }>
            Glossary
          </h2>
          <h3 style={ smallSubHeaderStyle }>
            What is FOIA, TRR, CR, IPRA, and COPA? Click "glossary" and "what can I search"<br></br> on the CPDP home page for more definitions.
          </h3>
        </div>

        <div>
          <h2 style={ sectionHeaderStyle }>
            Collaborate
          </h2>
          <h3 style={ smallSubHeaderStyle }>
            How can I collaborate with CPDP and the Invisible Institute? Where is the information I requested?
            <br></br>If I have information that you don't have, how can I share it?
          </h3>
        </div>
      </div>
      

      
    );
  }
}

export default QuestionsPage;
