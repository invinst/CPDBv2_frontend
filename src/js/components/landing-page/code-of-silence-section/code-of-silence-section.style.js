import { pinkishGreyColor, sanFranciscoTextFamily, accentColor } from 'utils/styles';
import { DESKTOP, EXTRA_WIDE } from 'utils/constants';


const _wrapperStyle = {
  height: '340px',
  boxSizing: 'border-box',
  width: '100%',
  background: '#36322d',
  fontFamily: sanFranciscoTextFamily,
  letterSpacing: 'normal',
  padding: '140px 74px'
};

export const wrapperStyle = {
  [EXTRA_WIDE]: _wrapperStyle,
  [DESKTOP]: {
    ..._wrapperStyle,
    height: '279px',
    padding: '116px 60px'
  }
};

const _titleStyle = {
  display: 'inline-block',
  height: '60px',
  fontWeight: 300,
  fontSize: '48px',
  textAlign: 'center',
  color: 'white',
  verticalAlign: 'top',
  width: '436px'
};

export const titleStyle = {
  [EXTRA_WIDE]: _titleStyle,
  [DESKTOP]: {
    ..._titleStyle,
    height: '47px',
    fontSize: '38px',
    width: '358px'
  }
};

const _rightColumnStyle = {
  display: 'inline-block',
  width: '436px',
  marginLeft: '148px',
  fontSize: '18px',
  fontWeight: 300,
  color: 'white'
};

export const rightColumnStyle = {
  [EXTRA_WIDE]: _rightColumnStyle,
  [DESKTOP]: {
    ..._rightColumnStyle,
    width: '358px',
    marginLeft: '122px',
    fontSize: '14px'
  }
};

const _firstRowStyle = {
  paddingBottom: '13px',
  height: '18px',
  borderBottom: `2px solid ${pinkishGreyColor}`
};

export const firstRowStyle = {
  [EXTRA_WIDE]: _firstRowStyle,
  [DESKTOP]: {
    ..._firstRowStyle,
    height: '14px',
    paddingBottom: '12px',
    borderBottom: `1px solid ${pinkishGreyColor}`
  }
};

export const linkStyle = {
  base: {
    base: {
      color: 'white',
      cursor: 'pointer',
      marginLeft: '5px',
      // fontSize: '18px',
      fontWeight: 400
    },
    hover: {
      color: accentColor,
      cursor: 'pointer',
      marginLeft: '5px',
      // fontSize: '18px',
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
  [EXTRA_WIDE]: {
    paddingTop: '9px'
  },
  [DESKTOP]: {
    paddingTop: '4px'
  }
};

export const stripeButtonStyle = {
  [EXTRA_WIDE]: {
    marginLeft: '46px'
  },
  [DESKTOP]: {
    marginLeft: '42px'
  }
};

