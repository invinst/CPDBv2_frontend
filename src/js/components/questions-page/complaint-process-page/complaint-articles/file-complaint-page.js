import React, { Component } from 'react';
import {
  headerStyle, headLineStyle, smallTextStyle, centeredSmallTextStyle, inArticleHeaderStyle
} from '../complaint-pages.style.js';

class FileComplaintArticlePage extends Component {
  render() {
    return (
      <div>

        <div>
          <h1 style={ headLineStyle }>
            Advice and answers from the CPDP team
          </h1>
        </div>

        <div>
          <h2 style={ headerStyle }>
            How do I file a complaint?
          </h2>
        </div>

        <div>
          <p style={ smallTextStyle }>
            Complaints against the Chicago Police Department can be submitted to the<br></br> <a href="https://www.chicagocopa.org/" target="_blank"><u>Civilian Office of Police Accountability</u></a> (COPA). <br></br> <br></br>
            COPA is an independent agency that oversees misconduct investigations. They<br></br> accept complaints <a href="https://www.chicagocopa.org/complaints/intake-form/" target="_blank"><u>online</u></a>, by phone, and in person. 
            <br></br> <br></br> <br></br>
          </p>
          <p style={ centeredSmallTextStyle }>
            (312) 743-2672 <br></br> <br></br> <br></br>
            1615 W. Chicago Avenue, 4th Floor <br></br> Chicago IL 60622
          </p>
        </div>

        <div>
          <h3 style={ inArticleHeaderStyle }>
            What happens after I file a complaint <br></br> 
          </h3>
          <p style={ smallTextStyle }>
          After you file a complaint, an investigator will ask you to sign an affidavit, swearing<br></br> 
          that your statement is true. If you lie in this sworn statement, you may be charged<br></br> 
          with the crime of perjury, so consider obtaining legal counsel before signing an<br></br> 
          affidavit. For an analysis of the affidavit policy, please see researcher Bocar Ba’s<br></br>
          <a href="https://www.dropbox.com/s/bny5hze4dlvy2vu/jmp_Bocar%20Ba.pdf?dl=0"><u>Going the Extra Mile</u></a>. <br></br><br></br>
          On COPA's website, there is a detailed explanation of the <a href="https://www.chicagocopa.org/investigations/investigative-process/"><u>Investigative Process</u></a>.
          </p>
        </div>
        <br></br>

        <div>
          <h3 style={ inArticleHeaderStyle }>
            We can help <br></br>
          </h3>
          <p style={ smallTextStyle }>
            If you'd like help with the process, please send an email to complaints@invisibleinstitute.com.
          </p>
        </div>


      </div>
    );
  }
}

export default FileComplaintArticlePage;
