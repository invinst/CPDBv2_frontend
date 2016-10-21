import {
  TABLET, DESKTOP, EXTRA_WIDE
} from 'utils/constants';


export default [
  {
    [EXTRA_WIDE]: {
      title: {
        fontSize: '16px'
      },
      base: {
        width: '280px'
      }
    },
    [DESKTOP]: {
      title: {
        fontSize: '15px'
      },
      base: {
        width: '228px'
      }
    },
    [TABLET]: {
      title: {
        fontSize: '13px'
      },
      base: {
        width: '172px'
      }
    }
  },
  {
    [EXTRA_WIDE]: {
      title: {
        fontSize: '36px'
      },
      base: {
        width: '280px'
      }
    },
    [DESKTOP]: {
      title: {
        fontSize: '30px'
      },
      base: {
        width: '228px'
      }
    },
    [TABLET]: {
      title: {
        fontSize: '22px'
      },
      base: {
        width: '172px'
      }
    }
  }
];
