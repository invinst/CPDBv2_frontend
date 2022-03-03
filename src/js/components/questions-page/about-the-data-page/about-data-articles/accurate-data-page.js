import React from 'react';
import {
  headerStyle, headLineStyle, smallTextStyle, listStyle,
} from 'components/questions-page/questions-page.style';

class AccurateDataPage extends React.PureComponent {
  render() {
    return (
      <div>
        <div>
          <h1 style={ headLineStyle }>
            Advice and answers from the CPDP Team
          </h1>
        </div>
      </div>

    );
  }
}

export default AccurateDataPage;
