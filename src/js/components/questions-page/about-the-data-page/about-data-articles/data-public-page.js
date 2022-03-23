import React from 'react';
import {
  headerStyle, headLineStyle, smallTextStyle, listStyle,
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
          In 2007, <a href='https://invisible.institute/jamie-kalven/' target='_blank'
            rel='noopener noreferrer'>Jamie Kalven</a> and
            <a href='https://www.law.uchicago.edu/faculty/futterman' target='_blank'
              rel='noopener noreferrer'>Craig Futterman</a>filed a lawsuit
          to force the city to release<br/>
          complaint records against the Chicago Police Department. A team of civil rights<br/>
          attorneys and advocates fought in court for the next seven years.<br/><br/>
          Before the lawsuit was filed, Kalven and Futterman were litigating on behalf of a<br/>
          woman named Diane Bond. She had been assaulted by a group of CPD Public<br/>Housing
          officers known as the <a href='https://www.theguardian.com/us-news/2016/aug/03/chicago-skullcap-crew-police-brutality' target='_blank'
              rel='noopener noreferrer'>Skullcap Crew</a>. Her lawsuit against the officers began<br/>in
          2004, and the story is chronicled in Kalven’s narrative series
            <a href='https://invisible.institute/kicking-the-pigeon/' target='_blank'
              rel='noopener noreferrer'> Kicking The Pigeon</a>.<br/><br/>
          In 2014 the Illinois Appellate Court issued an <a href='https://invisible.institute/news/2014/kalven-decision'
            target='_blank' rel='noopener noreferrer'>opinion</a> making police misconduct<br/>records public across
          the state of Illinois. That began the fight to force the CPD to<br/>release these records pursuant to the
          Freedom of Information Act. The legal fight<br/>included a detour into an unsuccessful lawsuit filed by the
          Fraternal Order of Police<br/>demanding the City destroy old complaint records and an emergency
          injunction<br/>
          forcing CPD to notify the public before destroying complaint records. In 2016, the
            <br/>courts rejected the FOP’s argument -- another <a href='https://us1.campaign-archive.com/?u=5c80c1740c24b198f0f284cd3&id=419513b859&e=1d4a9fbaa3'
              target='_blank' rel='noopener noreferrer'>major open records victory</a>.<br/><br/>
          To read more about the legal process and results:<br/>
          </p>
          <p style={ listStyle }>
            Jamie Kalven, <a href='https://theintercept.com/2018/08/16/invisible-institute-chicago-police-data/'
              target='_blank'
              rel='noopener noreferrer'>Invisible Institute
              Citizens Police Data Project</a><br/>
          </p>
          <p style={ listStyle }>
            Jamie Kalven, <a href='https://invisible.institute/news/2014/cpd-lists-of-officers-with-the-most-complaints-are-now-public'
              target='_blank' rel='noopener noreferrer'>CPD documents are now public</a><br/>
          </p>
          <p style={ listStyle }>Illinois Policy, <a href='https://www.illinoispolicy.org/chicago-police-unions-are-fighting-to-destroy-decades-of-complaint-records/'
            target='_blank' rel='noopener noreferrer'>Chicago Police Unions are Fighting to
            Destroy Decades of Complaint Records</a><br/>
          </p>
          <p style={ listStyle }>New York Times, <a href='https://www.nytimes.com/2007/07/20/us/20cops.html'
            target='_blank' rel='noopener noreferrer'>Chicago Revamps
          Investigation Into Police Abuse</a><br/>
          </p>
        </div>
      </div>
    );
  }
}

export default DataPublicPage;
