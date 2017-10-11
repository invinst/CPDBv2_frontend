import { reverse } from 'lodash';

import { OFFICER_URL } from 'utils/constants';


const allCards = [
  {
    crs: 1,
    kind: 'YEAR',
    year: 2005
  },
  {
    category: 'Use of Force',
    kind: 'CR',
    subcategory: 'EXCESSIVE FORCE - OFF DUTY',
    crid: '968734',
    date: '2005-11-28',
    coaccused: 1,
    finding: 'Unfounded',
    race: ['Black'],
    age: ['31-40'],
    gender: ['Male']
  },
  {
    'unit_name': '004',
    kind: 'UNIT_CHANGE',
    date: '2005-04-28'
  },
  {
    crs: 1,
    kind: 'YEAR',
    year: 2004
  },
  {
    category: 'Use of Force',
    kind: 'CR',
    subcategory: 'EXCESSIVE FORCE - OFF DUTY',
    crid: '456123',
    date: '2004-11-28',
    coaccused: 1,
    finding: 'Unfounded',
    race: ['Black'],
    age: ['21-30'],
    gender: ['Unknown']
  },
  {
    'unit_name': '003',
    kind: 'UNIT_CHANGE',
    date: '2004-04-28'
  },
  {
    crs: 1,
    kind: 'YEAR',
    year: 2003
  },
  {
    category: 'Use of Force',
    kind: 'CR',
    subcategory: 'EXCESSIVE FORCE - OFF DUTY',
    crid: '123456',
    date: '2003-11-28',
    coaccused: 1,
    finding: 'Unfounded',
    race: ['White/Hispinic'],
    age: ['Unknown'],
    gender: ['Female']
  },
  {
    'unit_name': '002',
    kind: 'UNIT_CHANGE',
    date: '2003-04-28'
  },
  {
    crs: 1,
    kind: 'YEAR',
    year: 2002
  },
  {
    category: 'Illegal Search',
    kind: 'CR',
    subcategory: 'EXCESSIVE FORCE - OFF DUTY',
    crid: '309887',
    date: '2002-11-28',
    coaccused: 1,
    finding: 'Unfounded',
    race: ['White'],
    age: ['51+'],
    gender: ['Unknown']
  },
  {
    'unit_name': '001',
    kind: 'UNIT_CHANGE',
    date: '2002-04-28'
  },
  {
    crs: 0,
    kind: 'YEAR',
    year: 2001
  },
  {
    'unit_name': '010',
    kind: 'UNIT_CHANGE',
    date: '2001-12-05'
  },
  {
    kind: 'JOINED',
    date: '2001-12-05'
  }
];

const filteredCards = {
  'category=Use%20of%20Force&race=Black': [{
    crs: 1,
    kind: 'YEAR',
    year: 2005
  }, {
    category: 'Use of Force',
    kind: 'CR',
    subcategory: 'EXCESSIVE FORCE - OFF DUTY',
    crid: '968734',
    date: '2005-11-28',
    coaccused: 1,
    finding: 'Unfounded',
    race: ['Black'],
    age: ['31-40'],
    gender: ['Male']
  }, {
    'unit_name': '004',
    kind: 'UNIT_CHANGE',
    date: '2005-04-28'
  }, {
    crs: 1,
    kind: 'YEAR',
    year: 2004
  }, {
    category: 'Use of Force',
    kind: 'CR',
    subcategory: 'EXCESSIVE FORCE - OFF DUTY',
    crid: '456123',
    date: '2004-11-28',
    coaccused: 1,
    finding: 'Unfounded',
    race: ['Black'],
    age: ['21-30'],
    gender: ['Unknown']
  }, {
    'unit_name': '003',
    kind: 'UNIT_CHANGE',
    date: '2004-04-28'
  }, {
    crs: 1,
    kind: 'YEAR',
    year: 2003
  }, {
    'unit_name': '002',
    kind: 'UNIT_CHANGE',
    date: '2003-04-28'
  }, {
    crs: 1,
    kind: 'YEAR',
    year: 2002
  }, {
    'unit_name': '001',
    kind: 'UNIT_CHANGE',
    date: '2002-04-28'
  }, {
    crs: 0,
    kind: 'YEAR',
    year: 2001
  }, {
    'unit_name': '010',
    kind: 'UNIT_CHANGE',
    date: '2001-12-05'
  }, {
    kind: 'JOINED',
    date: '2001-12-05'
  }],
  'category=Use%20of%20Force': [{
    crs: 1,
    kind: 'YEAR',
    year: 2005
  }, {
    category: 'Use of Force',
    kind: 'CR',
    subcategory: 'EXCESSIVE FORCE - OFF DUTY',
    crid: '968734',
    date: '2005-11-28',
    coaccused: 1,
    finding: 'Unfounded',
    race: ['Black'],
    age: ['31-40'],
    gender: ['Male']
  }, {
    'unit_name': '004',
    kind: 'UNIT_CHANGE',
    date: '2005-04-28'
  }, {
    crs: 1,
    kind: 'YEAR',
    year: 2004
  }, {
    category: 'Use of Force',
    kind: 'CR',
    subcategory: 'EXCESSIVE FORCE - OFF DUTY',
    crid: '456123',
    date: '2004-11-28',
    coaccused: 1,
    finding: 'Unfounded',
    race: ['Black'],
    age: ['21-30'],
    gender: ['Unknown']
  }, {
    'unit_name': '003',
    kind: 'UNIT_CHANGE',
    date: '2004-04-28'
  }, {
    crs: 1,
    kind: 'YEAR',
    year: 2003
  }, {
    category: 'Use of Force',
    kind: 'CR',
    subcategory: 'EXCESSIVE FORCE - OFF DUTY',
    crid: '123456',
    date: '2003-11-28',
    coaccused: 1,
    finding: 'Unfounded',
    race: ['White/Hispinic'],
    age: ['Unknown'],
    gender: ['Female']
  }, {
    'unit_name': '002',
    kind: 'UNIT_CHANGE',
    date: '2003-04-28'
  }, {
    crs: 1,
    kind: 'YEAR',
    year: 2002
  }, {
    'unit_name': '001',
    kind: 'UNIT_CHANGE',
    date: '2002-04-28'
  }, {
    crs: 0,
    kind: 'YEAR',
    year: 2001
  }, {
    'unit_name': '010',
    kind: 'UNIT_CHANGE',
    date: '2001-12-05'
  }, {
    kind: 'JOINED',
    date: '2001-12-05'
  }
  ]

};

const results = {
  '1': {
    results: allCards.slice(0, 10),
    previous: null,
    next: `${OFFICER_URL}1/timeline-items/?offset=10`,
    count: 15
  },
  '1234': {
    results: [
      {
        crs: 0,
        kind: 'YEAR',
        year: 2001
      },
      {
        kind: 'JOINED',
        date: '2001-12-05'
      }
    ],
    previous: null,
    next: null,
    count: 2
  },
  '5678': {
    results: [],
    previous: null,
    next: null,
    count: 0
  }
};

export default (officerId = 1) => results[`${officerId}`];

export const reversedTimelineItems = () => ({
  results: reverse(allCards).slice(0, 10),
  previous: null,
  next: `${OFFICER_URL}1/timeline-items/?sort=asc&offset=10`,
  count: 15
});

export const nextTimelineItems = () => ({
  results: allCards.slice(10),
  previous: `${OFFICER_URL}1/timeline-items/`,
  next: null,
  count: 15
});

export const filterTimelineItems = (queryString) => ({
  results: filteredCards[queryString].slice(0, 10),
  previous: null,
  next: `${OFFICER_URL}1/timeline-items/?sort=asc&offset=10&${queryString}`,
  count: filteredCards[queryString].length
});
