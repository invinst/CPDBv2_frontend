import { pinkishGreyColor, sanFranciscoTextFamily, accentColor } from 'utils/styles';


export const wrapperStyle = {
  height: '340px',
  boxSizing: 'border-box',
  width: '100%',
  background: '#36322d',
  fontFamily: sanFranciscoTextFamily,
  letterSpacing: 'normal',
  padding: '140px 74px'
};

export const titleStyle = {
  display: 'inline-block',
  height: '60px',
  fontWeight: 300,
  fontSize: '48px',
  textAlign: 'center',
  color: 'white',
  verticalAlign: 'top',
  width: '436px'
};

export const rightColumnStyle = {
  display: 'inline-block',
  width: '436px',
  marginLeft: '148px',
  fontSize: '18px',
  fontWeight: 300,
  color: 'white'
};

export const firstRowStyle = {
  paddingBottom: '13px',
  height: '18px',
  borderBottom: `2px solid ${pinkishGreyColor}`
};

export const linkStyle = {
  base: {
    base: {
      color: 'white',
      fontSize: '18px',
      fontWeight: 400
    },
    hover: {
      color: accentColor,
      fontSize: '18px',
      fontWeight: 400
    }
  },
  underline: {
    base: {
      backgroundColor: 'white',
      opacity: .2
    },
    hover: {
      backgroundColor: accentColor,
      opacity: 1
    }
  }
};

export const secondRowStyle = {
  paddingTop: '9px'
};

