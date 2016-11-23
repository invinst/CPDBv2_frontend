import { pinkishGreyColor, sanFranciscoTextFamily } from 'utils/styles';
import { DESKTOP, TABLET, EXTRA_WIDE } from 'utils/constants';


const _leftBarStyle = () => ({
  display: 'inline-block',
  boxSizing: 'border-box',
  paddingLeft: '32px',
  paddingTop: '74px',
  width: '482px',
  borderRight: `1px solid ${pinkishGreyColor}`,
  minHeight: `${window.innerHeight - 88}px`
});

export const leftBarStyle = {
  [EXTRA_WIDE]: () => _leftBarStyle(),
  [DESKTOP]: () => ({
    ..._leftBarStyle(),
    width: '400px'
  })
};

const _rightBarStyle = () => ({
  display: 'inline-block',
  boxSizing: 'border-box',
  paddingTop: '77px',
  paddingRight: '32px',
  paddingLeft: '32px',
  width: '704px',
  verticalAlign: 'top',
  borderLeft: `1px solid ${pinkishGreyColor}`,
  marginLeft: '-1px',
  minHeight: `${window.innerHeight - 88}px`
});

export const rightBarStyle = {
  [EXTRA_WIDE]: () => _rightBarStyle(),
  [DESKTOP]: () => ({
    ..._rightBarStyle(),
    width: '590px'
  })
};

export const answerStyle = {
  wrapper: {
    fontSize: '18px',
    fontWeight: '400',
    marginBottom: '12px'
  },
  paragraph: {
    marginTop: 0,
    fontFamily: sanFranciscoTextFamily,
    marginBottom: '20px'
  }
};

export const _questionStyle = {
  fontSize: '32px',
  fontWeight: '600',
  marginBottom: '32px',
  fontFamily: sanFranciscoTextFamily,
  paddingRight: '32px'
};

export const questionStyle = {
  [EXTRA_WIDE]: _questionStyle,
  [DESKTOP]: {
    ..._questionStyle,
    fontSize: '26px'
  },
  [TABLET]: _questionStyle
};

export const contentWrapperStyle = () => ({
  overflowY: 'auto',
  height: `${window.innerHeight - 88}px`
});

export const answerWrapperStyle = {
  fontSize: '18px',
  fontWeight: '400'
};

export const oneColumnStyle = {
  paddingTop: '74px',
  paddingRight: '32px',
  paddingLeft: '32px',
  boxSizing: 'border-box'
};

export const extraPaddingStyle = {
  paddingTop: '124px'
};
