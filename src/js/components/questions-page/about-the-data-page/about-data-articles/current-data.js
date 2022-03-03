import React from 'react';
import {
  headerStyle, headLineStyle, smallTextStyle, listStyle,
} from 'components/questions-page/questions-page.style';

class CurrentDataPage extends React.PureComponent {
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
            How current is the data?
          </h2>
        </div>

        <div>
          <p style={ smallTextStyle }>
          The data displayed on CPDP spans from 1988 to 2018. We regularly request<br/>
          updates to our existing dataset from the City of Chicago. We are also collecting contextual<br/>
          documents about police misconduct, including settlements in civil suits and Chicago<br/>
          Police Board findings.<br/><br/>
          </p>
          <p style={ smallTextStyle }>
          Some investigations that we know to have concluded are still listed in our data<br/>as “open.”<br/><br/>
          </p>
          <p style={ smallTextStyle }>
          For example, there is a complaint filed against Officer Robert Drell, who was the<br/>
          subject of a misconduct allegation in May 2009. You can view the data we have<br/>
          under the  CRID 1062099. The Category, Finding, and Final Outcome of this<br/>
          allegation are “Unknown.” However, Officer Drell was suspended in October 2014<br/>
          and had a hearing in front of the Chicago Police Board in January, 2015. The Board<br/>
          found him not guilty, and Officer Drell was reinstated as an officer, with back-pay, on<br/>
          March 19, 2015.<br/><br/>
          </p>
          <p style={ smallTextStyle }>
          We discovered this discrepancy by matching CRID numbers from Chicago Police<br/>
          Board documents to allegations we have. We are certain there are other departures<br/>as well.
          </p>
        </div>
      </div>
    );
  }
}

export default CurrentDataPage;
