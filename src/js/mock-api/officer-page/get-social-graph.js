const results = {
  '1': {
    nodes: [
      {
        id: 1,
        name: 'Tsumiki Miniwa',
        'cr_years': [
          2002
        ]
      },
      {
        id: 2,
        name: 'Timothy The Bunny',
        'cr_years': [
          null,
          2002,
          2003,
          2005,
          2010,
          2011,
          2012
        ]
      },
      {
        id: 3,
        name: 'John Doe',
        'cr_years': [
          null,
          2002,
          2002,
          2002,
          2002,
          2003,
          2005,
          2005,
          2005,
          2005,
          2005,
          2010,
          2011,
          2011,
          2011,
          2011,
          2011,
          2011,
          2011,
          2012
        ]
      }
    ],
    links: [
      { source: 1, target: 2, 'cr_years': [2002] },
      { source: 2, target: 3, 'cr_years': [2010, 2011] }
    ]
  }
};

export default (offierId=1) => results[`${offierId}`];



