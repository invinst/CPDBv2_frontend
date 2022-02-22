import React, { Component } from 'react';
import {
  headerStyle, headLineStyle, smallTextStyle,
} from '../complaint-pages.style.js';


class ComplaintInvestigatePage extends Component {
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
            How do complaints get investigated?
          </h2>
        </div>

        <div>
          <p style={ smallTextStyle }>
            All complaints made by civilians are initially processed by the independent agency <br>
            </br> <a href="https://www.chicagocopa.org/" target="_blank" rel="noopener noreferrer"><u>Civilian Office of Police Accountability</u>
            </a>, which then assigns them to the proper agency. <br>
            </br> <br></br>
            Currently, COPA investigates certain types of serious complaints against Chicago<br>
            </br> Police officers, including excessive force, domestic violence, and improper search<br>
            </br> and seizure. COPA also investigates all officer-involved shootings. All other <br>
            </br>complaints are investigated by CPD officers, typically police supervisors or officers<br>
            </br> assigned to the <a href="https://home.chicagopolice.org/inside-cpd/reports/" target="_blank" 
            rel="noopener noreferrer"><u>Bureau of Internal Affairs</u></a>. <br></br>
            <br></br>The implicated officers will be notified of the complaint. The investigators will collect<br>
            </br> evidence, conduct interviews, and prepare their findings. A complaint can either be<br>
            </br> sustained or unsustained. If the complaint is sustained, the agency will recommend<br>
            </br>the appropriate discipline. There is then a legal review process that allows for appeal. <br></br><br></br>
            The <a href="https://www.chicago.gov/city/en/depts/cpb.html" target="_blank" rel="noopener noreferrer">
              <u>Chicago Police Board</u></a> is the agency that makes the final decision about whether<br>
            </br> to discipline an officer. <br></br> <br></br>
            On COPA's website, there is a detailed explanation of the <a href="https://www.chicagocopa.org/investigations/investigative-process/" target="_blank" rel="noopener noreferrer"><u>Investigative Process</u></a>.
          </p>
        </div>
      </div>
    );
  }
}

export default ComplaintInvestigatePage;
