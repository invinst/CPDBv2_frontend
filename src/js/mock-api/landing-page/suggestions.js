import { fill } from 'lodash';

const officers = Array(10);
fill(officers, {
  'text': 'Bernadette Kelly',
  'payload': {
    'result_text': 'Bernadette Kelly',
    'result_extra_information': '7186',
    'to': '/officer/1/'
  }
});

export default {
  'default': {
    'OFFICER': officers,
    'CO-ACCUSED': [
      {
        'text': 'Bernadette Kelly',
        'payload': {
          'result_text': 'Bernadette Kelly',
          'result_extra_information': '7186',
          'to': '/officer/1/'
        }
      }
    ],
    'UNIT': [

    ],
    'NEIGHBORHOOD': [
      {
        'text': 'Kenwood',
        'payload': {
          'result_text': 'Kenwood',
          'result_extra_information': ''
        }
      }
    ]
  },
  'noresult': {},
  'OFFICER': {
    'OFFICER': [
      {
        'text': 'Bernadette Kelly',
        'payload': {
          'result_text': 'Bernadette Kelly',
          'result_extra_information': '7186'
        }
      },
      {
        'text': 'Charles Kelly',
        'payload': {
          'result_text': 'Charles Kelly',
          'result_extra_information': ''
        }
      }
    ]
  },
  'foo': {
    'OFFICER': [
      {
        'text': 'Laurence Lanners',
        'payload': {
          'result_text': 'Laurence Lanners',
          'result_extra_information': '5678',
          'to': '/officer/5678/'
        }
      }
    ]
  }
};
