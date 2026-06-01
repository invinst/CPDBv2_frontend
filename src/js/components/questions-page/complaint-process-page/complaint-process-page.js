import React from 'react';
import {
  headerStyle, headLineStyle, sectionHeaderStyle, authorStyle,
} from '../questions-page.style';
import Accordion from '@mui/material/Accordion';
//import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
//import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Typography from '@mui/material/Typography';


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
          <Accordion>
            <AccordionSummary
              expandIcon={ <ArrowDownwardIcon /> }
            >
              <Typography component='span'>Accordion 1</Typography>
            </AccordionSummary>
          </Accordion>
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
