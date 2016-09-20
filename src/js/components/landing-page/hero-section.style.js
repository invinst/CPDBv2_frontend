import { accentColor, softBlackColor, wildSandColor, altoColor, sanFranciscoTextFamily } from 'utils/styles';


export const wrapperStyle = {
  backgroundColor: wildSandColor
};

export const leftColumnWrapper = {
  paddingRight: '50px',
  borderRight: `1px solid ${altoColor}`
};

export const rightColumnWrapper = {
  paddingLeft: '50px'
};

export const innerWrapperStyle = {
  backgroundColor: 'white',
  margin: '5px 32px 60px',
  padding: '50px',
  boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.17)'
};

export const linkStyle = {
  color: softBlackColor,
  fontSize: '13px',
  fontFamily: sanFranciscoTextFamily,
  fontWeight: '600',
  textDecoration: 'none',
  cursor: 'pointer',
  ':hover': {
    color: accentColor
  }
};

export const paragraphStyle = {
  fontFamily: sanFranciscoTextFamily,
  marginTop: '18px',
  marginBottom: '5px',
  fontSize: '15px'
};

export const previewImageStyle = {
  base: {
    height: '278px',
    cursor: 'pointer'
  },

  extraWide: {
    height: '358px'
  },

  tablet: {
    height: '192px'
  }
};
