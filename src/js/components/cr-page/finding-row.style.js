import { whiteTwoColor, sanFranciscoTextFamily, greyishColor, softBlackColor } from 'utils/styles';


const FINDING_COLORS = {
  'Unfounded': 'rgba(23, 43, 58, 0.3)',
  'Exonerated': 'rgba(98, 178, 140, 0.3)',
  'Not Sustained': 'rgba(37, 138, 173, 0.3)',
  'Sustained': 'rgba(255, 96, 0, 0.3)',
  'No Cooperation': 'rgba(165, 180, 190, 0.3)',
  'No Affidavit': 'rgba(112, 157, 192, 0.3)',
  'Discharged': 'rgba(203, 203, 203, 0.3)',
  'Unknown': 'rgba(152, 152, 152, 0.3)'
};

export const wrapperStyle = {
  fontFamily: sanFranciscoTextFamily,
  fontSize: '14px',
  borderBottom: `solid 1px ${whiteTwoColor}`
};

export const labelStyle = {
  color: greyishColor,
  fontWeight: 500,
  display: 'inline-block',
  width: '175px',
  padding: '11px 0'
};

export const contentStyle = content => ({
  color: softBlackColor,
  padding: '2px 8px',
  backgroundColor: FINDING_COLORS[content] || 'white'
});
