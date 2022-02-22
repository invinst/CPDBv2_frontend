import React, { Component } from 'react';
import {
  headerStyle, headLineStyle, smallTextStyle,
} from '../complaint-pages.style.js';

class ImperfectInfoPage extends Component {
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
            Why is this information imperfect?
          </h2>
          <p style={ smallTextStyle }>
          There are many reasons the data we have received from the City of Chicago is<br></br> 
          incomplete. As we discover errors, we contact the City to ask for corrections. This is<br></br> 
          an ongoing process. <br></br> <br></br>
          The complaints published here come from numerous large datasets released by the<br></br> 
          Chicago Police Department. Each dataset was in a different format, with slightly<br></br> 
          different information. This may account for small discrepancies in language or what<br></br> 
          information is available for a complaint. <br></br> <br></br>
          Due to limitations in the data systems used by the CPD and its oversight agencies,<br></br> 
          most complaints are given a single complaint category, typically the most serious<br></br> 
          allegation. This means that if one officer is accused of excessive force and two fellow<br></br> 
          officers are accused of not reporting the excessive force, all three officers may have a<br></br>
          complaint marked as excessive force. <br></br><br></br>
          The long administrative process for appeals is only partially reflected in the complaint<br></br> 
          data. Outcomes and punishments may vary over time, as those processes are<br></br> 
          completed. <br></br> <br></br>
          One example is a complaint filed against Officer Robert Drell, who was the subject of<br></br> 
          a misconduct allegation in May 2009. You can view the data we have under the CRID<br></br>
          1062099. The Category, Finding, and Final Outcome of this allegation are “Unknown.”<br></br> 
          However, Officer Drell was suspended in October, 2014 and had a hearing in front of<br></br> 
          the Chicago Police Board in January, 2015. The Board found him <a href="https://www.documentcloud.org/documents/2510144-14pb2877-decision.html" target="_blank" rel="noopener noreferrer"><u>not guilty</u></a>, and<br></br>
          Officer Drell was reinstated as an officer, with back-pay, on March 19, 2015. <br></br> <br></br>
          This site does not include settlements after an officer has been sued. Please see<br></br>
          <a href="http://projects.chicagoreporter.com/settlements" target="_blank" rel="noopener noreferrer"><u>Settling for Misconduct</u></a> by the Chicago Reporter. <br></br> <br></br>
          Use of force data is self-reported by officers. If an officer uses force and does not<br></br> 
          complete a Tactical Response Report, that incident is not reflected. So, there may be<br></br>
          a complaint that does not have an associated TRR. <br></br><br></br>
          This data by and large does not include data about juveniles, or data about<br></br>
          undercover officers or whistleblowers. We do not have an exact definition of when an<br></br> 
          officer is undercover. <br></br><br></br>
          The awards data is also incomplete, and only reflects the most common and most<br></br> 
          important awards. <br></br><br></br>
          For a full explanation, please see the contextual information at<br></br> 
          <a href="https://github.com/invinst/chicago-police-data" target="_blank" rel="noopener noreferrer"><u>invisible.institute/data-repository</u></a>
          </p>
        </div>
        <br></br> <br></br> <br></br> <br></br>
      </div>

    );
  }
}

export default ImperfectInfoPage;
