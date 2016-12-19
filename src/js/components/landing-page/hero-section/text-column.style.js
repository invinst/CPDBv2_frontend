import { softBlackColor, sanFranciscoTextFamily } from 'utils/styles';


export const responsiveStyleWrapperStyle = { display: 'inline-block' };

const _textWrapperStyle = {
  display: 'inline-block',
  verticalAlign: 'top',
  boxSizing: 'border-box'
};

export const textWrapperStyle = {
  tablet: {
    ..._textWrapperStyle,
    width: '335px',
    marginLeft: '16px'

  },
  desktop: {
    ..._textWrapperStyle,
    width: '406px',
    marginLeft: '32px'
  },
  extraWide: {
    ..._textWrapperStyle,
    width: '464px',
    marginLeft: '32px'
  }
};

const _heroTitleStyle = {
  fontFamily: sanFranciscoTextFamily,
  fontWeight: 600,
  color: softBlackColor
};

export const heroTitleStyle = {
  tablet: {
    ..._heroTitleStyle,
    fontSize: '27px',
    marginBottom: '2px'
  },
  desktop: {
    ..._heroTitleStyle,
    fontSize: '36px',
    marginBottom: '23px'
  },
  extraWide: {
    ..._heroTitleStyle,
    fontSize: '45px',
    marginBottom: '32px'
  }
};

const _heroTextStyle = {
  fontFamily: sanFranciscoTextFamily,
  fontWeight: 400,
  padding: '25px 0',
  color: softBlackColor
};

export const heroComplaintTextStyle = {
  tablet: {
    ..._heroTextStyle,
    fontSize: '14px'
  },
  desktop: {
    ..._heroTextStyle,
    fontSize: '16px'
  },
  extraWide: {
    ..._heroTextStyle,
    fontSize: '16px'
  }
};

export const heroUseOfForceStyle = {
  tablet: {
    ..._heroTextStyle,
    fontSize: '14px',
    borderTop: `1px solid ${softBlackColor}`,
    width: '335px'
  },
  desktop: {
    ..._heroTextStyle,
    fontSize: '16px',
    borderTop: `1px solid ${softBlackColor}`,
    width: '406px'
  },
  extraWide: {
    ..._heroTextStyle,
    fontSize: '16px',
    borderTop: `1px solid ${softBlackColor}`,
    width: '406px'
  }
};

export const entityLinkStyle = {
  underline: {
    hover: {
      opacity: .2
    }
  }
};
