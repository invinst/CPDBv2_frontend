import { whiteTwoColor, clayGray, softBlackColor } from 'utils/styles';


export const complaintSummaryCardStyle = {
  width: '232px',
  height: '266px',
  borderRadius: '2px',
  padding: '11px 16px',
  boxSizing: 'border-box',
  border: `solid 1px ${whiteTwoColor}`,
};

export const titleWrapperStyle = {
  height: '61px',
};

export const dateStyle = {
  height: '14px',
  fontSize: '12px',
  lineHeight: 1.17,
  textAlign: 'left',
  color: clayGray,
};

export const categoryStyle = {
  fontSize: '14px',
  fontWeight: 500,
  textAlign: 'left',
  marginTop: '2px',
  color: softBlackColor,
};

export const summaryWrapperStyle = {
  boxSizing: 'border-box',
  paddingTop: '11px',
  borderTop: `solid 2px ${whiteTwoColor}`
};

export const contentStyle = {
  fontSize: '14px',
  textAlign: 'left',
  color: 'rgb(102,102,102)' // text-shadow not supported spread-distance
};
