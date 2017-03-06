import {
  pinkishWhiteColor, fashionPinkColor, accentColor,
  mediumGrayColor, subdueAccentColor, sanFranciscoTextFamily
} from 'utils/styles';


export const officerInputWrapperStyle = {
  paddingTop: '11px',
  clear: 'right'
};

const _baseInputStyle = {
  color: fashionPinkColor,
  fontWeight: 500,
  fontSize: '14px',
  fontFamily: sanFranciscoTextFamily,
  backgroundColor: pinkishWhiteColor
};

export const officerInputStyle = {
  wrapper: {
    width: '100%'
  },
  input: {
    ..._baseInputStyle,
    paddingLeft: 0,
    outline: 'none'
  },
  placeholder: {
    ..._baseInputStyle,
    left: 0,
    opacity: '.5'
  }
};

const _baseSuggestionStyle = {
  backgroundColor: 'white',
  fontSize: '14px',
  fontWeight: 400,
  paddingLeft: '16px',
  fontFamily: sanFranciscoTextFamily,
  height: '40px',
  verticalAlign: 'middle',
  lineHeight: '40px',
  zIndex: 1
};

export const messageStyle = {
  ..._baseSuggestionStyle,
  color: mediumGrayColor,
  borderBottom: `solid 1px ${accentColor}`
};

export const autoSuggestionTheme = {
  container: {
    position: 'relative'
  },
  suggestionsList: {
    padding: 0,
    margin: 0,
    listStyleType: 'none'
  },
  suggestionsContainer: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    top: '44px'

  },
  suggestion: {
    ..._baseSuggestionStyle,
    color: accentColor,
    cursor: 'pointer',
    borderBottom: `solid 1px ${accentColor}`
  },
  suggestionFocused: {
    backgroundColor: subdueAccentColor
  }
};
