import { whiteTwoColor, clayGray, softBlackColor, accentColor } from 'utils/styles';

export const complaintSummaryCardStyle = (hovering) => ({
  height: '266px',
  borderRadius: '2px',
  padding: '11px 16px',
  boxSizing: 'border-box',
  border: `solid 1px ${hovering ? accentColor : whiteTwoColor}`
});

export const titleWrapperStyle = {
  height: '61px',
};

export const dateStyle = (hovering) => ({
  height: '14px',
  fontSize: '12px',
  lineHeight: 1.17,
  textAlign: 'left',
  color: hovering ? accentColor : clayGray,
});

export const categoryStyle = hovering => ({
  fontSize: '14px',
  fontWeight: 500,
  textAlign: 'left',
  marginTop: '2px',
  color: hovering ? accentColor : softBlackColor
});

export const summaryWrapperStyle = (hovering) => ({
  boxSizing: 'border-box',
  paddingTop: '11px',
  borderTop: `solid 2px ${hovering ? accentColor : whiteTwoColor}`
});

export const contentStyle = (hovering) => ({
  fontSize: '14px',
  textAlign: 'left',
  color: hovering ? accentColor : clayGray
});
