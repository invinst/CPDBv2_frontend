import {
  TABLET, DESKTOP, EXTRA_WIDE
} from 'utils/constants';


export default [
  {
    reportsNo: 1,
    type: 0,
    reportType: 0
  },
  {
    reportsNo: 1,
    type: 1,
    reportType: 1
  }
];

export const groupStyles = [
  {
    [EXTRA_WIDE]: {
      width: '280px'
    },
    [DESKTOP]: {
      width: '228px'
    },
    [TABLET]: {
      width: '172px'
    }
  },
  {
    [EXTRA_WIDE]: {
      width: '280px'
    },
    [DESKTOP]: {
      width: '228px'
    },
    [TABLET]: {
      width: '172px'
    }
  }
];

export const masonrySizes = [
  {
    columns: 4,
    gutter: 15
  },
  {
    mq: '992px',
    columns: 4,
    gutter: 16
  },
  {
    mq: '1200px',
    columns: 4,
    gutter: 16
  }
];
